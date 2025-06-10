# Tasami - Personal Achievement Assistant Platform

Tasami is a comprehensive web platform that facilitates personal assistance and goal achievement through expert connections. The platform connects users with specialists across 300+ fields and disciplines, enabling them to accomplish tasks and achieve their goals through structured social contracts.

## About the Project

Tasami serves as a marketplace for personal assistance services, featuring:

- 👥 User Management & Teams
  - Executive, Supervisor, and Customer Service roles
  - Comprehensive user profile management
  - Team organization and work groups
  
- 📋 Task Management
  - Executive tasks
  - Supervisory tasks
  - Customer service tasks
  - Performance tracking and analytics

- 💼 Program Management
  - Service listings and packages
  - Field and specialization categories
  - Operating sector management
  - Program performance analytics

- 🌐 Core Features
  - Multi-language support (Arabic/English)
  - Real-time chat functionality
  - Advanced analytics and reporting
  - Comprehensive notification system
  - Google Maps integration
  - Responsive design

## Technical Stack

- ⚛️ Frontend: React with Vite
- 🔄 State Management: Redux + React Query
- 📊 Data Visualization: ApexCharts
- 🎨 UI Framework: Bootstrap 5
- 🌐 i18n: i18next
- 🎭 Animations: Framer Motion + AOS
- 📱 Data Tables: TanStack Table
- 🗺️ Maps: Google Maps API

## Prerequisites

Before running this project, make sure you have:
- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd Tasami
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## Building for Production

Create a production build:
```bash
npm run build
# or
yarn build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
src/
├── assets/       # Static assets and styles
├── hooks/        # Custom React hooks
├── layout/       # Layout components
├── locale/       # i18n translations
├── providers/    # Context providers
├── redux/        # Redux store and slices
├── routes/       # Route components
├── ui/           # UI components
└── utils/        # Utility functions
```

## License

This project is proprietary software. All rights reserved.
