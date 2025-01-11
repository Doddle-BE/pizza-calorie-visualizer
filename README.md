# [WIP] 🍽️ Meal Calorie Pizza Visualizer

A modern web application that helps users track their meal calorie intake through an intuitive pizza-based visualization system.

> <span style="color: orange">**Note:** Currently, the application is a work in progress and does not have any AI functionality.</span>

## 🌟 Features

- 🎯 Visual calorie tracking with an interactive pizza wheel
- 🎨 Beautiful, realistic food visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🛠️ Tech Stack

- React Router 7
- React 19
- TypeScript
- Tailwind CSS
- Vite

## 🏗️ Project Structure

```
app/
├── components/         # React components
│   ├── pizza-slice.tsx
│   ├── pizza-toppings.tsx
│   └── pizza-visualization.tsx
├── helpers/           # Utility functions
├── routes/            # Application routes
└── utils/            # API utilities
```

## 🧪 Development

```bash
# Run development server
pnpm dev

# Type checking
pnpm typecheck

# Production build
pnpm build
```

## 🐳 Docker Support

Build and run using Docker:

```bash
# Build the image
docker build -t meal-tracker .

# Run the container
docker run -p 3000:3000 meal-tracker
```

## 📦 Deployment

The application can be deployed to any platform that supports Node.js or Docker containers.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
