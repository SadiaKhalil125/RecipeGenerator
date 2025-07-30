'use client';

import { useState, useEffect } from 'react';
import { Search, Heart, Clock, Plus } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RecipeCard from '@/components/RecipeCard';
import { Recipe } from '@/types';
import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'favorites' | 'recent'>('favorites');
  const { user, loading } = useAuth();

  // Sample data - replace with actual data from Supabase
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // TODO: Load user data from Supabase
    // Load favorites and recent recipes
    loadUserData();
  }, []);

  const loadUserData = async () => {
    // TODO: Implement actual data loading
    // For now, using sample data
    const sampleFavorites: Recipe[] = [
      {
        id: '1',
        title: 'Chicken Tikka Masala',
        description: 'A creamy and flavorful Indian curry made with tender chicken pieces.',
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
        description: 'Classic Italian pasta dish with eggs, cheese, and pancetta.',
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
    ];

    const sampleRecent: Recipe[] = [
      {
        id: '3',
        title: 'Beef Stir Fry',
        description: 'Quick and healthy stir-fried beef with vegetables.',
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
      {
        id: '4',
        title: 'Chocolate Lava Cake',
        description: 'Decadent chocolate cake with a molten center.',
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
    ];

    setFavorites(sampleFavorites);
    setRecentRecipes(sampleRecent);
  };

  const handleFavoriteToggle = (recipeId: string) => {
    // TODO: Implement actual favorite toggle
    console.log('Toggle favorite:', recipeId);
  };

  const handleGenerateNew = () => {
    // Navigate to recipe generation page
    window.location.href = '/generate';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="card">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="card">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Sign in to access your dashboard
            </h1>
            <p className="text-gray-600 mb-8">
              Create an account or sign in to save your favorite recipes and track your cooking journey.
            </p>
            <a href="/auth" className="btn-primary">
              Sign In
            </a>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  const filteredFavorites = favorites.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecent = recentRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Manage your favorite recipes and cooking history
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={handleGenerateNew}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Generate New Recipe
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'favorites'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="w-4 h-4 inline mr-2" />
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'recent'
                ? 'bg-primary-500 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4 inline mr-2" />
            Recent ({recentRecipes.length})
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Favorite Recipes
              </h2>
              
              {filteredFavorites.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No favorites yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start generating recipes and save your favorites to see them here.
                  </p>
                  <button onClick={handleGenerateNew} className="btn-primary">
                    Generate Your First Recipe
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredFavorites.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      isFavorite={true}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'recent' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recently Generated Recipes
              </h2>
              
              {filteredRecent.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No recent recipes
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Generate your first recipe to see it here.
                  </p>
                  <button onClick={handleGenerateNew} className="btn-primary">
                    Generate Your First Recipe
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredRecent.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 