import { FVError } from "@fullview/errors";

export type Settings = {
  subdomain: string;
};

// May be from ticket or from chat
export type AppContextData = {
  id: string;
};

export type AuthorizationStatusResponse = {
  status: boolean;
  data: {
    organisationId?: string;
    redirectUrl?: string;
  };
  errors: FVError[];
};
