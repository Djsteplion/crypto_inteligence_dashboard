import { useQuery } from '@tanstack/react-query';
import { fetchTopCoins } from './api/cryptoApi';
import { Activity, TrendingUp, Search } from 'lucide-react'; 
import { MarketChart } from './components/MarketChart';
import { MarketMap } from './components/MarketMap';
import { useState } from 'react';

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['coins'],
    queryFn: fetchTopCoins,
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Derived State: All components will use this
  const filteredCoins = data?.filter(coin => 
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-900 text-white">
      <div className="animate-spin mr-2"><Activity /></div> Loading Market Data...
    </div>
  );

  if (isError) return (
    <div className="p-10 text-red-500">Error connecting to market feed.</div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900">
      {/* 1. Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-600" /> 
            Market Intelligence
          </h1>
          <p className="text-slate-500">Real-time asset tracking and analytics</p>
        </div>

        {/* 2. Search Bar (Optimized with Icon) */}
        <div className="relative w-full max-w-md group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search assets (e.g. Bitcoin)..."
            className="w-full p-3 pl-10 rounded-lg border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* 3. Visualizations (Chart & Map) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <MarketChart data={filteredCoins || []} />
        <MarketMap data={filteredCoins || []} />
      </div>

      {/* 4. Asset List (Now using filteredCoins so it matches the search) */}
      <h2 className="text-xl font-bold mb-4">Market Assets</h2>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoins?.map((coin) => (
          <div key={coin.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center gap-4 mb-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="font-bold text-lg">{coin.name}</h2>
                <p className="text-sm text-slate-500 uppercase font-semibold">{coin.symbol}</p>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-2xl font-mono font-bold">${coin.current_price.toLocaleString()}</p>
              <p className={`text-sm font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;