import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Logo />

          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops!</h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;re sorry. The page you're looking for doesn't exist.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md text-white bg-shop_dark_green/80 hover:bg-shop_dark_green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amazonOrangeDark hoverEffect"
            >
              Go back to our home page
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link
              to=""
              className="font-medium text-amazon-blue hover:text-amazon-blue-dark"
            >
              Contact us.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
