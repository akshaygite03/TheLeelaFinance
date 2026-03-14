import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MarketData {
  indices: {
    [key: string]: {
      price: string;
      change: string;
      changePct: string;
    };
  };
}

export default function MarketMarquee() {
  const [data, setData] = useState<MarketData | null>(null);

  useEffect(() => {
    fetch("/api/v1/market-snapshot")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  const indices = [
    { name: "NIFTY 50", ...data.indices.NIFTY_50 },
    { name: "SENSEX", ...data.indices.SENSEX },
    { name: "NIFTY BANK", ...data.indices.NIFTY_BANK },
  ];

  // Duplicate for seamless loop
  const items = [...indices, ...indices, ...indices, ...indices];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-black text-white py-2 border-b border-white/10 overflow-hidden flex items-center text-xs font-mono tracking-wider">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        className="flex whitespace-nowrap"
      >
        {items.map((item, i) => {
          const isUp = parseFloat(item.change) >= 0;
          return (
            <div key={i} className="flex items-center space-x-3 px-8 border-r border-white/10">
              <span className="text-gray-400">{item.name}</span>
              <span className="font-semibold">{item.price}</span>
              <span className="text-gray-300">
                {isUp ? "+" : "-"}{Math.abs(parseFloat(item.change))} ({item.changePct}%)
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
