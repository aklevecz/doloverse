import { motion, useTransform, useViewportScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  checked: boolean;
  toggleCheck: () => void;
};
const tos = `By attending Doloverse Music Festival you agree to all terms disclaimed below with no power over them or else we will call your dad.
   This event exists in both the real world and metaverse, which allows it to do whatever it wants, whenever it wants. You have no control
   over which universe you exist when you are on the festival grounds, which allows Doloverse to have ownership over your being within all
   components of time and space. Doloverse in this way charts new territory in metaphysics as the sickest event to ever exist inside of a box that
   may or may not have a cat in it. As an attendee of Doloverse you are not welcome to think about things that would discredit any of these facts,
   so please do not think when you are at the festival grounds or be prepared to be prosecuted to the fullest extent of metaverse, real world, and bird law.
   If you are planning to bring lunch to the festival, you must bring enough lunch for everyone else, including brownies. Failure to provide lunch for
   everyone will result in your legs being fed to the lions. If you do not have legs other arrangements will be a game time decision by the lord of dance.
   There will be no talking at the event. If you are found talking or creating utterances that resemble talking, you will be nicely asked to leave with
   various hand gestures. Failure to leave will result in tickling. Doloverse is a registered trademark by your mom.`;

const MIN_HEIGHT_DELTA = 150;
export default function TOS({ checked, toggleCheck }: Props) {
  const tosRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const [hideScroll, setHideScroll] = useState(false);

  useEffect(() => {
    let height = 0;
    if (typeof window !== "undefined") {
      height = (tosRef.current as HTMLDivElement).getBoundingClientRect()
        .height;
    }
    const compare = (v: any) => {
      if (v === 0 || height < window.innerHeight - MIN_HEIGHT_DELTA) {
        setHideScroll(true);
      } else {
        setHideScroll(false);
      }
    };
    compare(1);
    opacity.onChange(compare);
  }, []);

  return (
    <div id="tos">
      {/* <motion.div
        className="text-center fixed w-full bottom-24 flex justify-center"
        style={{ opacity, display: hideScroll ? "none" : "flex" }}
      >
        <div
          style={{ borderRadius: "0px 10px 150px 150px" }}
          className="bg-black text-white px-6 py-2 rounded-full"
        >
          Scroll
        </div>
      </motion.div> */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2 }}
        style={{
          color: "red",
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 200,
          height: 200,
          marginLeft: -100,
          marginTop: -100,
          textAlign: "center",
          fontSize: "2rem",
          letterSpacing: 2,
          pointerEvents: "none",
        }}
      >
        Scroll Down!
      </motion.div>
      <div className="text-center text-5xl mt-2 mx-4">Terms of Service</div>
      <div ref={tosRef} className="mx-auto p-4 max-w-2xl">
        {Array.from(Array(1).keys()).map((key) => (
          <div key={key}>{tos}</div>
        ))}
      </div>
      <div className="flex justify-center">
        <div>
          <div className="form-check">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-black bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer rounded-full"
              type="checkbox"
              id="flexCheckDefault"
              checked={checked}
              onChange={toggleCheck}
              style={{ width: 30, height: 30 }}
            />
            <label
              className="form-check-label inline-block text-gray-800 text-4xl"
              htmlFor="flexCheckDefault"
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
