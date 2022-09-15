import zafClient from "@app/zendesk/sdk";
import { ZendeskCustomer } from "@fullview/types";
import { AppContextData } from "../../types";
import { IZafService } from "./ZafService";

export class ChatZafService implements IZafService {
  async appendTextToTextarea(
    text: string,
    cb?: (err: string) => void
  ): Promise<void> {
    try {
      await zafClient.invoke("chat.postToChatTextArea", text);
    } catch (err: any) {
      if (cb) {
        cb(err.message);
      }
    }

    return Promise.resolve();
  }

  async getCustomerData(): Promise<ZendeskCustomer> {
    const zafData = await zafClient.get("visitor");
    const visitor: ZendeskCustomer = zafData.visitor;

    return {
      id: visitor.id,
      externalId: visitor.externalId,
      name: visitor.name,
      email: visitor.email,
    };
  }

  async getAppContextData(): Promise<AppContextData> {
    const data = await zafClient.get("chat");

    return {
      id: data.chat.id,
    };
  }
}
