import React, { useState } from 'react';
import { questions as allQuestions } from './data/questions';
import QuestionCard from './components/QuestionCard';
import RecommendationCard from './components/RecommendationCard';
import Header from './components/Header';
import { UserResponse, Question } from './types';
import { generateMusicRecommendation } from './services/ai';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([...allQuestions]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(availableQuestions[0]);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previousSongs, setPreviousSongs] = useState<Set<string>>(new Set());

  const resetQuiz = () => {
    setAvailableQuestions([...allQuestions]);
    setCurrentQuestion(allQuestions[0]);
    setResponses([]);
    setIsComplete(false);
    setRecommendation('');
  };

  const extractSongTitle = (result: string): string | null => {
    const titleLine = result.split('\n').find(line => line.startsWith('Song Title:'));
    return titleLine ? titleLine.split(': ')[1].trim() : null;
  };

  const handleOptionSelect = async (optionId: string) => {
    const response = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
    };

    const newResponses = [...responses, response];
    setResponses(newResponses);

    // Remove current question from available questions
    const remainingQuestions = availableQuestions.filter(q => q.id !== currentQuestion.id);
    setAvailableQuestions(remainingQuestions);

    if (remainingQuestions.length > 0) {
      setCurrentQuestion(remainingQuestions[0]);
    } else {
      setIsComplete(true);
      setIsLoading(true);
      
      try {
        let result;
        let songTitle;
        
        do {
          result = await generateMusicRecommendation(newResponses);
          songTitle = extractSongTitle(result);
        } while (songTitle && previousSongs.has(songTitle));
        
        if (songTitle) {
          setPreviousSongs(prev => new Set([...prev, songTitle]));
        }
        
        setRecommendation(result);
      } catch (error) {
        console.error('Error generating recommendation:', error);
        setRecommendation(`Song Title: Bohemian Rhapsody
Artist: Queen
Genre: Rock
Message: Remember, like the diverse movements in Bohemian Rhapsody, life is a beautiful symphony of ups and downs. Embrace each moment, for they all contribute to your unique story.`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2070')] bg-cover bg-center opacity-10" />
      <div className="relative">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto"
              >
                <QuestionCard
                  question={currentQuestion}
                  onSelect={handleOptionSelect}
                  currentQuestion={allQuestions.length - availableQuestions.length + 1}
                  totalQuestions={allQuestions.length}
                />
              </motion.div>
            ) : (
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <RecommendationCard 
                  recommendation={recommendation}
                  isLoading={isLoading}
                  onReset={resetQuiz}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;