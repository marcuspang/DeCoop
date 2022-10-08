import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Crypto.com 2022 Hackathon</title>
        <meta name="description" content="Crypto.com 2022 Hackathon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl font-bold underline">
          Crypto.com 2022 Hackathon
        </h1>
      </main>

      <footer>Footer</footer>
    </div>
  );
}
