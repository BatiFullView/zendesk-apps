// The ZAFClient is injected in the index.html file when built / served.
// See docs for help regarding the ZAFClient: https://developer.zendesk.com/apps/docs/developer-guide/getting_started

interface IMetadata<T> {
  appId: number;
  installationId: number;
  name: string;
  plan: {
    name: string;
  };
  settings?: T;
}

interface IContext {
  host: string;
  product: string;
  location: string;
  instanceGuid: string;
  account: {
    subdomain: string;
  };
}

interface IClient {
  invoke: (cmd: string, arg: any) => Promise<void>;
  get: (getter: string) => any;
  metadata: <U>() => Promise<IMetadata<U>>;
  request: <U>(data: Object) => Promise<U>;
  set: <U>(field: string, value: any) => Promise<any>;
  on: (eventName: string, listener: (...args: any) => any) => void;
  context(): Promise<IContext>;
}

declare global {
  interface Window {
    ZAFClient: {
      init: () => IClient;
    };
  }
}

let zafClient: IClient;
if (typeof window.ZAFClient === "undefined") {
  // eslint-disable-line no-undef
  throw new Error("ZAFClient cannot run outside Zendesk");
} else {
  zafClient = window.ZAFClient.init(); // eslint-disable-line no-undef
}

export default zafClient;
