const NavMenuButton = ({ isOpen, toggle }) => {
  return (
    <button
      onClick={toggle}
      type="button"
      className="dark:text-white element-background focus:outline-none focus:ring-2 focus:ring-darkBlue dark:focus:ring-gray-600 rounded-lg text-sm p-2.5"
    >
      <svg
        className={`w-6 h-6 ${isOpen ? "hidden" : ""}`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
      <svg
        className={`w-6 h-6 ${isOpen ? "" : "hidden"}`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default NavMenuButton;
