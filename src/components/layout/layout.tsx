import { useRouter } from "next/router";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div>
      {router.pathname.includes("/app") && <Header />}

      <main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white pt-16">
        {children}
      </main>
    </div>
  );
}
