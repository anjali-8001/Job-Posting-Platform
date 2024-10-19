import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../client/src/pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Verification from "./pages/Verification";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import NewJob from "./pages/NewJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-interview" element={<NewJob />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
