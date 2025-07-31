# Agriverse360

A comprehensive agricultural monitoring and management system.

## Project Structure

This project is divided into two main components:

### Frontend (`frontend/`)

A React-based web application providing the user interface for:

- Real-time monitoring of farm conditions
- Irrigation system control
- Plant disease detection
- Farm management tools
- Voice-controlled assistant

### Backend (`backend/`)

A Node.js/Express API server handling:

- Data processing from sensors
- User authentication and management
- Database operations
- Integration with external services

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install frontend dependencies: `npm install`
4. Navigate to the backend directory: `cd ../backend`
5. Install backend dependencies: `npm install`

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   ./run-app.sh
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   ./run-app.sh
   ```

## Development

Each component has its own development environment and can be run independently. See the README files in each directory for more detailed instructions.