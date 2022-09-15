import { ErrorCode, ErrorCodes } from "@fullview/errors";
import { AppType, ZendeskAgent } from "@fullview/types";
import { authorizationService } from "../services/AuthorizationService";
import { useState, useEffect } from "react";

export const useAppStatus = ({
  appType,
  agent,
  subdomain,
}: {
  appType: AppType;
  agent: ZendeskAgent;
  subdomain: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [appStatus, setAppStatus] = useState<AuthorizationStatus>({
    isAuthorized: false,
  });

  useEffect(() => {
    if (!appType || !agent) {
      return;
    }

    setLoading(true);

    authorizationService
      .getStatus({
        appType,
        subdomain,
        agent,
      })
      .then((res) => {
        setLoading(false);

        if (res.status && res.data.organisationId) {
          return setAppStatus({
            isAuthorized: true,
            organisationId: res.data.organisationId,
          });
        }

        const error = res.errors[0];

        const errorCode = (error?.code ??
          ErrorCode.E0000) as unknown as ErrorCodes;

        if ([ErrorCodes.E4050, ErrorCodes.E2051].includes(errorCode)) {
          return setAppStatus({
            isAuthorized: false,
            organisationId: "",
            needsAuthorization: errorCode === ErrorCodes.E4050,
            needsLinkWithFullview: errorCode === ErrorCodes.E2051,
            redirectUrl: res.data.redirectUrl,
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [appType, agent, subdomain]);

  return { loading, appStatus };
};

export type AuthorizationStatus = {
  organisationId?: string;
  redirectUrl?: string;
  needsAuthorization?: boolean;
  needsLinkWithFullview?: boolean;
  isAuthorized: boolean;
};
