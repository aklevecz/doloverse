import DoloverseInterface from "./contracts/Doloverse.json";
export const DOLOVERSE_ADDRESS =
  process.env.NODE_ENV === "development"
    ? DoloverseInterface.networks.matic_mum
    : DoloverseInterface.networks.matic;
// export const HOST = "http://localhost:3000";
export const HOST =
  process.env.NODE_ENV === "development" ? "" : "https://doloverse.com";

export const MAX_SUPPLY = 500;

export const artists = [
  "starfari",
  "3kelves",
  "alex sibley",
  "papa lu",
  "galour",
  "nightware",
  "jlittle",
  "allison sharrar",
  "mphd",
  "dj dials",
  "beach coyotes",
  "torie",
  "femmelectric",
  "wily",
  "blanq slate",
  "funkoscope",
  "wufu",
  "bluri",
  "l1fescape",
  "jiamei",
  "dan francisco",
  "oh wonder",
  "cory echo",
  "stripess",
  "sam leggett",
  "avery morris",
  "jessica tur",
  "stan jericho",
  "dan white",
  "rebecca gray",
  "jen choi",
  "gar gar",
  "jkind",
  "benjamin k",
  "felly fell",
  "tycho",
  "brunch life",
  "kaeli renae",
  "alizen",
  "corey hunter",
  "reo baird",
  "thor",
  "grant gerber",
  "krg",
  "bicep",
  "poolside",
  "seanco",
  "gary paradise",
  "the chainsmokers",
  "chris brown",
  "thabaobao",
  "moderat",
  "vix vapor rub",
];
