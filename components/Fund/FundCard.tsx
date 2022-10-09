import { ReactNode } from "react";
import Spinner from "../Layout/Spinner";

interface FundCardProps {
  title?: string;
  amount?: number | string;
  symbol?: string;
  description?: string; // description of person who performed last transaction
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const FundCard = ({
  amount,
  title,
  symbol = "ETH",
  description,
  className,
  isLoading,
  children,
}: FundCardProps) => {
  return (
    <div
      className={`pt-4 px-4 pb-6 bg-white rounded shadow w-full mt-2 ${className}`}
    >
      {title && (
        <h3 className="font-semibold text-xl text-gray-600 mb-2">{title}</h3>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <span className="font-bold text-3xl">
            {amount} {amount ? symbol : ""}
          </span>
          {description && <p className="text-blue-700">{description}</p>}
          {children}
        </>
      )}
    </div>
  );
};

export default FundCard;
