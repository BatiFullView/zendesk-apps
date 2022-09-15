import { Paragraph, MD } from "@zendeskgarden/react-typography";
import { DEFAULT_THEME, PALETTE } from "@zendeskgarden/react-theming";
import styled from "styled-components";
import { useSessionReplays } from "../hooks";
import { InfoText } from "./core";
import { APP_URL, ASSETS_URL, PLAY_ICON } from "../utils/constants";
import { TimeUtils } from "../utils/time";
import { format } from "date-fns";
import { IdBuilder } from "../utils/idBuilder";
import { useZendeskContext } from "../contexts/ZendeskContextProvider";

type SessionReplaysProps = {
  organisationId: string;
};

export const SessionReplays = (props: SessionReplaysProps) => {
  const { customer } = useZendeskContext();

  const sessionReplays = useSessionReplays({
    email: customer.email ?? "",
    externalId: customer.externalId ?? "",
    organisationId: props.organisationId,
  });

  return (
    <Container>
      <MD className="title" isBold>
        Session Replays
      </MD>

      <InfoText>
        Watch your customer's most recent sessions for understanding their
        issues.
      </InfoText>

      {sessionReplays?.length ? (
        <SessionReplaysContainer>
          {sessionReplays?.map((sessionReplay) => (
            <SessionReplayRow
              key={sessionReplay._id}
              href={`${APP_URL}/replay/${sessionReplay._id}/${IdBuilder.to(
                sessionReplay.identity
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={`${ASSETS_URL}/${PLAY_ICON}`} />
              <SessionReplayDetails>
                <Paragraph>
                  {format(
                    new Date(sessionReplay.startDate),
                    "LLLL dd, hh:mmaaa"
                  )}
                </Paragraph>
                <SessionReplayDuration>
                  Duration <Separator />
                  {TimeUtils.formatIntervalToTime(
                    sessionReplay.startTimestamp,
                    sessionReplay.endTimestamp
                  )}
                </SessionReplayDuration>
              </SessionReplayDetails>
            </SessionReplayRow>
          ))}
        </SessionReplaysContainer>
      ) : (
        <MD>No session replays...</MD>
      )}
    </Container>
  );
};

const Container = styled.div`
  > .title {
    margin-bottom: ${(props: { theme: typeof DEFAULT_THEME }) =>
      props.theme.space.xs};
  }
`;

const SessionReplayRow = styled.a`
  color: inherit;
  text-decoration: inherit;
  padding: ${(props: { theme: typeof DEFAULT_THEME }) => props.theme.space.xs};
  border-bottom: 1px solid ${PALETTE.grey[400]};
  display: flex;
  align-items: center;
  cursor: pointer;

  > {
    img {
      width: 30px;
      height: 30px;
    }
  }
`;

const SessionReplaysContainer = styled.div`
  margin-top: ${(props: { theme: typeof DEFAULT_THEME }) =>
    props.theme.space.xs}; }

  ${SessionReplayRow}:first-child {
    border-top: 1px solid ${PALETTE.grey[400]};
  }
`;

const Separator = styled.div`
  border-radius: 100%;
  width: ${(props: { theme: typeof DEFAULT_THEME }) => props.theme.space.xxs};
  height: ${(props: { theme: typeof DEFAULT_THEME }) => props.theme.space.xxs};
  background-color: ${PALETTE.grey[600]};
  margin: 0 ${(props: { theme: typeof DEFAULT_THEME }) => props.theme.space.xxs};
`;

const SessionReplayDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${(props: { theme: typeof DEFAULT_THEME }) =>
    props.theme.space.xs};
  font-size: ${(props: { theme: typeof DEFAULT_THEME }) =>
    props.theme.fontSizes.md};
`;

const SessionReplayDuration = styled.div`
  display: flex;
  align-items: center;
  color: ${PALETTE.grey[600]};
  margin-top: 2px;
`;
