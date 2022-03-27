import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ButtonSpinner from "../components/Animations/ButtonSpinner";
import LayoutSpinner from "../components/Animations/LayoutSpinner";
import buttonClasses from "../components/Button/classes";
import Layout from "../components/Layout";
import Separator from "../components/Separator";
import useAuth from "../hooks/useAuth";
import useTicket from "../hooks/useTicket";

export default function Profile() {
  const { user, logout } = useAuth();
  const { ticket } = useTicket();
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);
  if (!user) {
    return (
      <div>
        <LayoutSpinner />
      </div>
    );
  }
  return (
    <Layout>
      <div className="text-3xl text-center mt-4">Profile</div>
      <div className="p-4 text-xl max-w-md m-auto">
        <div className="my-4">
          <div>Email:</div>
          <div>{user.email}</div>
        </div>
        <Separator />
        <div className="my-4">
          <div>Ethereum address:</div>
          <div className="break-all">{user.publicAddress}</div>
        </div>
        <Separator />
        <div className="my-4">
          {!ticket && <LayoutSpinner />}
          {ticket && ticket.tokenId ? (
            <div>You have ticket #{ticket.tokenId}</div>
          ) : (
            ""
          )}
        </div>
        <button
          onClick={logout}
          className={clsx(buttonClasses.black_round, "mt-8 mx-auto block")}
        >
          Logout
        </button>
      </div>
    </Layout>
  );
}
