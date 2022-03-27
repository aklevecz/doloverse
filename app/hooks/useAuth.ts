import { Magic } from "magic-sdk";
import useSWR from "swr";

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((user) => user || null);
}

export default function useAuth() {
  const { data: user, error, mutate } = useSWR("/api/user", fetcher);

  const logout = async () => {
    const logoutReq = await fetch("/api/logout");
    if (logoutReq.ok) {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY!);
      magic.user.logout();
      mutate();
    }
    return logoutReq.ok;
  };

  const loading = user === undefined;

  return {
    user,
    logout,
    loading,
    mutate,
    error,
  };
}
