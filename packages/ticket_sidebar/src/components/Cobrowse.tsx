import { Anchor, Button } from "@zendeskgarden/react-buttons";
import { Row, Col } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { useZendeskContext } from "../contexts/ZendeskContextProvider";
import { InfoText } from "./core";
import { APP_URL } from "../utils/constants";

type CobrowseProps = {
  invitationId: string;
};

export const Cobrowse = (props: CobrowseProps) => {
  const { customer } = useZendeskContext();
  let queryString = "?fromApp=zendesk";

  const userInfo: Record<string, unknown> = {
    email: customer?.email,
    externalId: customer?.externalId,
    invitationId: props.invitationId,
  };

  const searchText = Object.keys(userInfo).reduce(
    (acc: string, key: string, i) => {
      if (userInfo[key]) {
        acc += `${i !== 0 ? " " : ""}${userInfo[key]}`;
      }

      return acc;
    },
    ""
  );

  if (searchText) {
    queryString += `&searchText=${btoa(searchText)}`;
  }

  return (
    <>
      <InfoText>
        Start a co-browsing session with your customer, from within our product.
      </InfoText>

      <Row>
        <Col textAlign="center">
          <Anchor href={`${APP_URL}/dashboard${queryString}`} target="_blank">
            <CobrowseButton size="small" isPrimary>
              Co-browse with Fullview
            </CobrowseButton>
          </Anchor>
        </Col>
      </Row>
    </>
  );
};

const CobrowseButton = styled(Button)`
  margin-bottom: ${(props) => props.theme.space.sm}; }
`;
