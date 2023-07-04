import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { isSignedIn, isLoaded } = useAuth();
  return (
    <div className="fixed left-0 right-0 top-0 h-12 flex justify-between p-2 bg-black/20 items-center">
      <Link href="/app">
        <span className="text-[hsl(280,100%,70%)] font-extrabold">
          Lucidlock
        </span>
      </Link>

      {isSignedIn && (
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "2rem",
                height: "2rem",
              },
            },
          }}
          afterSignOutUrl="/"
        />
      )}
      {!isSignedIn && isLoaded && (
        <p className="text-center text-2xl text-white">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
}
