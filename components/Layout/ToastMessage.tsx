import { ReactNode } from "react";

interface ToastMessageProps {
  title: string;
  children?: ReactNode;
}

const ToastMessage = ({ title, children }: ToastMessageProps) => {
  return (
    <div>
      <h3 className="font-bold text-xl text-gray-900">{title}</h3>
      {children}
    </div>
  );
};

export default ToastMessage;
