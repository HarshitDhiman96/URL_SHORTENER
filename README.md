# URL Shortener Project

A full-stack URL shortener built with React (frontend) and Express + MongoDB (backend). The app allows users to shorten long URLs, optionally create custom slugs, track click counts, and manage their links from a dashboard.

## 1. Project Overview

This project is a simple but complete URL shortener application with:

- User authentication (register, login, logout)
- Short URL creation
- Optional custom short slugs
- Click tracking for each shortened link
- A protected dashboard for logged-in users
- Redirection from short URLs to the original URL

The application is split into two major parts:

- Frontend: React + Vite + Redux + React Query
- Backend: Express + MongoDB + JWT + cookie-based authentication

---

## 2. Tech Stack

### Frontend
- React
- Vite
- TanStack React Router
- Redux Toolkit
- React Query
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Token)
- Cookie-based auth
- bcryptjs
- nanoid

---

## 3. Main Features

### Authentication
- Register a new account
- Login with email and password
- Logout
- Access protected routes using cookie-based JWT authentication

### URL Shortening
- Enter a long URL and generate a shortened version
- Create a custom slug when logged in
- Display the shortened URL directly in the UI
- Copy the shortened URL to clipboard

### Dashboard
- View all URLs created by the currently logged-in user
- See the original URL, short URL, and click count
- Copy links quickly from the dashboard

### Redirection
- Visiting a short URL redirects the browser to the original target URL
- Each redirect increments the click count in the database

---

## 4. How the Project Works

### Frontend flow
1. The user opens the app in the browser.
2. The landing page shows the URL shorten form.
3. If the user is authenticated, the dashboard becomes available and the user can create links and view their history.
4. The frontend sends requests to the backend through Axios.
5. The response is shown in the UI and stored in React Query / Redux state where needed.

### Backend flow
1. The frontend sends a request to the backend API.
2. The backend validates the request and authenticates the user if a valid cookie/JWT is present.
3. The backend generates a short ID (or uses a custom slug).
4. The shortened URL is saved in MongoDB.
5. The frontend receives the shortened URL and displays it to the user.
6. When the short URL is visited, the backend looks up the record, redirects the user, and increments the click count.

### Data flow summary
- Long URL -> backend service -> MongoDB document
- Short ID -> frontend display -> user copy/share
- Clicking short link -> backend lookup -> redirect -> click count update

---

## 5. Backend Routes

The backend is mounted under the following base paths:

| Method | Path | Purpose |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and create an auth cookie |
| POST | /api/auth/logout | Clear the auth cookie |
| GET | /api/auth/me | Get current authenticated user |
| POST | /api/create | Create a short URL |
| POST | /api/user/urls | Get all URLs for the currently logged-in user |
| GET | /:id | Redirect to the original URL for the short URL |

### Backend route behavior
- Authentication routes are handled in the auth controller and service layer.
- URL creation is processed in the short URL controller and service layer.
- User-specific URL history is fetched using the user controller and DAO layer.
- Auth middleware checks cookies and protects private routes.

---

## 6. Frontend Routes

The frontend uses TanStack Router and includes these routes:

| Path | Page | Purpose |
|---|---|---|
| / | HomePage | Main URL shortening page |
| /auth | AuthPage | Login/Register toggle page |
| /dashboard | DashboardPage | Protected page showing the user’s URLs |

---

## 7. Folder Structure

```text
URL_SHORTNER/
├── BACKEND/
│   ├── app.js
│   ├── package.json
│   └── src/
│       ├── config/
│       │   ├── config.js
│       │   └── monogo.config.js
│       ├── controller/
│       │   ├── auth.controller.js
│       │   ├── short_url.controller.js
│       │   └── user.controller.js
│       ├── dao/
│       │   ├── short_url.js
│       │   └── user.dao.js
│       ├── middleware/
│       │   └── auth.middleware.js
│       ├── models/
│       │   ├── short_url.model.js
│       │   └── user.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   ├── short_url.route.js
│       │   └── user.routes.js
│       ├── services/
│       │   ├── auth.service.js
│       │   └── short_url.service.js
│       └── utils/
│           ├── attachUser.js
│           ├── errorHandler.js
│           ├── helper.js
│           └── tryCatchWrapper.js
│
├── FRONTEND/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   ├── shortUrl.api.js
│       │   └── user.api.js
│       ├── components/
│       │   ├── LoginForm.jsx
│       │   ├── NavBar.jsx
│       │   ├── RegisterForm.jsx
│       │   ├── UrlForm.jsx
│       │   └── UserUrl.jsx
│       ├── pages/
│       │   ├── AuthPage.jsx
│       │   ├── DashboardPage.jsx
│       │   └── HomePage.jsx
│       ├── routing/
│       │   ├── auth.route.js
│       │   ├── dashboard.js
│       │   ├── homepage.js
│       │   └── routeTree.js
│       ├── store/
│       │   ├── store.js
│       │   └── slice/
│       │       └── authSlice.js
│       ├── utils/
│       │   ├── axiosInstance.js
│       │   └── helper.js
│       ├── main.jsx
│       ├── RootLayout.jsx
│       └── index.css
```

