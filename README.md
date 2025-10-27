# React Dashboard Project

A beginner-friendly React TypeScript dashboard app utilizing React Router, Context API or Redux, and Tailwind CSS or Sass. The app features robust user management, note-taking, analytics, and real-time weather integration.

### Features

- **Login page:** Authenticates with dummy credentials and manages login state using Context or Redux.
- **Dashboard:** Houses three main feature cards:
   - **User Posts Manager:** Fetches users/Post/To-do data, enables user selection and supports preserving to-do states.
   - **Note Manager:** Allows adding, deleting, and categorizing notes by priority, with features like drag/drop or select-change for priority updates.
   - **Simple Analytics:** Displays user statistics (total count, most/fewest posts, most/fewest completed to-dos).
   - **Weather Widget:** Fetches and displays live weather data for any city using the OpenWeatherMap API, including error and loading states with optional location detection.

### Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd <repository-name>
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
   Ensure you have Node.js and npm installed on your system.

### Usage

1. **Start the development server:**
   ```
   npm start
   ```
2. **Open in your browser:**
   ```
   http://localhost:3000
   ```

### Project Structure

- **src/**
  - **components/**: Feature cards and shared components
      - **common/**: Error page and Loading
      - **Layout/**: NavBar
   - **Context/**: Authcontext
   - **Pages/**: Pages of the App.

### API Endpoints

- **User, Post, To-do Data**: `https://jsonplaceholder.typicode.com/users`
- **Weather Data**: 
  - `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIKEY}&units=metric`
  - For icons: `https://openweathermap.org/img/wn/{icon}.png`

### Notes

- Dummy login credentials:  
   - Username: `amr`  
   - Password: `123`
- States are managed using Context or Redux (choose one).
- Bonus challenges: Persist login and notes using localStorage, add loader/error states to fetch requests.

### License

Open source for educational purposes.
