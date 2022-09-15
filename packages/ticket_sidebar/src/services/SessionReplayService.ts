import { AggregatedSessionReplay } from "@fullview/types";
import zafClient from "@app/zendesk/sdk";
import { INTEGRATIONS_ENDPOINT } from "../utils/constants";

class SessionReplayService {
  async getLastSessionReplays(
    email?: string,
    externalId?: string,
    organisationId?: string
  ) {
    const queryString = `email=${email}&externalId=${externalId}&organisationId=${organisationId}`;

    const options = {
      url: `${INTEGRATIONS_ENDPOINT}/session-replays?${queryString}`,
      type: "GET",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer {{jwt.token}}",
      },
      secure: true,
    };

    const response: {
      status: boolean;
      data: AggregatedSessionReplay[];
    } = await zafClient.request(options);

    return response;
  }
}

export const sessionReplayService = new SessionReplayService();
