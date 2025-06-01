import { Facebook, Instagram, Youtube } from "lucide-react";
import { cn } from "@/utils/styleMerge";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
  iconClassName?: string;
}
const socialLink = [
  {
    title: "Youtube",
    link: "",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Instagram",
    link: "",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    link: "",
    icon: <Facebook className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName }: Props) => {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      {socialLink?.map((item) => (
        <Link
          key={item?.title}
          rel="noopener noreferrer"
          to={item?.link}
          className={cn(
            "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
            iconClassName
          )}
        >
          {item?.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;
