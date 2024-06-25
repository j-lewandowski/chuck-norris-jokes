import { Link } from "react-router-dom";
import Logo from "../images/logo.svg?react";

const Sidebar = () => {
  return (
    <nav className="w-1/4 h-full bg-sidebar-background rounded-3xl flex flex-col items-center justify-around text-white px-8 py-4 relative shadow-2xl">
      <Logo className="aspect-square h-16 fill-white" />
      <ul className="w-full flex flex-col gap-y-8 text-3xl">
        <Link to={"/random-joke"}>
          <li>Random Joke</li>
        </Link>
        <Link to={"/my-jokes"}>
          <li>My Jokes</li>
        </Link>
        <Link to={"/add-joke"}>
          <li>Add Joke</li>
        </Link>
      </ul>

      <span className="text-3xl w-full">LOG OUT</span>

      <span className="absolute bottom-4 text-xs">
        made with Chuck by Chuck - {new Date().getFullYear()}
      </span>
    </nav>
  );
};

export default Sidebar;
