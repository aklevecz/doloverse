import { MAX_SUPPLY } from "../../constants";
import useTicketInfo from "../../hooks/useTicketInfo";
import { User } from "../../lib/types";
import ticket from "../../pages/api/ticket";
import LayoutSpinner from "../Animations/LayoutSpinner";
import ButtonPrint from "../Button/Print";
type Props = {
  user: User;
};
export default function Print({ user }: Props) {
  const { ticketInfo } = useTicketInfo();

  if (!ticketInfo) {
    return <LayoutSpinner />;
  }

  const soldOut = ticketInfo.count >= MAX_SUPPLY;
  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <div className="max-w-2xl text-4xl m-10 mb-0">
        Time to print your ticket
      </div>
      <div className="mt-1 mb-5 text-lg text-red-600">
        {MAX_SUPPLY - ticketInfo.count} / {MAX_SUPPLY} remain
      </div>
      {!soldOut && (
        <div className="flex flex-col items-center justify-center w-full">
          <ButtonPrint />
          <div className="m-10 mt-7 text-center break-words w-3/4">
            <div className="text-2xl">
              You will receive it at your Ethereum address:
            </div>
            <div className="text-xl mt-4">{user.publicAddress}</div>
          </div>
          {/* <div className="max-w-2xl text-4xl m-10">{user.email}</div> */}
        </div>
      )}
      {soldOut && (
        <div className="flex flex-col items-center justify-center w-full text-5xl px-12 py-20">
          Sorry, but we are sold out!
        </div>
      )}
    </div>
  );
}
