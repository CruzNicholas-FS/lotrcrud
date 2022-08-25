import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/signup" exact element={<SignUp/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/characters/:id" exact element={<Character/>} />
        <Route path="/dashboard" exact element={<Dashboard/>} />
        <Route path="/" exact element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
