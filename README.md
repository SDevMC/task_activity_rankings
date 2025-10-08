# Weather Desirability App

A full-stack web application that ranks activities based on weather data for different locations.

## Architecture Overview

### System Architecture

The application follows a client-server architecture with a clear separation of concerns:

- **Frontend**: React application built with TypeScript and Vite
- **Backend**: Node.js server with Express and Apollo GraphQL
- **External API Integration**: OpenMeteo API for weather data

### Data Flow

1. User searches for a location in the frontend
2. Frontend sends GraphQL query to backend
3. Backend searches for location coordinates
4. Backend fetches weather data from OpenMeteo API
5. Backend calculates activity rankings based on weather conditions
6. Results are returned to frontend via GraphQL
7. Frontend displays location details and activity rankings

## Technical Choices

### Backend

- **GraphQL with Apollo Server**: Chosen for its type safety, efficient data fetching, and self-documenting API
- **TypeScript**: Provides strong typing and better developer experience
- **Express**: Lightweight web framework for handling HTTP requests
- **OpenMeteo API**: Free, reliable weather data source with no API key requirements
- **Modular Architecture**: Separated into services, resolvers, and schema for maintainability

### Frontend

- **React 19**: Latest version with improved performance and features
- **Apollo Client**: For seamless GraphQL integration
- **TypeScript**: For type safety and better developer experience
- **Vite**: Fast, modern build tool with excellent developer experience
- **Component-Based Architecture**: Reusable, maintainable UI components

### Activity Ranking Algorithm

- Implemented a scoring system that evaluates weather conditions for different activities
- Each activity has specific factors (temperature, precipitation, wind, etc.) that affect its score
- Scores are normalized on a 0-10 scale for easy comparison
- Algorithm is extensible for adding new activities or weather factors

## Features

- Location search 
- Activity recommendations based on weather conditions
- Visual representation of activity scores

## Omitted Features and Polish

1. **User Authentication**: Not implemented as it wasn't core to the MVP functionality. Would be necessary for saving favorite locations or personalized recommendations.

2. **Caching Strategy**: Basic Apollo caching is implemented, but a more sophisticated caching strategy with persistence would improve performance and offline capabilities.

3. **Error Handling Refinement**: Basic error handling is in place, but more comprehensive error boundaries and user-friendly error messages would enhance the user experience.

4. **Debouncing for Search**: Noted in a TODO comment but not implemented. Would improve performance by limiting API calls during typing.

5. **Weather Forecast History**: Currently only shows current day's data. Historical data could provide trends and better planning capabilities.

6. **Responsive Design Polish**: Basic responsiveness is implemented, but additional polish for various screen sizes would enhance mobile experience.


These features were prioritized lower to focus on delivering a functional core experience that demonstrates the key technical capabilities and user flows.

## Testing Approach

Tests were not included in this submission due to time constraints and prioritizing core functionality. In a production environment, I would implement:

- **Unit Tests**: For utility functions like the activity ranking algorithm
- **Integration Tests**: For GraphQL resolvers and service interactions
- **Component Tests**: For React components using React Testing Library
- **E2E Tests**: For critical user flows using Cypress or Playwright

The codebase was designed with testability in mind, using dependency injection patterns and clear separation of concerns to facilitate future test implementation.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open http://localhost:5173 in your browser

## Environment Variables

No API keys are required as the application uses the free OpenMeteo API.
