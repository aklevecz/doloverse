import type { NextPage } from "next";
import Separator from "../components/Separator";
import Layout from "../components/Layout";
import { artists } from "../constants";
import Link from "next/link";
import { shuffle } from "../lib/utils";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="font-bold text-7xl p-4 pb-1">
        Doloverse Music Festival
      </div>
      <div className="text-4xl pl-4 pb-2">April 20th 2022 // Dolores Park</div>
      <Separator />
      <div className="bg-white p-4 text-5xl uppercase break-all">
        {shuffle(artists).map((artist, i) => (
          <Link key={artist} href={`/artist/${artist}`}>
            <span style={{ cursor: "pointer" }} key={artist}>
              <span key={artist} style={{ color: i % 2 ? "red" : "black" }}>
                {artist}
              </span>{" "}
              •{" "}
            </span>
          </Link>
        ))}
        <span style={{ color: "black" }}>D??? P???</span>
      </div>
      <Separator />
      <div
        className="bg-white p-4 text-5xl m-auto max-w-screen-md my-10"
        style={{ lineHeight: 1.3 }}
      >
        The first in person METAVERSE event of the century
      </div>
      <Separator />
      <div
        className="bg-white p-4 text-5xl m-auto max-w-screen-md my-10"
        style={{ lineHeight: 1.3 }}
      >
        Claim your free ticket NFT and activate it on the festival grounds to
        listen to an exclusive mystery track
      </div>
      <Separator />
      <div
        className="bg-white p-4 text-4xl m-auto max-w-screen-md my-10"
        style={{ lineHeight: 1.3 }}
      >
        Find your inner multidimensional musical spirit -- and then monetize it!
      </div>
      <Separator />
      <div
        className="bg-white p-4 text-5xl m-auto max-w-screen-md my-10"
        style={{ lineHeight: 1.3 }}
      >
        Click on one of the artist pages above to help fill their info :)
      </div>
      {/* <Link href="/tickets">
        <Button onClick={() => {}}>Claim</Button>
      </Link> */}
      {/* <div className="flex flex-wrap">
        {!auth.user && (
          <Input
            onChange={(e) => setEmail(e.currentTarget.value)}
            value={email}
            name={"email"}
            type={"email"}
            placeholder={"Email"}
          />
        )}
      </div> */}
      {/* <div className="flex justify-center">
        {!auth.user && (
          <Button onClick={onLogin}>
            <div className="flex">
              {fetching && <Spinner />}
              Login
            </div>
          </Button>
        )}
        {auth.user && <ButtonPrint />}
      </div> */}
    </Layout>
  );
};

export default Home;
