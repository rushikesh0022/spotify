import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'mood',
    text: 'How are you feeling right now?',
    options: [
      {
        id: 'energetic',
        text: 'Energetic',
        description: 'Ready to take on the world',
        iconName: 'Zap'
      },
      {
        id: 'relaxed',
        text: 'Relaxed',
        description: 'Calm and peaceful',
        iconName: 'Cloud'
      },
      {
        id: 'melancholic',
        text: 'Melancholic',
        description: 'Deep in thought',
        iconName: 'Moon'
      },
      {
        id: 'happy',
        text: 'Happy',
        description: 'Feeling great',
        iconName: 'Sun'
      }
    ]
  },
  {
    id: 'energy',
    text: 'What\'s your energy level?',
    options: [
      {
        id: 'high',
        text: 'High Energy',
        description: 'Ready to dance',
        iconName: 'Flame'
      },
      {
        id: 'medium',
        text: 'Moderate',
        description: 'Balanced mood',
        iconName: 'Balance'
      },
      {
        id: 'low',
        text: 'Low Energy',
        description: 'Taking it easy',
        iconName: 'BatteryLow'
      },
      {
        id: 'variable',
        text: 'Variable',
        description: 'Mood swings',
        iconName: 'WaveformCircle'
      }
    ]
  },
  {
    id: 'environment',
    text: 'Where are you right now?',
    options: [
      {
        id: 'home',
        text: 'At Home',
        description: 'Comfortable space',
        iconName: 'Home'
      },
      {
        id: 'commuting',
        text: 'Commuting',
        description: 'On the move',
        iconName: 'Train'
      },
      {
        id: 'work',
        text: 'At Work',
        description: 'Professional setting',
        iconName: 'Briefcase'
      },
      {
        id: 'outdoors',
        text: 'Outdoors',
        description: 'In nature',
        iconName: 'Trees'
      }
    ]
  },
  {
    id: 'tempo',
    text: 'What tempo matches your current state?',
    options: [
      {
        id: 'upbeat',
        text: 'Upbeat',
        description: 'Fast and lively',
        iconName: 'FastForward'
      },
      {
        id: 'moderate',
        text: 'Moderate',
        description: 'Steady rhythm',
        iconName: 'Activity'
      },
      {
        id: 'slow',
        text: 'Slow',
        description: 'Gentle pace',
        iconName: 'Clock'
      },
      {
        id: 'varying',
        text: 'Varying',
        description: 'Mixed tempos',
        iconName: 'WaveSine'
      }
    ]
  },
  {
    id: 'complexity',
    text: 'What kind of musical complexity do you prefer right now?',
    options: [
      {
        id: 'simple',
        text: 'Simple',
        description: 'Clean and clear',
        iconName: 'Circle'
      },
      {
        id: 'layered',
        text: 'Layered',
        description: 'Multiple elements',
        iconName: 'Layers'
      },
      {
        id: 'experimental',
        text: 'Experimental',
        description: 'Unique sounds',
        iconName: 'Sparkles'
      },
      {
        id: 'classical',
        text: 'Classical',
        description: 'Traditional structure',
        iconName: 'Piano'
      }
    ]
  }
];