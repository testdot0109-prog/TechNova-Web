import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Shield, Lock, Mail } from 'lucide-react';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('ananya.sharma@stats.gov.in');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Demo login - accept any credentials
    onLogin({
      name: 'Ananya Sharma',
      email: email,
      designation: 'Statistical Officer',
      department: 'National Statistical Department'
    });

    navigate('/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <span className="text-3xl font-bold text-white">T</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">TechNova</h1>
          <p className="text-slate-600 mb-1">Smart Learning. Smarter Skills. Future-Ready Workforce.</p>
          <p className="text-xs text-slate-400">AI-Enabled Learning Platform for Official Statistics</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-slate-800">Government Enterprise Login</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email / Username
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="your.email@gov.in"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Lock size={16} className="inline mr-2" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-xs font-semibold text-slate-700 mb-2">📝 Demo Credentials:</p>
            <p className="text-xs text-slate-600">Email: ananya.sharma@stats.gov.in</p>
            <p className="text-xs text-slate-600">Password: demo123</p>
          </div>

          {/* Prototype Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-400">
              ⚠️ Prototype — Mock authentication for demo purposes
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-500">
            © 2026 TechNova. Built for India's Official Statistical System.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
