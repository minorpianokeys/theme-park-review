import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.js"

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user))
          }
        });
      }, []);

  function handleLogout() {
    console.log("logging out")
    fetch("/logout", {
        method: "DELETE",
    })
    .then(setUser(null))
    .then(navigate("/"))
  }

  return (
    <div>
      <header>
        <NavBar onLogout={handleLogout} user={user}/>
      </header>
        <Outlet context={[user, setUser]}/>
    </div>
  )
}

export default App;
