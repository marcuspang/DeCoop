import { ReactNode } from "react";

interface FancyButtonProps {
  buttonClassName?: string;
  spanClassName?: string;
  submit?: boolean;
  children?: ReactNode;
}

const FancyButton = ({
  buttonClassName,
  spanClassName,
  submit,
  children,
}: FancyButtonProps) => {
  return (
    <button
      className={`relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-lg w-fit  ${buttonClassName}`}
      type={submit ? "submit" : "button"}
    >
      <span
        className={`relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 hover:text-white dark:text-white ${spanClassName}`}
      >
        {children}
      </span>
    </button>
  );
};

export default FancyButton;
