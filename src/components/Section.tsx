import { cn } from "@/utils/styleMerge";
import React from "react";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default Section;
