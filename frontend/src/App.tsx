import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RandomJoke from "./pages/RandomJoke";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="px-32 py-24 w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/random-joke" element={<PrivateRoute />}>
            <Route path="/random-joke" element={<RandomJoke />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
