import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: FC<LayoutProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "h-screen w-screen bg-neutral-700 text-gray-100",
        className,
      )}
    >
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