---

## 8. What Each Important File Does

### Backend
- app.js
  - Starts the Express server
  - Mounts API routes
  - Enables CORS for the frontend
  - Adds cookie parsing and error handling
  - Handles the redirect route for short URLs

- src/routes/auth.routes.js
  - Exposes auth-related endpoints for register/login/logout/me

- src/routes/short_url.route.js
  - Exposes the URL creation endpoint

- src/routes/user.routes.js
  - Exposes endpoint to fetch all URLs for the logged-in user

- src/controller/auth.controller.js
  - Handles auth HTTP requests and sends responses

- src/controller/short_url.controller.js
  - Handles URL creation and redirection logic

- src/controller/user.controller.js
  - Fetches the logged-in user’s URL list

- src/services/auth.service.js
  - Contains registration and login logic

- src/services/short_url.service.js
  - Generates the short code and stores the link information

- src/dao/short_url.js
  - Performs database operations for URL documents

- src/dao/user.dao.js
  - Performs database operations for user data and user-linked URLs

- src/models/user.model.js
  - Defines the user schema and password hashing logic

- src/models/short_url.model.js
  - Defines the shortened URL schema with click tracking

- src/middleware/auth.middleware.js
  - Verifies JWT from cookies and attaches the authenticated user to the request

- src/utils/helper.js
  - Creates and verifies JWTs and generates short IDs using nanoid

- src/config/monogo.config.js
  - Connects the app to MongoDB

### Frontend
- src/main.jsx
  - Starts the React app
  - Creates the React Query client and router
  - Wraps the app in Redux Provider

- src/RootLayout.jsx
  - Shared layout that renders the navbar and page outlet

- src/pages/HomePage.jsx
  - Home page for shortening links

- src/pages/AuthPage.jsx
  - Login and register page switcher

- src/pages/DashboardPage.jsx
  - Protected dashboard page that shows the user’s URL list

- src/components/UrlForm.jsx
  - UI form that creates a short URL and allows custom slug input

- src/components/UserUrl.jsx
  - Displays the user’s created links in a table with click counts and copy actions

- src/components/LoginForm.jsx
  - Handles login UI and submission

- src/components/RegisterForm.jsx
  - Handles registration UI and submission

- src/components/NavBar.jsx
  - Navigation UI for the app layout

- src/api/shortUrl.api.js
  - Sends API requests for URL creation

- src/api/user.api.js
  - Sends API requests for auth and user URL fetching

- src/utils/axiosInstance.js
  - Configures Axios with the backend base URL and credential support

- src/store/store.js
  - Creates the Redux store

- src/store/slice/authSlice.js
  - Stores authentication state such as logged-in user and auth status

- src/routing/routeTree.js
  - Registers all frontend routes

- src/utils/helper.js
  - Contains route guard logic for protected dashboard access

---

## 9. Environment Variables

The backend expects a .env file in the BACKEND folder with values similar to:

```env
MONGO_URI=your_mongodb_connection_string
APP_URL=http://localhost:3000/
JWT_SECRET=your_secret_key
```

This project already includes a sample .env file with the required keys.

---

## 10. NPM Commands Used

### Backend commands
Run these from the BACKEND folder:

```bash
npm install
npm run dev
```

Useful alternative:

```bash
npm start
```

### Frontend commands
Run these from the FRONTEND folder:

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Optional lint check:

```bash
npm run lint
```

---

## 11. How to Run the Project

### Step 1: Start the backend
```bash
cd BACKEND
npm install
npm run dev
```

The backend will run at:
- http://localhost:3000

### Step 2: Start the frontend
```bash
cd FRONTEND
npm install
npm run dev
```

The frontend will run at:
- http://localhost:5173

### Step 3: Use the app
- Open the frontend in your browser
- Register or login
- Create a short URL
- Visit the generated short URL to test redirection

---

## 12. Notes About the Current Implementation

- The project is a working full-stack example for URL shortening.
- Authentication is cookie-based and protected routes rely on the backend middleware.
- The app uses MongoDB for persistence and stores URL metadata such as click counts and ownership.
- The UI is simple and focused on core functionality rather than advanced design.

---

## 13. Summary

This project demonstrates a complete flow for a modern web application:

- Frontend user interaction
- Backend API handling
- Database persistence
- Authentication and authorization
- URL redirection and analytics

It is a good example of how a simple full-stack app can connect React, Express, MongoDB, and JWT authentication in one cohesive system.
