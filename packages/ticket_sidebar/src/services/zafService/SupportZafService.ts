import { AppContextData } from "./../../types/index";
import zafClient from "@app/zendesk/sdk";
import { ZendeskCustomer } from "@fullview/types";
import { IZafService } from "./ZafService";

export class SupportZafService implements IZafService {
  async appendTextToTextarea(text: string): Promise<void> {
    await zafClient.invoke("comment.appendText", text);

    return Promise.resolve();
  }

  async getCustomerData(): Promise<ZendeskCustomer> {
    const zafData = await zafClient.get("ticket");
    const requester: ZendeskCustomer = zafData?.ticket?.requester;

    return {
      id: requester.id,
      externalId: requester.externalId,
      name: requester.name,
      email: requester.email,
    };
  }

  async getAppContextData(): Promise<AppContextData> {
    const data = await zafClient.get("ticket");

    return {
      id: data.ticket.id,
    };
  }
}
