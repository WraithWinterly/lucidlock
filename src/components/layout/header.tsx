import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-12 w-full items-center justify-between bg-black/20 px-6 py-1">
      <Link href="/app">
        <span className="text-3xl font-extrabold text-[hsl(280,100%,70%)]">
          LucidLock
        </span>
      </Link>
    </div>
  );
}
