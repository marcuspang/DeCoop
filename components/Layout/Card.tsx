import { ReactNode } from "react";

interface CardProps {
  title?: string;
  className?: string;
  children?: ReactNode;
}

const Card = ({ title, className, children }: CardProps) => {
  return (
    <div
      className={`header-background pt-4 px-4 pb-6 rounded shadow w-full mt-3 ${className}`}
    >
      {title && (
        <h3 className="font-semibold text-xl text-gray-600 mb-2">{title}</h3>
      )}
      {children}
    </div>
  );
};

export default Card;
