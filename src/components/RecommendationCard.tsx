import React from 'react';
import { Music, Loader, ExternalLink, RefreshCw, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  recommendation: string;
  isLoading: boolean;
  onReset: () => void;
}

const MusicServiceLink: React.FC<{
  href: string;
  service: string;
  color: string;
  hoverColor: string;
}> = ({ href, service, color, hoverColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${color} ${hoverColor} transition-colors duration-200`}
  >
    <Music className="w-5 h-5" />
    <span>{service}</span>
    <ExternalLink className="w-4 h-4" />
  </a>
);

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation, isLoading, onReset }) => {
  const parseRecommendation = (text: string) => {
    const lines = text.split('\n');
    const result: Record<string, string> = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(': ');
      if (key && value) {
        result[key.trim()] = value.trim();
      }
    });
    
    return result;
  };

  const recommendationData = parseRecommendation(recommendation);

  const getMusicLinks = (title: string, artist: string) => {
    const query = encodeURIComponent(`${title} ${artist}`);
    return {
      youtube: `https://www.youtube.com/results?search_query=${query}`,
      spotify: `https://open.spotify.com/search/${query}`,
      apple: `https://music.apple.com/us/search?term=${query}`
    };
  };

  const links = recommendationData['Song Title'] && recommendationData['Artist'] 
    ? getMusicLinks(recommendationData['Song Title'], recommendationData['Artist'])
    : null;

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20">
        <div className="flex flex-col items-center justify-center p-8">
          <Loader className="w-8 h-8 animate-spin text-purple-400 mb-4" />
          <p className="text-purple-200">Discovering your perfect song...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg border border-white/20">
        <div className="text-center">
          <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center backdrop-blur-sm">
            <Music className="w-8 h-8 text-purple-300" />
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Your Perfect Song Match
          </h2>
          <div className="space-y-6 mt-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                {recommendationData['Song Title']}
              </h3>
              <p className="text-purple-300 text-lg">by {recommendationData['Artist']}</p>
            </div>
            <div className="bg-purple-900/30 p-6 rounded-lg border border-purple-700/30">
              <div className="flex items-center justify-center mb-4">
                <Quote className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-purple-100 leading-relaxed italic">
                {recommendationData['Message']}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="px-4 py-2 rounded-full bg-purple-800/40 text-purple-200 border border-purple-700/30">
                {recommendationData['Genre']}
              </span>
            </div>
          </div>
        </div>
      </div>

      {links && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20"
        >
          <h3 className="text-center text-purple-200 mb-4">Listen on your favorite platform</h3>
          <div className="flex justify-center gap-4">
            <MusicServiceLink
              href={links.youtube}
              service="YouTube"
              color="bg-red-500/20 text-red-300"
              hoverColor="hover:bg-red-500/30"
            />
            <MusicServiceLink
              href={links.spotify}
              service="Spotify"
              color="bg-green-500/20 text-green-300"
              hoverColor="hover:bg-green-500/30"
            />
            <MusicServiceLink
              href={links.apple}
              service="Apple Music"
              color="bg-pink-500/20 text-pink-300"
              hoverColor="hover:bg-pink-500/30"
            />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-600/20 text-purple-300 
                   hover:bg-purple-600/30 transition-colors duration-200 border border-purple-500/30"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Get Another Recommendation</span>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RecommendationCard;