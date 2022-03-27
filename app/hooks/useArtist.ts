import useSWR from "swr";
import md5 from "md5";
import { useEffect, useState } from "react";

function fetcher(route: string) {
  /* our token cookie gets sent with this request */
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((data) => {
      return data || null;
    });
}

export default function useArtist(name: string) {
  const {
    data: artist,
    error,
    mutate,
  } = useSWR(`/api/artist?name=${name}`, fetcher);

  const [hashes, setHashes] = useState({ description: "", links: "" });

  useEffect(() => {
    if (artist) {
      try {
        const description = md5(artist.description);
        const links = md5(JSON.stringify(artist.links));
        setHashes({ description, links });
      } catch (e) {}
    }
  }, [artist]);

  const update = async (description: string, links: string[]) => {
    await fetch(`/api/artist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, links }),
    }).then(console.log);
    mutate();
  };

  const loading = artist === undefined;
  console.log(artist);
  return {
    artist,
    loading,
    mutate,
    error,
    update,
    linksHash: hashes.links,
    descriptionHash: hashes.description,
  };
}
