import zafClient from "@app/zendesk/sdk";
import { createContext, useContext, useEffect, useState } from "react";
import { IZafService, ZafService } from "../services";
import { AppType, ZendeskAgent, ZendeskCustomer } from "@fullview/types";
import { AppContextData, Settings } from "../types";

export type AppState = {
  appType: AppType;
  zafService: IZafService;
  agent: ZendeskAgent;
  customer: ZendeskCustomer;
  appContextData: AppContextData;
  subdomain: string;
};

const ZendeskContext = createContext<AppState>({} as AppState);

type ZendeskContextProviderProps = {
  children: React.ReactNode;
};

export const ZendeskContextProvider = ({
  children,
}: ZendeskContextProviderProps) => {
  const [appState, setAppState] = useState<AppState>({} as AppState);

  const getAppData = async (): Promise<AppState> => {
    const context = await zafClient.context();
    const appType = context.location as AppType;
    const zafAppService = new ZafService(appType);
    const agent: ZendeskAgent = (await zafClient.get("currentUser"))
      .currentUser;

    return {
      appType,
      agent,
      zafService: zafAppService,
      subdomain: context.account.subdomain,
      customer: await zafAppService.getCustomerData(),
      appContextData: await zafAppService.getAppContextData(),
    };
  };

  useEffect(() => {
    getAppData().then((appState) => setAppState(appState));
  }, []);

  return (
    <ZendeskContext.Provider value={{ ...appState }}>
      {children}
    </ZendeskContext.Provider>
  );
};

export const useZendeskContext = (): AppState => {
  const appState = useContext(ZendeskContext);

  console.log("App state", appState);

  return appState;
};
