const Footer = () => {
  return (
    <footer className="border-t-2">
      <div className="p-4 md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 max-w-screen-xl mx-auto">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Optimity
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
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
