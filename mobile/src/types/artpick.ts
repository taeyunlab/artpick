export interface Artwork {
  id: number;
  title: string;
  artist: string;
  artistHandle: string;
  artistId: string;
  category: string;
  price: number;
  formattedPrice: string;
  image: string;
  dimensions: string;
  medium: string;
  likes: number;
  description: string;
  year: string;
}

export interface Artist {
  id: string;
  name: string;
  handle: string;
  category: string;
  avatar: string;
  coverImage: string;
  followers: string;
  followersCount: number;
  artworksCount: number;
  exhibitionsCount: number;
  bio: string;
  quote: string;
  exhibitions: { year: string; title: string; location: string }[];
  news: { date: string; title: string; summary: string }[];
}

export interface CreationStoryStep {
  step: number;
  title: string;
  desc: string;
  image?: string;
}

export interface CreationStory {
  id: number;
  artistId: string;
  artistName: string;
  artistRole?: string;
  stage: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  artworkId?: number;
  fullLog: {
    duration: string;
    materials: string[];
    steps: CreationStoryStep[];
    artistNote: string;
  };
}

export type RootStackParamList = {
  MainTabs: undefined;
  ArtistProfile: { artistId: string };
};

export type TabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};
