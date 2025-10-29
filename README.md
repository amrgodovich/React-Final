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
   git clone https://github.com/amrgodovich/React-Final.git
   cd React-Final
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


### Snapshots
<img width="1315" height="642" alt="(7)" src="https://github.com/user-attachments/assets/7dd36084-fed3-45fb-8a86-9b1cf4b88cd3" />
<img width="1315" height="642" alt="(6)" src="https://github.com/user-attachments/assets/70826cd0-fb69-4967-9725-4cb3ec9e5ac1" />
<img width="1298" height="642" alt="(5)" src="https://github.com/user-attachments/assets/b7af6db2-103e-4320-ad96-b8c85d95833f" />
<img width="1298" height="642" alt="(4)" src="https://github.com/user-attachments/assets/5afa988b-69d4-4573-a827-e822943fe15a" />
<img width="1298" height="642" alt="(3)" src="https://github.com/user-attachments/assets/475c5979-3727-4c99-ab58-1c81fa41ce18" />
<img width="1298" height="642" alt="(2)" src="https://github.com/user-attachments/assets/0fc9533b-066c-4f00-913b-d09196ff4f44" />
<img width="1315" height="642" alt="(1)" src="https://github.com/user-attachments/assets/038ce906-4b66-43c6-8b82-35e8b16e9f32" />

### License

Open source for educational purposes.
