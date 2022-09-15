import { AppType, ZendeskAgent } from "@fullview/types";
import zafClient from "@app/zendesk/sdk";
import { INTEGRATIONS_ENDPOINT } from "../utils/constants";
import { AuthorizationStatusResponse } from "../types";

class AuthorizationService {
  async getStatus({
    appType,
    agent,
    subdomain,
  }: {
    appType: AppType;
    agent: ZendeskAgent;
    subdomain: string;
  }) {
    const queryString = `appType=${appType}&userId=${agent.id}&subdomain=${subdomain}&email=${agent.email}`;
    const options = {
      url: `${INTEGRATIONS_ENDPOINT}/authorize/status?${queryString}`,
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer {{jwt.token}}",
      },
      secure: true,
    };

    console.log("Options here", options);

    const response: AuthorizationStatusResponse = await zafClient.request(
      options
    );

    return response;
  }
}

export const authorizationService = new AuthorizationService();
