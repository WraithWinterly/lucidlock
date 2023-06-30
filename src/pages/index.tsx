import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1>LucidLock</h1>
        <div className="flex gap-4">
          <Link href="/login">
            <div className="btn btn-primary">Login</div>
          </Link>
          <Link href="/app">
            <div className="btn btn-primary">App</div>
          </Link>
        </div>
      </main>
    </>
  );
}
