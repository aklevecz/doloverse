import {
  motion,
  useElementScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { Magic } from "magic-sdk";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Spinner from "../components/Animations/ButtonSpinner";
import buttonClasses from "../components/Button/classes";
import NavContainer from "../components/Nav/Container";
import Email from "../components/Tickets/Email";
import TOS from "../components/Tickets/TOS";
import { HOST } from "../constants";
import useAuth from "../hooks/useAuth";
import { delay, validateEmail } from "../lib/utils";

enum View {
  TOS,
  Email,
}
export default function Tickets() {
  const router = useRouter();
  const [view, setView] = useState(View.TOS);
  const [fetching, setFetching] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const auth = useAuth();

  const nextView = () => setView(view + 1);
  const toggleCheck = () => setChecked(!checked);

  const onEmailChange = (e: React.FormEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const onLogin = async () => {
    setFetching(true);
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!);
    const did = await magic.auth.loginWithMagicLink({
      email,
      redirectURI: `${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://doloverse.com"
      }/callback`,
    });
    const authRequest = await fetch("/api/login", {
      method: "POST",
      headers: { Authorization: `Bearer ${did}` },
    });

    if (authRequest.ok) {
      delay(() => {
        auth.mutate();
        setFetching(false);
        router.push("/");
      });
    }
  };

  return (
    <div className="h-full pb-24">
      {view === View.TOS && <TOS toggleCheck={toggleCheck} checked={checked} />}
      {view === View.Email && <Email onChange={onEmailChange} email={email} />}

      <NavContainer>
        <>
          {view === View.TOS && (
            <div>
              {!checked && <div className="m-4">Please confirm bro</div>}
              {checked && (
                <button onClick={nextView} className={buttonClasses.white}>
                  Continue
                </button>
              )}
            </div>
          )}
          {view === View.Email && (
            <div>
              {validateEmail(email) && (
                <button onClick={onLogin} className={buttonClasses.white}>
                  <div className="flex items-center">
                    {fetching && <Spinner color={"black"} />}
                    Sign up
                  </div>
                </button>
              )}
              {!validateEmail(email) && (
                <div className="m-4">
                  {email ? "Almost there..." : "Type in that email"}
                </div>
              )}
            </div>
          )}
        </>
      </NavContainer>
    </div>
  );
}
