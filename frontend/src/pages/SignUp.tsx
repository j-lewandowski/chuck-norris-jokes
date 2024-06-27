import { Button, TextField } from "@mui/material";
import Logo from "../images/logo.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Particles from "../images/particles.svg?react";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async () => {
    if (!email || !password) return;
    const data = await fetch("http://localhost:3000/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const res = await data.json();

    if (res.error) {
      alert(res.message);
      return;
    }

    localStorage.setItem("token", res.token);
    navigate("/random-joke");
  };

  return (
    <div className="w-full h-full bg-card-background rounded-xl py-4 flex flex-col items-center shadow-xl relative">
      <Particles className="absolute left-0 -translate-x-[50%] top-12 h-32" />
      <Particles className="absolute right-0 translate-x-[50%] bottom-12 h-16" />
      <div className="flex flex-col items-center justify-around w-full max-w-[50%] h-full">
        <Logo className="w-16 h-16 fill-sidebar-background" />
        <span className="text-3xl">Explore "Chuck Jokes" with us!</span>
        <div className="w-full flex flex-col items-center gap-y-6">
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            placeholder="Type your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            placeholder="Type your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="w-full flex flex-col items-center justify-center gap-y-3">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              disabled={password.length === 0 || email.length === 0}
              onClick={onSubmit}
            >
              CREATE ACCOUNT
            </Button>
            <p>
              Already have an account?{" "}
              <Link to={"/sign-in"} className="font-bold">
                Log in here
              </Link>
              .
            </p>
          </div>
        </div>

        <p className="text-base text-dark-pink">
          "Chuck Norrris can login without signin up, on any website"
        </p>
      </div>
    </div>
  );
};

export default SignUp;
