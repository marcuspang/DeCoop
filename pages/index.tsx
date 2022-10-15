import Link from "next/link";
import FancyButton from "../components/Layout/FancyButton";

export default function Home() {
  return (
    <div className="w-full text-center py-20 px-4">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Creating Economies, <br />
        Building Communities
      </h1>
      <p className="mb-8 mt-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        At DeCoop, we focus on bringing communities together through cooperative
        finance.
      </p>
      <FancyButton>
        <Link href="/fund" passHref>
          <a className="inline-flex items-center">
            Enter App
            <svg
              className="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </Link>
      </FancyButton>
    </div>
  );
}
