import { ReactNode } from "react";

interface ToastMessageProps {
  title: string;
  children?: ReactNode;
}

const ToastMessage = ({ title, children }: ToastMessageProps) => {
  return (
    <div className="font-sans leading-snug">
      <h3 className="font-bold text-xl text-gray-900 leading-6 mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default ToastMessage;
7;
