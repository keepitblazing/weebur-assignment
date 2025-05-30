import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  action?: ReactNode;
}

const Header = ({ title, action }: HeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="block text-3xl font-bold text-gray-900">{title}</h1>
        {action}
      </div>
    </div>
  );
};

export default Header;
