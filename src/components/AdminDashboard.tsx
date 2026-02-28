import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Calendar, Tag, MessageSquare, ArrowLeft, RefreshCw } from 'lucide-react';

interface Quote {
  id: number;
  name: string;
  phone: string;
  email: string;
  message: string;
  service: string;
  timestamp: string;
}

export const AdminDashboard = ({ onBack }: { onBack: () => void }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        fetchQuotes(data.token);
      } else {
        setLoginError('Invalid password');
      }
    } catch (error) {
      setLoginError('An error occurred');
    }
  };

  const fetchQuotes = async (authToken?: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/quotes', {
        headers: { 'Authorization': authToken || token }
      });
      if (response.status === 403) {
        setIsAuthenticated(false);
        return;
      }
      const data = await response.json();
      setQuotes(data.sort((a: Quote, b: Quote) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQuotes();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </button>
          <h1 className="text-2xl font-display font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400 mb-6">Please enter the password to access quotes.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                autoFocus
              />
              {loginError && <p className="text-red-500 text-sm mt-2">{loginError}</p>}
            </div>
            <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-lg transition-all">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </button>
            <h1 className="text-3xl font-display font-bold">Customer Quotes</h1>
            <p className="text-slate-400">View and manage all incoming quote requests.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => fetchQuotes()}
              className="flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={() => {
                setIsAuthenticated(false);
                setToken('');
                setPassword('');
              }}
              className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : quotes.length === 0 ? (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-12 text-center">
            <p className="text-slate-400 text-lg">No quotes received yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {quotes.map((quote) => (
              <motion.div 
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold text-white">{quote.name}</h2>
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium rounded-full">
                        {quote.service}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Mail className="w-4 h-4 text-amber-500" />
                        <a href={`mailto:${quote.email}`} className="hover:text-white transition-colors">{quote.email}</a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Phone className="w-4 h-4 text-amber-500" />
                        <a href={`tel:${quote.phone}`} className="hover:text-white transition-colors">{quote.phone}</a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{new Date(quote.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 bg-slate-950/50 rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-500 text-xs uppercase font-bold mb-2">
                      <MessageSquare className="w-3 h-3" />
                      Message
                    </div>
                    <p className="text-slate-300 text-sm italic">
                      {quote.message || "No message provided."}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
