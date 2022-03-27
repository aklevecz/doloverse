export type TicketMeta = {
  tokenId: number;
  image: string;
  hatched: boolean;
  animation_url: string;
};

export type User = {
  email: string;
  publicAddress: string;
};

export type Position = {
  lat: number;
  lng: number;
};

export type Bounds = {
  NE: Position;
  SW: Position;
};
