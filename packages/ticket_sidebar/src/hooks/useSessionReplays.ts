import { useState, useEffect } from "react";
import { AggregatedSessionReplay } from "@fullview/types";
import { sessionReplayService } from "../services/SessionReplayService";

export const useSessionReplays = ({
  email,
  externalId,
  organisationId,
}: {
  email: string;
  externalId: string;
  organisationId: string;
}) => {
  const [sessionReplays, setSessionReplays] = useState<
    AggregatedSessionReplay[]
  >([]);

  useEffect(() => {
    sessionReplayService
      .getLastSessionReplays(email, externalId, organisationId)
      .then((res) => {
        setSessionReplays(res.data ?? []);
      });
  }, [email, externalId, organisationId]);

  return sessionReplays;
};
