import { useEffect, useState, useRef } from "react";
import { FiDelete } from "react-icons/fi";
import { Joke } from "../types";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const MyJokes = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const fetchJokes = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/jokes", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setJokes(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(
          "Chuck Norris kicked your jokes back to the server, try again"
        );
      }
    };

    fetchJokes();

    return () => {
      isMounted.current = false;
    };
  }, []);

  const onDelete = async (id: string) => {
    try {
      await fetch(import.meta.env.VITE_API_URL + `/jokes/joke/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setJokes(jokes.filter((joke) => joke.id !== id));
    } catch (error) {
      toast.error(
        "Chuck Norris didn't allow you to delete the joke, try again"
      );
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className="w-full flex-1 shrink-0 h-full rounded-2xl bg-white shadow-2xl flex flex-col items-start justify-between py-24 px-12">
      <span className="text-2xl font-semibold mb-6">My Jokes list</span>
      <div className="w-full h-full overflow-y-auto gap-y-2 flex flex-col">
        {jokes.length > 0 ? (
          jokes.map((joke, i) => (
            <div
              onClick={() => onDelete(joke.id)}
              key={joke.id}
              className="w-full text-lg flex items-center gap-x-4 px-2 group duration-150 hover:bg-light-pink/50 hover:cursor-pointer font-light rounded-lg"
            >
              <span>{i + 1}.</span>
              <div className="flex-1">
                <div className="max-w-xl overflow-hidden truncate">
                  {joke.joke}
                </div>
              </div>

              <FiDelete className="hover:cursor-pointer ml-10 group-hover:text-dark-pink" />
            </div>
          ))
        ) : (
          <div>
            <span className="text-lg font-light">
              You don't have any saved jokes yet
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJokes;
