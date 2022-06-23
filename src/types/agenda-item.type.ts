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
  imageToUpload?: File;
};

export type AgendaItemIconsType = { [key: string]: string };

export type AgendaItemDefaultTitlesType = {
  registration: string;
  opening: string;
  break: string;
  coffee: string;
  closing: string;
  afterparty: string;
  talk: string;
  other: string;
};

export type AgendaItemOptionsType = {
  value: string;
  text: string;
  icon: string;
};

export type AgendaItemLanguageOptionType = {
  value: null | string;
  text: string;
};

export type CommonAgendaItemFormSchemaType = {
  title: {
    label: string;
    component: string;
    props: {
      name: string;
    };
  };
};

export type DefaultFieldType = {
  label: string;
  component: string;
  props: {
    name: string;
  };
};

export type DescriptionFieldType = {
  label: string;
  component: string;
  props: {
    multiline: boolean;
    name: string;
  };
};

export type LanguageFieldType = {
  label: string;
  component: string;
  props: {
    options: Array<AgendaItemLanguageOptionType>;
    title: string;
    name: string;
  };
};

export interface AgendaItemFormSchemasType {
  registration: CommonAgendaItemFormSchemaType;
  opening: CommonAgendaItemFormSchemaType;
  talk: {
    title: DefaultFieldType;
    speaker: DefaultFieldType;
    description: DescriptionFieldType;
    language: LanguageFieldType;
  };
  break: CommonAgendaItemFormSchemaType;
  coffee: CommonAgendaItemFormSchemaType;
  closing: CommonAgendaItemFormSchemaType;
  afterparty: CommonAgendaItemFormSchemaType;
  other: {
    title: DefaultFieldType;
    description: DescriptionFieldType;
  };
}
