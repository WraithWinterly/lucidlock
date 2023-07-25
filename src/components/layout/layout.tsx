import { useRouter } from "next/router";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      {router.pathname.includes("/app") && <Header />}

      <main className="max-w-screen flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] px-8 pt-16 text-white">
        {children}
      </main>
    </>
  );
}
