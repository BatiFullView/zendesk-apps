import { INTEGRATIONS_ENDPOINT } from "../utils/constants";
import { ZendeskGenerateInvitePayload } from "@fullview/types";
import zafClient from "@app/zendesk/sdk";
import { AppState } from "../contexts/ZendeskContextProvider";

class CobrowseInvitationService {
  async generate(appState: AppState, organisationId: string) {
    const data: ZendeskGenerateInvitePayload = {
      appData: {
        id: appState.appContextData.id,
        appType: appState.appType,
      },
      agent: {
        id: appState?.agent.id!,
        email: appState?.agent.email!,
        name: appState?.agent.name!,
      },
      customer: appState.customer,
      organisationId: organisationId,
      subdomain: appState.subdomain!,
    };

    const options = {
      url: `${INTEGRATIONS_ENDPOINT}/generate-invitation`,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      headers: {
        Authorization: "Bearer {{jwt.token}}",
      },
      secure: true,
    };

    const response: {
      status: boolean;
      data: {
        invitationId?: string;
        invitationUrl?: string;
      };
    } = await zafClient.request(options);

    return response;
  }
}

export const cobrowseInvitationService = new CobrowseInvitationService();
