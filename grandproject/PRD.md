# Product Requirements Document (PRD)
## AI-Powered Recipe Generator

### 1. Project Overview
**Project Title:** AI-Powered Recipe Generator  
**Version:** 1.0  
**Date:** December 2024  

### 2. Product Vision
Create a modern, user-friendly web application that generates personalized recipes using AI technology. Users can input any dish name and receive detailed, step-by-step recipes with ingredients, cooking instructions, and nutritional information.

### 3. Target Audience
- Home cooks looking for new recipe ideas
- Food enthusiasts exploring different cuisines
- Busy professionals seeking quick meal solutions
- Cooking beginners needing detailed instructions

### 4. Core Features

#### 4.1 Authentication System
- **Magic Link Authentication**: Email-based login without passwords
- **User Profile Management**: Save favorite recipes and preferences
- **Session Management**: Secure, persistent login sessions

#### 4.2 Recipe Generation
- **AI-Powered Recipe Creation**: Generate recipes from dish names
- **Ingredient Lists**: Detailed ingredient quantities and measurements
- **Step-by-Step Instructions**: Clear cooking directions
- **Cooking Time & Difficulty**: Estimated preparation and cooking times
- **Nutritional Information**: Basic nutritional facts
- **Recipe Categories**: Cuisine types, dietary restrictions, meal types

#### 4.3 User Experience Features
- **Recipe Search**: Search by dish name, ingredients, or cuisine
- **Recipe Favorites**: Save and organize favorite recipes
- **Recipe Sharing**: Share recipes via social media or email
- **Responsive Design**: Mobile-first, cross-device compatibility
- **Dark/Light Mode**: User preference toggle

#### 4.4 Recipe Display
- **Recipe Cards**: Beautiful, visual recipe presentation
- **Ingredient Scaling**: Adjust serving sizes automatically
- **Print-Friendly Format**: Clean, printable recipe layouts
- **Recipe History**: Track recently viewed recipes

### 5. Technical Requirements

#### 5.1 Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS for modern, responsive design
- **State Management**: React Context API or Zustand
- **Icons**: Lucide React or Heroicons
- **UI Components**: Custom components with professional design

#### 5.2 Backend & Database
- **Authentication**: Supabase Auth with magic links
- **Database**: Supabase PostgreSQL + MongoDB for recipe data
- **AI Integration**: n8n webhook for recipe generation
- **API**: Next.js API routes for backend logic

#### 5.3 External Integrations
- **n8n Webhook**: AI recipe generation endpoint
- **Email Service**: Magic link delivery via Supabase
- **Image Storage**: Supabase Storage for recipe images

#### 5.4 Deployment
- **Platform**: Vercel with CI/CD
- **Environment**: Production, staging, and development
- **Monitoring**: Vercel Analytics and error tracking

### 6. User Stories

#### 6.1 Authentication
- As a user, I want to sign in with my email so I can access personalized features
- As a user, I want to receive a magic link so I can securely log in without passwords
- As a user, I want to stay logged in so I don't have to re-authenticate frequently

#### 6.2 Recipe Generation
- As a user, I want to enter a dish name so I can get a recipe for it
- As a user, I want to see detailed ingredients so I know what to buy
- As a user, I want step-by-step instructions so I can cook the dish properly
- As a user, I want to see cooking time so I can plan my meal preparation

#### 6.3 Recipe Management
- As a user, I want to save favorite recipes so I can access them later
- As a user, I want to search recipes so I can find specific dishes
- As a user, I want to share recipes so I can send them to friends

### 7. Success Metrics
- **User Engagement**: Daily active users, session duration
- **Recipe Generation**: Number of recipes generated per day
- **User Retention**: Return user rate, feature adoption
- **Performance**: Page load times, API response times

### 8. Future Enhancements
- Recipe ratings and reviews
- Meal planning and shopping lists
- Dietary restriction filters
- Recipe video tutorials
- Social features and recipe communities
- Integration with grocery delivery services

### 9. Technical Architecture

#### 9.1 Database Schema
```sql
-- Users table (Supabase)
users (
  id: uuid PRIMARY KEY,
  email: text UNIQUE,
  created_at: timestamp,
  updated_at: timestamp
)

-- Recipes table (MongoDB)
recipes (
  _id: ObjectId,
  title: string,
  ingredients: array,
  instructions: array,
  cooking_time: number,
  difficulty: string,
  cuisine: string,
  dietary_tags: array,
  nutritional_info: object,
  created_at: timestamp,
  user_id: string
)

-- Favorites table (Supabase)
favorites (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  recipe_id: string,
  created_at: timestamp
)
```

#### 9.2 API Endpoints
- `POST /api/auth/magic-link` - Send magic link
- `GET /api/recipes/generate` - Generate recipe via n8n
- `GET /api/recipes/search` - Search recipes
- `POST /api/favorites` - Save favorite recipe
- `GET /api/favorites` - Get user favorites
- `DELETE /api/favorites/[id]` - Remove favorite

### 10. Security Considerations
- Magic link expiration (15 minutes)
- Rate limiting on recipe generation
- Input sanitization for search queries
- CORS configuration for n8n webhook
- Environment variable protection

### 11. Performance Requirements
- Page load time: < 2 seconds
- Recipe generation: < 5 seconds
- Mobile responsiveness: 100%
- Lighthouse score: > 90

### 12. Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

This PRD provides a comprehensive foundation for building the AI-Powered Recipe Generator web application with all the specified technologies and features. 