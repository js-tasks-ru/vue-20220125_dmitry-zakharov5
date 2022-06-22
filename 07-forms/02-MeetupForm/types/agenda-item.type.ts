export type AgendaItemType = {
  id: number;
  startsAt: string;
  endsAt: string;
  type: string;
  title: null | string;
  description: null | string;
  speaker: null | string;
  language: null | string;
};

export type AgendaType = {
  id: number;
  title: string;
  description: string;
  place: string;
  date: number;
  image: null | string;
  agenda: Array<AgendaItemType>;
  imageToUpload: File;
};
