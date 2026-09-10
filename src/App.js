import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MySkills from './pages/MySkills';
import SkillGap from './pages/SkillGap';
import Learning from './pages/Learning';
import Assessment from './pages/Assessment';
import TakeQuiz from './pages/TakeQuiz';
import QuizResults from './pages/QuizResults';
import Admin from './pages/Admin';
import About from './pages/About';
import Sidebar from './components/Sidebar';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      ) : (
        <div>
          <Sidebar onLogout={handleLogout} />

          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard user={user} />}
            />

            <Route
              path="/my-skills"
              element={<MySkills user={user} />}
            />

            <Route
              path="/skill-gap"
              element={<SkillGap user={user} />}
            />

            <Route
              path="/learning"
              element={<Learning user={user} />}
            />

            <Route
              path="/assessment"
              element={<Assessment user={user} />}
            />

            <Route
              path="/take-quiz"
              element={<TakeQuiz user={user} />}
            />

            <Route
              path="/quiz-results"
              element={<QuizResults user={user} />}
            />

            <Route
              path="/admin"
              element={<Admin user={user} />}
            />

            <Route
              path="/about"
              element={<About user={user} />}
            />

            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;