import { Position, TicketMeta } from "../../lib/types";
import clsx from "clsx";
import Button from "../Button";
import buttonClasses from "../Button/classes";
import { DOLOVERSE_ADDRESS } from "../../constants";
import { colors } from "../../lib/utils";
import ButtonSpinner from "../Animations/ButtonSpinner";

type Props = {
  ticketMeta: TicketMeta;
  onCheckIn: () => void;
  checking: boolean;
  atDolores: boolean;
  userPosition: Position;
};

const prompts = {
  initial: `Go to Dolores Park and check in your ticket to
receive a surprise`,
  notAtDolores: `You are not at Dolores!`,
  checkingIn: "You have arrived! Checking you in right meow",
  checked: "You're all set, enjoy the show! :)",
};
export default function Ticket({
  ticketMeta,
  onCheckIn,
  checking,
  atDolores,
  userPosition,
}: Props) {
  const checkAttempt = userPosition.lat && userPosition.lng;
  let prompt = prompts.initial;
  if (checkAttempt && !atDolores) {
    prompt = prompts.notAtDolores;
  } else if (atDolores) {
    prompt = prompts.checkingIn;
  }

  if (ticketMeta.hatched) {
    prompt = prompts.checked;
  }

  return (
    <div
      className="flex flex-col max-w-sm rounded shadow-lg pb-5 overflow-visible border-black border-8"
      style={{ height: "100%", maxHeight: 650 }}
    >
      {ticketMeta.hatched && (
        <div
          id="overlay"
          style={{ zIndex: 9 }}
          className="absolute left-0 top-0 w-full h-full bg-black opacity-5 text-white flex pt-20 justify-center text-3xl"
          onClick={() => {
            const vid = document.getElementById("video") as any;
            vid.muted = false;
            vid.play();
            document.getElementById("overlay")?.remove();
          }}
        >
          {/* <div>Beep boop press here</div> */}
        </div>
      )}
      {!ticketMeta.hatched && (
        <div className="p-2 pt-8" style={{ flex: "0 0 35%" }}>
          <div
            className="bg-contain h-full bg-no-repeat m-auto bg-center"
            style={{ backgroundImage: `url(${ticketMeta.image})` }}
          />
          {/* <img className="w-3/4 m-auto" src={ticketMeta.image} alt="ticky" /> */}
        </div>
      )}
      {ticketMeta.hatched && (
        <video
          id="video"
          className="mt-16 w-full"
          style={{ display: ticketMeta.hatched ? "block" : "" }}
          autoPlay
          playsInline
          loop
          muted
          onPlaying={() => {
            // document.getElementById("overlay")?.remove();
          }}
          src={ticketMeta.animation_url}
        />
      )}
      {/* <audio loop id="audio" src="/roll_sound.webm"></audio> */}
      <div className="px-6 py-4">
        <div className="flex items-center  text-black">
          <div className=" text-5xl mb-2 bg-black text-white w-20 h-20 rounded-full text-center p-4">
            {ticketMeta.tokenId}
          </div>
          <div className="text-4xl ml-4">DOLOVERSE</div>
        </div>

        <div
          className={clsx(
            "text-gray-700 text-3xl ml-2 text-center",
            prompt === prompts.checked ? "text-3xl" : "text-xl"
          )}
        >
          {prompt}
        </div>
      </div>
      {!ticketMeta.hatched && (
        <div className="px-6 pt-0 pb-2">
          <button
            className={clsx(buttonClasses.black_round, "mx-auto block text-lg")}
            onClick={() => {
              onCheckIn();
            }}
          >
            <div className="flex items-center">
              {checking && <ButtonSpinner />}
              Check in
            </div>
          </button>
        </div>
      )}
      <div className="my-2 text-center">
        <a
          className="text-white px-8 py-3 rounded-full"
          style={{ background: colors.opensea }}
          target="_blank"
          rel="noreferrer"
          href={`https://${
            process.env.NODE_ENV === "development" ? "testnets." : ""
          }opensea.io/assets/matic/${DOLOVERSE_ADDRESS}/${ticketMeta.tokenId}`}
        >
          Opensea
        </a>
      </div>
    </div>
  );
}
