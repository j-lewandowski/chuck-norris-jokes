import { Button, TextField } from "@mui/material";
import Chuck from "../images/chuck.png";

const RandomJoke = () => {
  return (
    <div className="w-full h-full rounded-2xl bg-white shadow-2xl flex flex-col items-start justify-between py-24 px-12 relative">
      <img
        src={Chuck}
        alt="Chuck Norris picture"
        className="rounded-2xl border-4 border-white aspect-auto w-1/2 shadow-2xl -mt-16 absolute left-1/2 -translate-x-1/2 top-0"
      />

      <span className="text-3xl font-semibold">Get your random joke</span>
      <p>
        “If Chuck Norris were to travel to an alternate dimension in which there
        was another Chuck Norris and they both fight, they would both win”
      </p>

      <div className="w-full flex gap-x-6">
        <div className="w-2/3 gap-y-8 flex flex-col">
          <TextField fullWidth />
          <Button variant="contained" color="secondary" fullWidth>
            DRAW A RANDOM CHUCK NORRIS JOKE
          </Button>
        </div>
        <div className="w-1/3 gap-y-8 flex flex-col">
          <TextField fullWidth />
          <Button variant="contained" fullWidth>
            SAVE THIS JOKE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RandomJoke;
