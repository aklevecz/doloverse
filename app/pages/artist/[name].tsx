import clsx from "clsx";
import md5 from "md5";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import LayoutSpinner from "../../components/Animations/LayoutSpinner";
import buttonClasses from "../../components/Button/classes";
import Layout from "../../components/Layout";
import { artists } from "../../constants";
import useArtist from "../../hooks/useArtist";
import useAuth from "../../hooks/useAuth";

const ArtistLink = ({
  i,
  link,
  onChangeLink,
  refresh,
}: {
  i: number;
  link: string;
  onChangeLink: (i: number, val: string) => void;
  refresh: number;
}) => {
  const [editing, setEditing] = useState(false);
  const toggleEdit = () => setEditing(!editing);
  useEffect(() => {
    setEditing(false);
  }, [refresh]);

  let href = link;
  if (!/^https?:\/\//i.test(link)) {
    href = "http://" + link;
  }

  //   const prefix = "http://";

  //   const href =
  //     link.toLowerCase().substr(0, prefix.length) !== prefix
  //       ? prefix + link
  //       : link;
  return (
    <div>
      {!editing && (
        <a
          style={{ color: "blue" }}
          target="_blank"
          rel="noreferrer"
          href={href}
        >
          {link}
        </a>
      )}
      {editing && (
        <input
          className="border-black border-2 text-center"
          onChange={(e) => onChangeLink(i, e.currentTarget.value)}
          value={link}
        ></input>
      )}
      <button onClick={toggleEdit} className="ml-2">
        {editing ? "nvm" : "Edit"}
      </button>
    </div>
  );
};

type Props = {
  name: string;
};

export default function Artist({ name }: Props) {
  const { user } = useAuth();
  const { artist, update, descriptionHash, linksHash } = useArtist(name);
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");
  const [showNewLink, setShowNewLink] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const descRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (artist) {
      setDescription(artist.description);
      setLinks(artist.links ?? []);
    }
  }, [artist]);

  useEffect(() => {
    let update = false;
    if (newLink) {
      update = true;
    }
    if (description && descriptionHash !== md5(description)) {
      update = true;
    }
    if (links.length > 0 && linksHash !== md5(JSON.stringify(links))) {
      update = true;
    }
    setShowUpdate(update);
  }, [newLink, links, description]);

  useEffect(() => {
    if (descRef.current) {
      descRef.current.style.height = descRef.current.scrollHeight + "px";
    }
  }, [description]);

  const onUpdate = () => {
    const updatedLinks = newLink
      ? [...links, newLink]
      : links.filter((link) => link);
    update(description, [...updatedLinks]);
    reset();
  };

  const onChangeLink = (i: number, val: string) => {
    const l = links;
    l[i] = val;
    setLinks([...l]);
  };

  const reset = () => {
    setShowNewLink(false);
    setNewLink("");
    setRefresh(refresh + 1);
  };
  if (!name) {
    return <div></div>;
  }
  if (!user) {
    return (
      <Layout>
        <Head>
          <title>{name.toUpperCase()}</title>
        </Head>
        <div
          className="text-5xl text-center m-auto mt-10"
          style={{ maxWidth: 400 }}
        >
          For now, you must be signed in to view and contribute to artist pages
        </div>
      </Layout>
    );
  }
  if (!artist) {
    return <LayoutSpinner />;
  }
  return (
    <Layout>
      <Head>
        <title>{name.toUpperCase()}</title>
        <meta name="description" content={artist.description ?? name} />
      </Head>
      <div className="text-5xl text-center my-4">{name.toUpperCase()}</div>
      <div className="artist-data">
        <div className="flex flex-col justify-center items-center">
          <div className="text-xl">Description</div>
          <textarea
            ref={descRef}
            id="description"
            className="border-black border-4 w-3/4 p-2"
            value={
              description
                ? description
                : "This artist has no description, please help write one!"
            }
            onChange={(e) => {
              const newDesc = e.currentTarget.value;
              setDescription(newDesc);
            }}
          ></textarea>
        </div>
        <div className="flex flex-col justify-center items-center m-4">
          <div className="text-xl">Links</div>
          {links.length === 0 && (
            <div>No one has added links yet, be the first!</div>
          )}
          {links.map((link, i) => {
            return (
              <ArtistLink
                key={link}
                link={link}
                i={i}
                onChangeLink={onChangeLink}
                refresh={refresh}
              />
            );
          })}
          <>
            {showNewLink && (
              <input
                className="border-black border-4 p-1 pl-2"
                value={newLink}
                placeholder="New link"
                onChange={(e) => setNewLink(e.currentTarget.value)}
              />
            )}
            <button
              onClick={() => setShowNewLink(!showNewLink)}
              className={clsx(buttonClasses.black_round, "text-xs")}
            >
              {showNewLink ? "Nevermind" : "Add a link"}
            </button>
          </>
        </div>
      </div>
      <>
        {showUpdate && (
          <button
            onClick={onUpdate}
            className={clsx(buttonClasses.black_round, "mx-auto w-32 block")}
          >
            Update
          </button>
        )}
      </>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: artists.map((artist) => `/artist/${artist}`) ?? [],
    fallback: true,
  };
}

type Params = {
  params: Props;
};
export const getStaticProps = async ({ params }: Params) => {
  // const speaker = await c.getSpeakerBySlug(params.slug);
  console.log(params);
  return {
    props: {
      name: params.name ?? null,
    },
  };
};
