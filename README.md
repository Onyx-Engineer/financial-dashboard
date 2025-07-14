# Financial Dashboard

A modern, responsive financial dashboard built with React, TypeScript, and Material-UI.

## Tech Stack

### Core Technologies

- **React 19.1.0** - UI library
- **TypeScript 5.8.3** - Type safety and enhanced developer experience
- **Vite 5.4.19** - Fast build tool and development server
- **Material-UI 7.2.0** - Component library and design system
- **React Router DOM 7.6.3** - Client-side routing

### Data & Charts

- **Recharts 3.1.0** - Interactive charting library
- **date-fns 4.1.0** - Date manipulation utilities

### Development & Testing

- **Vitest 1.6.1** - Fast testing framework
- **Testing Library** - React testing utilities
- **ESLint** - Code linting and formatting
- **jsdom** - DOM environment for testing

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd financial-dashboard-int
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   - The project uses TypeScript with path aliases (`@` → `./src`)
   - No additional environment variables are required for basic setup

## Running the Application

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Testing

### Run Tests

Execute the test suite:

```bash
npm run test
```

### Run Tests with UI

Launch the interactive test interface:

```bash
npm run test:ui
```

### Run Tests Once

Execute tests in CI mode (single run):

```bash
npm run test:run
```

### Test Coverage

Generate and view test coverage reports:

```bash
npm run test:coverage
```

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

# Financial Dashboard Project

## Intro

This is a review of this financial dashboard project. The core goal was to handle the following business requirements: A dashboard with 2 views for Performance Data and Summary of Holdings, with a strong focus on UX.

The first plan of attack was to conduct a survey of UX patterns and then map them to a scalable project architecture. After research, I saw the following categories:

- Design Huerestics
- Interaction Design
- User Goals and Task Flows
- Visual Design and UI patterns
- Usability Testing and Metrics
- Dashboard Design and Data Density
- Edge Case Handling
- Accessibility
- Microinteractions

With this understanding, I defined an architecture that would be technically scalable and provide a good UI/UX.

## Overall Structure

The overall component structure starts with the:

- **Root Component**: starting point of the app
- **AppShell** – Global Layout component – Holds the Sidebar and Main Content. This can be expanded to add a footer or any other global components.
- **Sidebar** – displays the app navigation through routing to update the main content view. Can easily add new features like Settings or other financial reporting. Did not implement React Lazy, but this could be added to reduce the initial load JS size for Performance and Holdings components.
- **ErrorBoundary** – to catch any rendering errors in the subtrees, preventing a blank white screen effect. Utilizes a fallback UI.
- **Performance component** – Is a chart that uses the Recharts library to display Performance data over a range of time. There is also a date picker that updates the chart.
- **Holdings component** – Is a table that would contain a user’s holdings in each asset. They can filter table data with functionality by column and also search. With a real API, it would be good to monitor the number of calls being made (using a debounce feature) for performance purposes.
- **UI** – Used a combination of Material UI and Tailwind CSS. Material UI provides a large prebuilt set of self-contained components, and Tailwind utilities cover most CSS styling requirements.

Review - Future improvements

## Data Model

Holding and Performance Data to TypeScript interfaces for type checking.

## API Layer

I created an API layer that would simulate async API calls using mocked data. Each would have a correlated custom hook to encapsulate the data fetching logic from the feature's presentational components. For scalability, I added an API config that can be used with a Vite env file to match production deployment standards and backend integration.

Future enhancements for a financial dashboard could be a WebSocket integration for real-time changes, since a user's numbers would change often during trading hours.

## State Management

Use local component state, like sorting in the Holding component, and Custom hooks to handle data fetching. The feature slices were relatively siloed, so they did not have a strong use for a global store. An enhancement could be adding a store if more views are added, which may aggregate data, but for this app size, hooks were enough.

## Custom Hooks

Created a custom hook to handle data fetching for each view. The notifications for the toasts are emitted from this point. I focused primarily on the unhappy path. The happy path already utilizes different UX indicators of loading and success with the skeleton loading UI.

## Layout

Mentioned in the overall structure section. This is where the AppShell, Sidebar, Routing, ErrorBoundary, and Responsive Design are handled. Most viewports handle the design well, but would need CSS tweaks at the smaller screens closer to 320px.

## Feature Modules

Three views: Dashboard provides a snapshot of the Holdings and Performance pages. The Holdings and Performance pages provide a more granular view of the data. They all utilize standard accessibility. Also, uses Container-Presentation pattern to control data and separation of concerns.

## Theme and Styling

As mentioned, Material UI is used with a theme.ts to set global CSS and tailwind config as well. For time purposes, I used Tailwind CDN, but the best practice would be using PostCSS and Tailwind CSS configs.

## Error Handling

ErrorBoundary catches React errors with a fallback UI. The fallback UI provides functionality to attempt to retry the API request. As mentioned before, there is a Toast system displayed by the notification system.

## Performance Optimization

As mentioned, a good idea would be to utilize React Lazy for Performance and Holdings views.

## UX Design Framework

Now, I am going to walk through some of the UX design principles used.

- **Visibility of System Status** – clear feedback on loading using skeletons, also toasts/snackbars to update on status of operations.
- **Consistency & Standards** – using Material UI theme.ts, which defines consistency with typography, color schemes etc.
- **Aesthetic & Minimalist Design** – clear design utilizing a sidebar navigation, cards, charts, and tables without being cluttered.
- **Feedback** – notification service provides feedback for multiple levels (success, error, info, warning) in queues, so user has more insight into the impact of their actions.
- **Hierarchy** – Typography is defined clearly by size and font weight. Dashboard is an aggregate of data, while next pages define a more granular step into the design.
- **Grid Systems** – allows consistent spacing and consistency across views.
- **Responsiveness** – responsiveness clearly defined by Material UI-defined breakpoints
- **User Feedback Loops** – Toast system provides clear feedback, and also Error Fallback provides clarity on error and opportunity to retry a failed page.
- **KPIs & Metrics Clarity** – uses currency formatting and quick snapshots of key investor metrics.

## Future Enhancements / Additions

- Use WebSockets and socket.io client for real-time data
- More advanced filtering and search
- Export functionality (typically PDF)
- Dark/Light theme: Most platforms like Ninja Trader, ThinkOrSwim, and TraderView
- I18n – support for multiple languages
- Add more advanced analytics for marketing – GA4
- Ability for the user to set Alerts and Notifications based on certain conditions
- Code quality tools – test coverage, pre-commit hooks, linting, and prettier
- Storybook design system so that sharable components can be reused in several applications
- Improve test coverage
- Integrate a backend API
