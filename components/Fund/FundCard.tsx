import { ReactNode } from "react";
import Spinner from "../Layout/Spinner";
import Card from "../Layout/Card";

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
  if (isLoading) {
    return (
      <Card title={title} className={className}>
        <Spinner />
      </Card>
    );
  }
  return (
    <Card title={title} className={className}>
      <span className="font-bold text-3xl">
        {amount} {amount ? symbol : ""}
      </span>
      {description && <p className="text-blue-700">{description}</p>}
      {children}
    </Card>
  );
};

export default FundCard;
