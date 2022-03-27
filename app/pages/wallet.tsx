import { useEffect, useState } from "react";
import LayoutSpinner from "../components/Animations/LayoutSpinner";
import NotSignedIn from "../components/Wallet/NotSignedIn";
import Print from "../components/Wallet/Print";
import Ticket from "../components/Wallet/Ticket";
import useAuth from "../hooks/useAuth";
import useLocation from "../hooks/useLocation";
import useTicket from "../hooks/useTicket";

const NAV_HEIGHT = 84;

export default function Wallet() {
  // TODO: Change name
  const [checking, setChecking] = useState(true);
  const [ticketMeta, setTicketMeta] = useState({
    image: "",
    animation_url: "",
    tokenId: 0,
    hatched: false,
  });
  const { user } = useAuth();
  const location = useLocation();

  const [height, setHeight] = useState(0);

  const { ticket: data, fetching: ticketFetching, checkInTicket } = useTicket();

  useEffect(() => {
    if (!data) return;
    const { tokenId } = data;
    if (tokenId) {
      fetch(`api/metadata/${tokenId.toString(16).padStart(64, "0")}`)
        .then((r) => r.json())
        .then((ticketMeta) => {
          setTicketMeta(ticketMeta);
          setChecking(false);
        });
    } else {
      setTicketMeta(data);
      setChecking(false);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(document.documentElement.clientHeight - NAV_HEIGHT);
    }
  }, []);

  const onCheckIn = async () => {
    const atDolores = await location.getUserPosition();
    if (atDolores || user.email === "arielklevecz@gmail.com") {
      checkInTicket();
    }
  };

  if (checking) {
    return <LayoutSpinner />;
  }
  if (ticketMeta.tokenId === null) {
    return <NotSignedIn />;
  }

  if (ticketMeta.tokenId === 0) {
    return <Print user={user} />;
  }
  return (
    <div
      className="md:pb-0 flex justify-center items-center p-4"
      style={{ height: height ? height : "90vh" }}
    >
      <Ticket
        onCheckIn={onCheckIn}
        ticketMeta={ticketMeta}
        checking={location.checking || ticketFetching}
        atDolores={location.atDolores}
        userPosition={location.position}
      />
    </div>
  );
}
