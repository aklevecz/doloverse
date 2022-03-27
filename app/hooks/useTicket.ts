import { useState } from "react";
import useSWR from "swr";
import { delay } from "../lib/utils";

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((data) => {
      return data || { tokenId: null };
    });
}

export default function useTicket() {
  const { data: ticket, error, mutate } = useSWR("/api/ticket", fetcher);
  const [fetching, setFetching] = useState(false);

  const checkInTicket = () => {
    setFetching(true);
    return fetch("api/ticket", { method: "PUT" }).then(() => {
      delay(() => {
        mutate();
        setFetching(false);
      });
    });
  };

  const loading = ticket === undefined;
  return {
    ticket,
    loading,
    mutate,
    error,
    fetching,
    checkInTicket,
  };
}
