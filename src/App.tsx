import { useEffect, useState } from 'react'
import './App.css'
import TodoPage from './pages/TodoPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StartPage from './pages/Startpage';

function App() {
  const [page, setPage] = useState<"start" | "login" | "signup" | "todo">("start");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPage("todo");
    }
  }, []);
  
  return (
    <>
      {page === "start" && (
        <StartPage
          goLogin={() => setPage("login")}
          goSignup={() => setPage("signup")}
        />
      )}

      {page === "login" && (
        <LoginPage
          onLogin={() => setPage("todo")}
          goSignup={() => setPage("signup")}
        />
      )}
      
      {page === "signup" && (
        <SignupPage
          goLogin={() => setPage("login")}
          />
      )}

      {page === "todo" && (<TodoPage onLogout={() => setPage("login")} />)}
      </>
  );
}

export default App;