'use client';

import { useState } from 'react';
import { Search, ChefHat, Heart, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample featured recipes
  const featuredRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Chicken Tikka Masala',
      description: 'A creamy and flavorful Indian curry made with tender chicken pieces in a rich tomato-based sauce.',
      ingredients: [],
      instructions: [],
      cooking_time: 45,
      difficulty: 'Medium',
      cuisine: 'Indian',
      dietary_tags: ['Gluten-Free'],
      nutritional_info: { calories: 350, protein: 25, carbohydrates: 8, fat: 22 },
      servings: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Pasta Carbonara',
      description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
      ingredients: [],
      instructions: [],
      cooking_time: 25,
      difficulty: 'Easy',
      cuisine: 'Italian',
      dietary_tags: ['Vegetarian'],
      nutritional_info: { calories: 450, protein: 18, carbohydrates: 55, fat: 20 },
      servings: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Chocolate Lava Cake',
      description: 'Decadent chocolate cake with a molten center, perfect for dessert lovers.',
      ingredients: [],
      instructions: [],
      cooking_time: 20,
      difficulty: 'Medium',
      cuisine: 'French',
      dietary_tags: ['Vegetarian'],
      nutritional_info: { calories: 320, protein: 6, carbohydrates: 35, fat: 18 },
      servings: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: '4',
      title: 'Beef Stir Fry',
      description: 'Quick and healthy stir-fried beef with vegetables in a savory sauce.',
      ingredients: [],
      instructions: [],
      cooking_time: 30,
      difficulty: 'Easy',
      cuisine: 'Chinese',
      dietary_tags: ['Gluten-Free'],
      nutritional_info: { calories: 280, protein: 30, carbohydrates: 12, fat: 15 },
      servings: 4,
      created_at: new Date().toISOString(),
    },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // Navigate to the generate page with the dish name
    window.location.href = `/generate?dish_name=${encodeURIComponent(searchQuery.trim())}`;
  };

  const features = [
    {
      icon: ChefHat,
      title: 'AI-Generated Recipes',
      description: 'Get personalized recipes created by advanced AI technology',
    },
    {
      icon: Heart,
      title: 'Save Favorites',
      description: 'Save your favorite recipes and access them anytime',
    },
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Generate recipes in seconds with detailed instructions',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🍳 AI-Powered Recipe Generator
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover amazing recipes with AI technology
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for any dish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-10 pr-4 py-4 text-lg text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isGenerating || !searchQuery.trim()}
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate Recipe
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Recipe Generator?
            </h2>
            <p className="text-lg text-gray-600">
              Experience the future of cooking with AI-powered recipe generation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Recipes
            </h2>
            <p className="text-lg text-gray-600">
              Discover trending recipes loved by our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Amazing Recipes?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of home cooks who are already using AI to discover new flavors
          </p>
          <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
} 