const Footer = () => {
  return (
    <footer className="border-t-2 mt-6">
      <div className="p-2 flex items-center justify-between  dark:bg-gray-800 max-w-screen-xl mx-auto">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022 DeCoop. All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://github.com/marcuspang/crypto-2022-hackathon"
              target={"_blank"}
              className="hover:underline"
              rel="noreferrer"
            >
              Source
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
