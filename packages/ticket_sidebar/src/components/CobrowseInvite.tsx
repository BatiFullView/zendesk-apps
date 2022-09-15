import { Button } from "@zendeskgarden/react-buttons";
import { DEFAULT_THEME, PALETTE } from "@zendeskgarden/react-theming";
import { Inline } from "@zendeskgarden/react-loaders";
import styled from "styled-components";

import { useState } from "react";
import { cobrowseInvitationService } from "../services";
import { useZendeskContext } from "../contexts/ZendeskContextProvider";
import { MD } from "@zendeskgarden/react-typography";

type CobrowseInviteProps = {
  setInvitationId: (invitationId: string) => void;
  organisationId: string;
};

export const CobrowseInvite = (props: CobrowseInviteProps) => {
  const appState = useZendeskContext();
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);

  const generateCobrowseInvitation = async () => {
    if (loading) {
      return;
    }

    setShowError(false);
    setLoading(true);

    const response = await cobrowseInvitationService.generate(
      appState,
      props.organisationId
    );

    setLoading(false);

    if (!response.status) {
      setShowError(true);
      return;
    }

    if (response.status && response.data?.invitationId) {
      await appState?.zafService.appendTextToTextarea(
        `
        ${appState?.agent?.name} is asking you to start a co-browsing session. Please click the link below to join the session. \n
        ${response.data.invitationUrl} \n
        Co-browsing is securly provided by Fullview. \n
      `,
        (err?: string) => {
          if (err) {
            setShowError(true);
          }
        }
      );

      props.setInvitationId(response.data.invitationId);
    }
  };

  return (
    <Container>
      <Button
        className="cobrowse-button"
        isStretched
        size="small"
        onClick={generateCobrowseInvitation}
      >
        {loading ? (
          <Inline size={36} color={PALETTE.blue[600]} />
        ) : (
          "Send invite to co-browse"
        )}
      </Button>

      {showError && <MD>Something went wrong, please try again...</MD>}
    </Container>
  );
};

const Container = styled.div`
  & > .cobrowse-button {
    margin-bottom: ${(props: { theme: typeof DEFAULT_THEME }) =>
      props.theme.space.sm};
  }
`;
