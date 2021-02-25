export type Site = {
  id: number;
  Title: string;
  ShortDescription: string;
  Description: string;
  geolocation: null;
  type: null;
  district: null;
  published_at: string; // date
  created_at: string; // date
  updated_at: string; // date
};

export type Guide = {
  Header: string;
  Name: string;
  created_at: string;
  geolocation: null;
  id: number;
  published_at: string;
  sites: Site[];
  updated_at: string;
};

export type Event = {
  created_at: string;
  date: string;
  description: string;
  header: string;
  id: number;
  img: Img;
  published_at: string;
  updated_at: string;
  uuid: string;
};

export type Img = {
  alternativeText: string;
  caption: string;
  created_at: string;
  ext: ".jpg";
  formats: any;
  hash: string;
  height: number;
  id: number;
  mime: "image/jpeg";
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updated_at: string;
  url: string;
  width: number;
};

export type Menus = "guides" | "sites" | "events";

export type DataSource = Site[] | Guide[] | Event[];
