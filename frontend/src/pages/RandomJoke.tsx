import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Chuck from "../images/chuck.png";
import { useEffect, useState, useRef } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const RandomJoke = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [joke, setJoke] = useState<string>("");

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const [impersonateInput, setInpersonateInput] = useState<string>("");

  const isMounted = useRef(false);

  const replaceChuckNorris = (joke: string) => {
    return joke.replace(new RegExp("Chuck Norris", "g"), impersonateInput);
  };

  const onSave = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/jokes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ joke }),
      });
      await response.json();

      toast.success("Joke saved successfully");
    } catch (error) {
      toast.error("Failed to save joke");
    }
  };

  const fetchRandomJoke = async (category: string = "") => {
    try {
      let url = "https://api.chucknorris.io/jokes/random";
      if (category) {
        url += `?category=${category}`;
      }
      const response = await fetch(url);

      if (!response.ok) {
        toast.error(
          "Chuck Norris kicked the joke back to the server, try again"
        );
      }
      const data = await response.json();
      if (impersonateInput) {
        setJoke(replaceChuckNorris(data.value));
        return;
      }
      setJoke(data.value);
    } catch (error) {
      toast.error("Chuck Norris kicked the joke back to the server, try again");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://api.chucknorris.io/jokes/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setCategories(["No categories found"]);
    }
  };

  const onDrawRandomJoke = async () => {
    setIsLoading(true);
    await fetchRandomJoke(selectedCategory);
    setIsLoading(false);
  };

  useEffect(() => {
    isMounted.current = true;

    fetchCategories();
    fetchRandomJoke();
    setIsLoading(false);

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="w-full max-w-3xl  h-full rounded-2xl bg-white shadow-2xl flex flex-col items-start justify-between py-24 px-12 relative">
      <img
        src={Chuck}
        alt="Chuck Norris picture"
        className="rounded-2xl border-4 border-white aspect-auto w-1/2 shadow-2xl -mt-16 absolute left-1/2 -translate-x-1/2 top-0"
      />

      <span className="text-3xl font-semibold">Get your random joke</span>
      {isLoading ? (
        <div className="h-12 w-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <p className="text-xl italic">"{joke}"</p>
      )}

      <div className="w-full flex gap-x-6">
        <div className="w-2/3 gap-y-8 flex flex-col">
          <TextField
            fullWidth
            variant="outlined"
            label="Impersonate"
            placeholder="Impersonate Chuck Norris"
            value={impersonateInput}
            onChange={(e) => setInpersonateInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={onDrawRandomJoke}
          >
            DRAW A RANDOM {impersonateInput ? impersonateInput : "CHUCK NORRIS"}{" "}
            JOKE
          </Button>
        </div>
        <div className="w-1/3 gap-y-8 flex flex-col">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
            <Select
              label="Categories"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" fullWidth onClick={onSave}>
            SAVE THIS JOKE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RandomJoke;
