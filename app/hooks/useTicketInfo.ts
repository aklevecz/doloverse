import useSWR from "swr";

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((data) => {
      return data || { count: undefined };
    });
}

export default function useTicketInfo() {
  const {
    data: ticketInfo,
    error,
    mutate,
  } = useSWR("/api/ticket-info", fetcher);

  const loading = ticketInfo === undefined;
  return {
    ticketInfo,
    loading,
    mutate,
    error,
  };
}
