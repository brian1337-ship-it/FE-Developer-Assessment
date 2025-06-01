import { cn } from "@/utils/styleMerge";
import { Link } from "react-router-dom";

const Logo = ({
  className,
  spanDesign,
}: {
  className?: string;
  spanDesign?: string;
}) => {
  return (
    <Link to="/" className="inline-flex">
      <h2
        className={cn(
          "text-2xl text-shop_dark_green font-black tracking-wider uppercase hover:text-shop_light_green hoverEffect group font-sans",
          className
        )}
      >
        T-Mar
        <span
          className={cn(
            "text-shop_light_green group-hover:text-shop_dark_green hoverEffect",
            spanDesign
          )}
        >
          t
        </span>
      </h2>
    </Link>
  );
};

export default Logo;
