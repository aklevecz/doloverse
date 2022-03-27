import { useState } from "react";
import { mutate } from "swr";
import Button from ".";
import { delay } from "../../lib/utils";
import Spinner from "../Animations/ButtonSpinner";

export default function ButtonPrint() {
  const [fetching, setFetching] = useState(false);
  const onPrint = async () => {
    setFetching(true);
    await fetch("/api/ticket", { method: "POST" })
      .then((r) => r.ok && r.json())
      .then((d) => {
        if (d) {
          delay(() => {
            setFetching(false);
            mutate("/api/ticket");
          });
        }
      });
  };

  return (
    <Button disabled={fetching} onClick={onPrint}>
      <div className="flex">
        {fetching && <Spinner />}
        Print
      </div>
    </Button>
  );
}
