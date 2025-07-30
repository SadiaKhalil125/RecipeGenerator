import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-success-600 bg-success-50';
    case 'medium':
      return 'text-primary-600 bg-primary-50';
    case 'hard':
      return 'text-accent-600 bg-accent-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getCuisineEmoji(cuisine: string): string {
  const cuisineEmojis: { [key: string]: string } = {
    italian: '🇮🇹',
    indian: '🇮🇳',
    chinese: '🇨🇳',
    mexican: '🇲🇽',
    japanese: '🇯🇵',
    thai: '🇹🇭',
    french: '🇫🇷',
    mediterranean: '🌊',
    american: '🇺🇸',
    greek: '🇬🇷',
    spanish: '🇪🇸',
    korean: '🇰🇷',
    vietnamese: '🇻🇳',
    lebanese: '🇱🇧',
    turkish: '🇹🇷',
    moroccan: '🇲🇦',
    ethiopian: '🇪🇹',
    brazilian: '🇧🇷',
    peruvian: '🇵🇪',
    caribbean: '🌴',
  };
  
  const normalizedCuisine = cuisine.toLowerCase();
  return cuisineEmojis[normalizedCuisine] || '🍽️';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateRecipeId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function calculateNutritionalInfo(ingredients: any[]): any {
  // This is a simplified calculation - in a real app, you'd have a nutrition database
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  
  ingredients.forEach(ingredient => {
    // Simplified nutrition calculation (would need a proper nutrition API)
    const calories = ingredient.amount * 50; // Rough estimate
    const protein = ingredient.amount * 2;
    const carbs = ingredient.amount * 3;
    const fat = ingredient.amount * 1;
    
    totalCalories += calories;
    totalProtein += protein;
    totalCarbs += carbs;
    totalFat += fat;
  });
  
  return {
    calories: Math.round(totalCalories),
    protein: Math.round(totalProtein),
    carbohydrates: Math.round(totalCarbs),
    fat: Math.round(totalFat),
  };
} 