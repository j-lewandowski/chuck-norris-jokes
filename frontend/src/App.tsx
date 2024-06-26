import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RandomJoke from "./pages/RandomJoke";
import PrivateRoute from "./components/PrivateRoute";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#E84A8F",
      },
      secondary: {
        main: "#5B64B4",
      },
    },
  });

  return (
    <div className="px-40 py-32 w-full h-full flex">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/random-joke" />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/random-joke" element={<PrivateRoute />}>
              <Route path="/random-joke" element={<RandomJoke />} />
            </Route>
            <Route path="/my-jokes" element={<PrivateRoute />}>
              <Route path="/my-jokes" element={<div></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
