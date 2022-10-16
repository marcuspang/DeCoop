import Link from "next/link";
import { ReactNode } from "react";
import Card from "../Layout/Card";
import Spinner from "../Layout/Spinner";

interface FundCardProps {
  title?: string;
  amount?: number | string;
  symbol?: string;
  description?: string; // description of person who performed last transaction
  descriptionLink?: string;
  className?: string;
  isLoading?: boolean;
  children?: ReactNode;
}

const FundCard = ({
  amount,
  title,
  symbol,
  description,
  descriptionLink,
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
      {descriptionLink && (
        <Link href={descriptionLink} passHref>
          {description && (
            <a className="link block" target={"_blank"} rel="noreferrer">
              {description}
            </a>
          )}
        </Link>
      )}
      {children}
    </Card>
  );
};

export default FundCard;
