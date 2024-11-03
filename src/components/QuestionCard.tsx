import React from 'react';
import * as Icons from 'lucide-react';
import { Question, Option } from '../types';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  onSelect: (optionId: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuestionCard({ question, onSelect, currentQuestion, totalQuestions }: QuestionCardProps) {
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-block px-4 py-2 rounded-full bg-purple-800/40 text-purple-200 mb-4">
          Question {currentQuestion} of {totalQuestions}
        </div>
        <h2 className="text-3xl font-bold text-white">
          {question.text}
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 gap-6">
        {question.options.map((option: Option, index) => (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: index * 0.1 }
            }}
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="group relative flex flex-col items-center p-8 rounded-xl 
                     bg-white/10 backdrop-blur-lg border border-white/20
                     hover:bg-white/20 transition-all duration-300
                     text-white shadow-lg"
          >
            <div className="p-4 rounded-full bg-purple-500/20 text-purple-300 mb-4 
                          group-hover:bg-purple-500/30 group-hover:scale-110 
                          transition-all duration-300">
              {renderIcon(option.iconName)}
            </div>
            <h3 className="font-semibold text-xl mb-2 group-hover:text-purple-300 
                         transition-colors duration-300">
              {option.text}
            </h3>
            <p className="text-purple-200/80 text-sm text-center">
              {option.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}