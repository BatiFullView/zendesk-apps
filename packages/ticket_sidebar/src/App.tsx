import zafClient from "@app/zendesk/sdk";
import { Row, Col } from "@zendeskgarden/react-grid";
import { Spinner } from "@zendeskgarden/react-loaders";
import { useEffect, useState } from "react";
import {
  Authorization,
  Cobrowse,
  CobrowseInvite,
  SessionReplays,
} from "./components";
import { useZendeskContext } from "./contexts/ZendeskContextProvider";
import { useAppStatus } from "./hooks";

function App() {
  const { customer, agent, appType, subdomain } = useZendeskContext();
  const { loading, appStatus } = useAppStatus({
    agent,
    appType,
    subdomain,
  });
  const [invitationId, setInvitationId] = useState("");

  useEffect(() => {
    zafClient.invoke("resize", { width: "100%" });
  }, []);

  const organisationId = appStatus?.organisationId;
  const showSessionReplays =
    organisationId && (customer?.email || customer?.externalId);
  const showCobrowse = customer?.email || customer?.externalId || invitationId;

  if (loading) {
    return (
      <Row>
        <Col textAlign="center">
          <Spinner size="38" />
        </Col>
      </Row>
    );
  }

  if (!appStatus?.isAuthorized) {
    return <Authorization {...appStatus} />;
  }

  if (showCobrowse) {
    return (
      <>
        <Cobrowse invitationId={invitationId} />

        {showSessionReplays && (
          <SessionReplays organisationId={organisationId} />
        )}
      </>
    );
  }

  if (organisationId) {
    return (
      <CobrowseInvite
        organisationId={organisationId}
        setInvitationId={setInvitationId}
      />
    );
  }

  return <div>Nothing to display</div>;
}

export default App;
