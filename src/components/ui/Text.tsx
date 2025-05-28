import { cn } from "@/utils/styleMerge";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Title = ({ children, className }: TextProps) => {
  return (
    <h2
      className={cn(
        "text-3xl font-bold text-shop_dark_green capitalize tracking-wide font-sans",
        className
      )}
    >
      {children}
    </h2>
  );
};

const SubTitle = ({ children, className }: TextProps) => {
  return (
    <h3 className={cn("font-semibold text-gray-900 font-sans", className)}>
      {children}
    </h3>
  );
};

const SubText = ({ children, className }: TextProps) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>;
};

export { Title, SubTitle, SubText };
