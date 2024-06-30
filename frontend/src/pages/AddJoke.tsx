import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddJoke = () => {
  const [joke, setJoke] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(import.meta.env.VITE_API_BASE_URL + "/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ joke }),
      });
      setJoke("");
      toast.success("Joke saved successfully");
    } catch (error) {
      toast.error("Chuck Norris didnt allow you to save that joke, try again");
    }
  };

  return (
    <div className="w-full flex-1 shrink-0 h-full rounded-2xl bg-white shadow-2xl flex flex-col items-start justify-between py-24 px-12">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-2/3 h-full justify-between"
      >
        <span className="text-3xl font-semibold mb-6">Add joke</span>
        <TextField
          variant="outlined"
          multiline
          fullWidth
          placeholder="Type your joke here"
          label="Joke"
          minRows={6}
          value={joke}
          onChange={(e) => setJoke(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          disabled={joke.trim().length === 0}
          type="submit"
        >
          ADD JOKE
        </Button>
      </form>
    </div>
  );
};
