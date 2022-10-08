import { ReactNode } from "react";

interface ModalInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  children?: ReactNode;
}

const Modal = ({ open, setOpen, children }: ModalInterface) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setOpen(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <h3>Sign up with your wallet</h3>
          <div className="items-center gap-2 mt-3 sm:flex">
            <button
              className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              WalletConnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
