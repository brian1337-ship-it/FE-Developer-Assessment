# Taager Frontend Developer Assessment

An e-commerce store built with React, TypeScript, and Vite. This project demonstrates a complete product browsing experience with cart functionality, search capabilities, and responsive design.

## 📋 Project Overview

This project showcases:

- Clean, maintainable code structure
- Product listing and detail pages
- Shopping cart functionality with persistent state
- Search and filtering capabilities
- Responsive design for mobile and desktop
- Modern React patterns with TypeScript
- State management with Redux Toolkit
- API integration with error handling
- Performance optimizations
- Deploy app on Vercel

## 🛠 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom components
- **State Management**: Redux Toolkit
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Separator, etc.)
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Header.tsx      # Navigation and search
│   ├── ProductCard.tsx # Product display component
│   └── ...
├── features/           # Feature-based modules
│   └── shop/          # Shopping cart logic
│       └── shopSlice.ts
├── hooks/             # Custom React hooks
│   ├── useFakeStoreApi.ts  # API integration hooks
│   └── useUI.ts  # DOM utility hooks
├── pages/             # Page components
│   ├── Home.tsx       # Homepage with featured products
│   ├── Products.tsx   # Product listing page
│   ├── ProductDetail.tsx  # Individual product page
│   ├── Cart.tsx       # Shopping cart page
│   └── SearchResults.tsx  # Search results page
├── store/             # Redux store configuration
│   └── store.ts
├── types/             # TypeScript type definitions
│   └── fakeStoreApi.ts
├── utils/             # Utility functions
├── App.tsx            # Main app component
└── main.tsx          # Application entry point
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd FE-Developer-Assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🚀 Live Demo

- [View Live Application](https://fe-developer-assessment-5kn9.vercel.app/)

---
