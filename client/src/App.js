import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.js"

function App() {
  const [user, setUser] = useState(null);
  

  useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
          }
        });
      }, []);

  console.log(user)


  return (
    <div>
      <header>
        <NavBar />
      </header>
        <Outlet context={[user, setUser]}/>
    </div>
  )
}

export default App;
