import { TagIcon, HomeIcon, InboxIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <header className="relative bg-green-800 w-16 flex flex-col justify-between items-center h-screen py-6 before:transition-transform before:content before:absolute before:-translate-y-full before:inset-0 before:bg-green-800 before:z-[-1]">
      <div>
        <Link className="block mb-6" to="/">
          <img src={Logo} className="h-8 w-8 text-white" aria-hidden="true" />
          <span className="sr-only">Shopify Inventory</span>
        </Link>

        <nav className="flex flex-col gap-4">
          <Link className="flex justify-center" to="/">
            <HomeIcon
              className="h-5 w-5 text-green-100 hover:text-white"
              aria-hidden="true"
            />
            <span className="sr-only">Home</span>
          </Link>
          <Link className="flex justify-center" to="products">
            <TagIcon
              className="h-5 w-5 text-green-100 hover:text-white"
              aria-hidden="true"
            />
            <span className="sr-only">Products</span>
          </Link>
          <Link className="flex justify-center" to="orders">
            <InboxIcon
              className="h-5 w-5 text-green-100 hover:text-white"
              aria-hidden="true"
            />
            <span className="sr-only">Orders</span>
          </Link>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <Link className="flex items-center" to="settings">
          <Cog6ToothIcon
            className="h-5 w-5 text-green-100 hover:text-white"
            aria-hidden="true"
          />
          <span className="sr-only">Settings</span>
        </Link>
        <Link className="flex items-center" to="account">
          <UserCircleIcon
            className="h-5 w-5 text-green-100 hover:text-white"
            aria-hidden="true"
          />
          <span className="sr-only">User</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
