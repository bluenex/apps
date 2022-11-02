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
        "h-screen w-screen overflow-x-hidden bg-neutral-700 text-gray-100",
        className,
      )}
    >
      <header className="flex h-14 items-center bg-neutral-600 bg-opacity-60 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-xl font-bold">Simple Budget</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">{children}</div>
    </div>
  );
};

export default Layout;
