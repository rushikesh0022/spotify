import React from 'react';
import { Music, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-purple-950/30 backdrop-blur-md border-b border-purple-800/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Music className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">MusicAI</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-purple-300">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Music Discovery</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;