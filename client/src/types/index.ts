export type Song = {
  album: string;
  artists: string;
  duration: number;
  images: string;
  index: number;
  name: string;
};

export interface downloads {
  title: string;
  downloadPath: string;
  coverPath: string;
  complete: boolean;
}

export interface playlist {
  cover: string;
  name: string;
  link: string;
}


