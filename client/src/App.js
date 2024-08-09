import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.js"

function App() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
        <Outlet />
    </div>
  )
}

export default App;
