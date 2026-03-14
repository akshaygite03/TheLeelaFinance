import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

interface MarketData {
  status: string;
  timestamp: string;
  indices: {
    NIFTY_50: {
      price: string;
      change: string;
      changePct: string;
      sparkline: { time: string; value: number }[];
    };
  };
  sentiment: string;
  topSector: {
    name: string;
    changePct: string;
    trend: string;
  };
  institutionalFlow: {
    fii: string;
    dii: string;
    net: string;
  };
}

export default function LiveMarketIntelligence() {
  const [data, setData] = useState<MarketData | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("/api/v1/market-snapshot")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  const nifty = data.indices.NIFTY_50;
  const isUp = parseFloat(nifty.change) >= 0;

  return (
    <section id="vision" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="mb-12 flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Live Market Intelligence</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time insights from the National Stock Exchange.</p>
        </div>
        
        {/* Live Indicator */}
        <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-gray-800 dark:text-gray-200">NSE Live Feed</span>
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
              {new Date(data.timestamp).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* The Insight Card (NIFTY 50 + Sparkline + Gauge) */}
        <motion.div 
          className="md:col-span-2 relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] p-8 hover-target"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex justify-between items-start mb-12 relative z-10">
            <div>
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-1">NIFTY 50</h3>
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-bold tracking-tighter">{nifty.price}</span>
                <span className={`text-lg font-medium flex items-center ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {isUp ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  {Math.abs(parseFloat(nifty.change))} ({nifty.changePct}%)
                </span>
              </div>
            </div>

            {/* Glassmorphic Sentiment Gauge */}
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 uppercase tracking-wider mb-2">Market Sentiment</span>
              <div className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-3">
                <Activity size={18} className={data.sentiment === "Expanding" ? "text-emerald-500" : "text-rose-500"} />
                <span className="font-medium text-sm">{data.sentiment}</span>
              </div>
            </div>
          </div>

          {/* Sparkline (Reveals on Hover or always visible subtly) */}
          <div className="absolute bottom-0 left-0 right-0 h-48 opacity-40 transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0.3 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={nifty.sparkline}>
                <YAxis domain={['dataMin', 'dataMax']} hide />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isUp ? "#10b981" : "#f43f5e"} 
                  strokeWidth={3} 
                  dot={false}
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Gradient Overlay to fade bottom of chart */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 dark:from-[#1A1A1A] to-transparent pointer-events-none" />
        </motion.div>

        {/* Right Column: Sector & Flow */}
        <div className="flex flex-col gap-6">
          
          {/* Top Sector Card */}
          <div className="flex-1 rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] p-6 flex flex-col justify-between hover-target">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Leading Sector</span>
            <div>
              <h3 className="text-2xl font-bold mt-4 mb-1">{data.topSector.name}</h3>
              <span className="text-emerald-500 font-medium">{data.topSector.changePct}</span>
            </div>
          </div>

          {/* Institutional Flow Card */}
          <div className="flex-1 rounded-3xl border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#1A1A1A] p-6 flex flex-col justify-between hover-target">
            <span className="text-xs text-gray-500 uppercase tracking-wider">Institutional Flow</span>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">FII Net</span>
                <span className={data.institutionalFlow.fii.startsWith('-') ? "text-rose-500" : "text-emerald-500"}>
                  {data.institutionalFlow.fii}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">DII Net</span>
                <span className={data.institutionalFlow.dii.startsWith('-') ? "text-rose-500" : "text-emerald-500"}>
                  {data.institutionalFlow.dii}
                </span>
              </div>
              <div className="pt-3 border-t border-black/10 dark:border-white/10 flex justify-between items-center font-medium">
                <span>Total Net</span>
                <span className={data.institutionalFlow.net.startsWith('-') ? "text-rose-500" : "text-emerald-500"}>
                  {data.institutionalFlow.net}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
