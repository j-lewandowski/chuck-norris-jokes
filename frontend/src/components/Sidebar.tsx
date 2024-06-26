import { Link, useLocation } from "react-router-dom";
import Logo from "../images/logo.svg?react";

const Sidebar = () => {
  const location = useLocation();
  const routes = [
    {
      name: "RANDOM JOKE",
      href: "/random-joke",
    },
    {
      name: "MY JOKES",
      href: "/my-jokes",
    },
    {
      name: "ADD JOKE",
      href: "/add-joke",
    },
  ];

  return (
    <nav className="w-1/4 h-full bg-sidebar-background rounded-3xl flex flex-col items-center justify-between text-white px-8 pt-8 pb-16 relative shadow-2xl">
      <div className="w-full flex flex-col items-center justify-start">
        <Logo className="aspect-square w-auto h-12 fill-white" />
        <ul className="w-full flex flex-col gap-y-8 text-xl mt-8">
          {routes.map((route) => (
            <Link
              to={route.href}
              className={
                location.pathname === route.href
                  ? "underline underline-offset-[3px] decoration-2"
                  : ""
              }
              style={{
                textDecorationSkipInk: "none",
              }}
            >
              <li>{route.name}</li>
            </Link>
          ))}
        </ul>
      </div>

      <span className="text-xl w-full">LOG OUT</span>

      <span className="absolute bottom-4 text-xs">
        made with Chuck by Chuck - {new Date().getFullYear()}
      </span>
    </nav>
  );
};

export default Sidebar;
