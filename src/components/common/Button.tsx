import { ReactNode, ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: IconProp;
}

const Button = ({
  children,
  variant = "primary",
  className = "",
  icon,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer text-white";
  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={classes} {...props}>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
