# AI-Powered Recipe Generator

A modern web application that generates delicious recipes using AI technology and integrates directly with n8n webhooks.

## Features

- 🍳 **AI-Generated Recipes**: Get personalized recipes created by advanced AI technology
- 💾 **Save Favorites**: Save your favorite recipes and access them anytime
- ⚡ **Quick & Easy**: Generate recipes in seconds with detailed instructions
- 🎨 **Modern UI**: Beautiful and responsive design with Tailwind CSS
- 🔗 **Direct n8n Integration**: Seamless direct integration with n8n webhook for recipe generation
- 🔐 **Authentication**: Magic link authentication with Supabase

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase (Magic Link)
- **Webhook**: Direct n8n cloud integration
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- n8n webhook URL (already configured)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd grandproject
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# n8n Webhook URL
N8N_WEBHOOK_URL=https://sadia125.app.n8n.cloud/webhook/1ab6c403-184d-42b1-8d41-05f78652edc6
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Generating Recipes

1. **From Home Page**: 
   - Enter a dish name in the search bar
   - Click "Generate Recipe" or press Enter
   - You'll be redirected to the generate page

2. **From Generate Page**:
   - Navigate to `/generate`
   - Enter any dish name (e.g., "Chicken Tikka Masala", "Pasta Carbonara")
   - Click "Generate Recipe"
   - View the complete recipe with ingredients, instructions, and nutritional info

### Authentication

The app uses Supabase Magic Link authentication:
- Visit `/auth` to sign in
- Enter your email address
- Check your email for the magic link
- Click the link to authenticate

### Webhook Integration

The application makes direct calls to your n8n webhook:
```
https://sadia125.app.n8n.cloud/webhook/1ab6c403-184d-42b1-8d41-05f78652edc6
```

The webhook receives a simple JSON payload:
```json
{
  "dish_name": "Chicken Tikka Masala"
}
```

And returns a complete recipe object:
```json
{
  "output": {
    "title": "Chicken Tikka Masala",
    "description": "A creamy and flavorful Indian curry...",
    "ingredients": ["500g chicken breast, cubed", "2 tbsp vegetable oil", ...],
    "instructions": ["Heat oil in a large pan...", ...],
    "cooking_time": 45,
    "difficulty": "Medium",
    "cuisine": "Indian",
    "dietary_tags": ["Gluten-Free", "High-Protein"],
    "nutritional_info": {
      "calories": 350,
      "protein": 28,
      "carbohydrates": 12,
      "fat": 22
    },
    "servings": 4
  }
}
```

## Project Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── page.tsx                    # Authentication page
│   │   └── callback/page.tsx           # Auth callback handler
│   ├── dashboard/page.tsx              # User dashboard
│   ├── generate/page.tsx               # Recipe generation page
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page
├── components/
│   ├── Footer.tsx                      # Footer component
│   ├── Header.tsx                      # Header component
│   └── RecipeCard.tsx                  # Recipe card component
├── lib/
│   ├── auth-context.tsx                # Authentication context
│   ├── supabase.ts                     # Supabase configuration
│   └── utils.ts                        # Utility functions
└── types/
    └── index.ts                        # TypeScript type definitions
```

## Features Implemented

✅ **Recipe Generation**: Direct integration with n8n webhook
✅ **Modern UI**: Responsive design with Tailwind CSS
✅ **Recipe Display**: Detailed recipe view with ingredients, instructions, and nutrition
✅ **Navigation**: Seamless navigation between pages
✅ **Error Handling**: Proper error handling for webhook calls
✅ **Loading States**: Loading indicators during recipe generation
✅ **TypeScript**: Full type safety throughout the application
✅ **Authentication**: Magic link authentication with Supabase
✅ **User Dashboard**: Basic dashboard with authentication state

## Features to Implement

🔄 **Favorites**: Save and manage favorite recipes
🔄 **Recipe History**: Track recently generated recipes
🔄 **Search & Filter**: Advanced recipe search and filtering
🔄 **Recipe Sharing**: Share recipes with others
🔄 **Nutritional Analysis**: Enhanced nutritional information
🔄 **User Profiles**: User profile management

## Deployment

The application is ready for deployment on Vercel:

1. Connect your repository to Vercel
2. Set up environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `N8N_WEBHOOK_URL`
3. Deploy automatically on push to main branch

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 