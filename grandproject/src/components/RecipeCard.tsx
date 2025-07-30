'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Heart, Star, Eye } from 'lucide-react';
import { Recipe } from '@/types';
import { formatTime, getDifficultyColor, getCuisineEmoji } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  showFavorite?: boolean;
  onFavoriteToggle?: (recipeId: string) => void;
  isFavorite?: boolean;
}

export default function RecipeCard({ 
  recipe, 
  showFavorite = true, 
  onFavoriteToggle,
  isFavorite = false 
}: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(recipe.id);
    }
  };

  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div
        className="recipe-card group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Recipe Image */}
        <div className="relative mb-4">
          <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <span className="text-4xl">{getCuisineEmoji(recipe.cuisine)}</span>
          </div>
          
          {/* Favorite Button */}
          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}

          {/* Difficulty Badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        {/* Recipe Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-2">
            {recipe.description}
          </p>

          {/* Recipe Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(recipe.cooking_time)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{getCuisineEmoji(recipe.cuisine)}</span>
                <span>{recipe.cuisine}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.5</span>
            </div>
          </div>

          {/* Dietary Tags */}
          {recipe.dietary_tags && recipe.dietary_tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {recipe.dietary_tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {recipe.dietary_tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{recipe.dietary_tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Nutritional Info */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{recipe.nutritional_info.calories} cal</span>
              <span>{recipe.nutritional_info.protein}g protein</span>
              <span>{recipe.nutritional_info.carbohydrates}g carbs</span>
              <span>{recipe.nutritional_info.fat}g fat</span>
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        {isHovered && (
          <div className="absolute inset-0 bg-primary-500/10 rounded-xl border-2 border-primary-500/20 pointer-events-none transition-all duration-200" />
        )}
      </div>
    </Link>
  );
} 