import { Button } from "@zendeskgarden/react-buttons";
import { Row, Col } from "@zendeskgarden/react-grid";
import { PALETTE } from "@zendeskgarden/react-theming";
import { MD } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { AuthorizationStatus } from "../hooks";

type AuthorizationProps = AuthorizationStatus;

export const Authorization = (props: AuthorizationProps) => {
  const getButtonText = (): string => {
    if (props.needsAuthorization) {
      return "Authorize Fullview";
    }

    if (props.needsLinkWithFullview) {
      return "Link with Fullview";
    }

    return "";
  };

  if (!props.needsAuthorization && !props.needsLinkWithFullview) {
    return <MD>Something went wrong...</MD>;
  }

  return (
    <Container>
      <MD className="info-text">
        The configuration linking Fullview with Zendesk couldn't be found.
      </MD>
      <Row>
        <Col textAlign="center">
          <a href={props.redirectUrl} rel="noopener noreferrer" target="_blank">
            <Button isPrimary>{getButtonText()}</Button>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  .info-text {
    margin-bottom: ${(props) => props.theme.space.sm};
    color: ${PALETTE.grey[600]};
  }

  a {
    color: inherit;
    text-decoration: inherit;
    font-size: ${(props) => props.theme.fontSizes.md};
  }
`;
