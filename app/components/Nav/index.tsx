import { Magic } from "magic-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import buttonClasses from "../Button/classes";
import clsx from "clsx";

export default function Nav() {
  const router = useRouter();
  const { user, mutate, logout } = useAuth();

  const onLogout = async () => {
    await logout();
    router.push("/");
  };

  if (router.asPath === "/tickets") {
    return <div></div>;
  }
  return (
    <div className="w-full fixed bottom-0 text-white text-3xl h-54 flex justify-center mix-blend-difference border-t-8 border-black bg-white">
      {!user && (
        <>
          <Link href="/tickets">
            <button className={clsx(buttonClasses.black_round, "text-xl")}>
              Claim Ticket
            </button>
          </Link>
          <Link href="/about">
            <button className={clsx(buttonClasses.black_round, "text-xl")}>
              FAQ
            </button>
          </Link>
        </>
      )}
      {user && (
        <>
          {router.asPath !== "/" && (
            <Link href="/">
              <button className={buttonClasses.white}>Lineup</button>
            </Link>
          )}
          {router.asPath === "/" && (
            <Link href="/wallet">
              <button className={buttonClasses.white}>Ticket</button>
            </Link>
          )}

          {router.asPath !== "/profile" && (
            <Link href="/profile">
              <div
                className="text-black self-center flex-shrink bg-red overflow-hidden"
                style={{ flex: "0 0 30%", cursor: "pointer" }}
              >
                <div className="overflow-hidden text-ellipsis text-base">
                  {user.email}
                </div>
                <div className="overflow-hidden text-ellipsis text-base">
                  {user.publicAddress}
                </div>
              </div>
            </Link>
          )}
          {router.asPath === "/profile" && (
            <Link href="/wallet">
              <button className={buttonClasses.white}>Ticket</button>
            </Link>
          )}
          <Link href="/about">
            <button className={buttonClasses.white}>FAQ</button>
          </Link>
        </>
      )}
    </div>
  );
}
