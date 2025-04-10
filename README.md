# FallonFrontend

This is the frontend for the Fallon project, built with React, Zustand, and TailwindCSS. It provides a user-friendly interface for submitting feedback and managing feedback data.

## Features

- User authentication with JWT
- Feedback submission form with validation
- Feedback dashboard with search, pagination, and sorting
- Dark mode toggle
- Responsive design using TailwindCSS

## Project Structure

```
frontend/
├── .env
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── LoadinSpinner.jsx
│   │   ├── Navbar.jsx
│   │   └── ThemeToggle.jsx
│   ├── lib/
│   │   └── axios.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Feedback.jsx
│   │   └── LoginPage.jsx
│   └── stores/
│       └── useUserStore.js
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/FallonFrontend.git
   cd FallonFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variable:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React
- Zustand (state management)
- TailwindCSS (styling)
- Axios (HTTP client)
- React Router (routing)
- React Hot Toast (notifications)
- Framer Motion (animations)

## Features Overview

### Feedback Form
- Allows users to submit feedback with validation for required fields.
- Displays success or error messages using toast notifications.

### Feedback Dashboard
- Displays a list of feedback submissions.
- Includes search, pagination, and sorting functionality.
- Allows admins to view detailed feedback.

### Authentication
- Login functionality for admins.
- JWT-based authentication with protected routes.

### Dark Mode
- Toggle between light and dark themes.
- Saves the user's preference in local storage.

---

Feel free to contribute or raise an issue if you find any bugs or have suggestions!
