import { AppContextData } from "../../types";
import { SupportZafService } from "./SupportZafService";
import { ChatZafService } from "./ChatZafService";
import { AppType, ZendeskCustomer } from "@fullview/types";

export interface IZafService {
  appendTextToTextarea(text: string, cb?: (err: string) => void): Promise<void>;
  getCustomerData(): Promise<ZendeskCustomer>;
  getAppContextData(): Promise<AppContextData>;
}

export class ZafService {
  #service: IZafService;

  constructor(appType: AppType) {
    switch (appType) {
      case AppType.CHAT:
        this.#service = new ChatZafService();
        break;
      case AppType.SUPPORT:
        this.#service = new SupportZafService();
        break;
      default:
        throw new Error("Invalid app type");
    }
  }

  async appendTextToTextarea(text: string): Promise<void> {
    await this.#service.appendTextToTextarea(text);
  }

  async getCustomerData(): Promise<ZendeskCustomer> {
    return this.#service.getCustomerData();
  }

  async getAppContextData(): Promise<AppContextData> {
    return this.#service.getAppContextData();
  }
}
