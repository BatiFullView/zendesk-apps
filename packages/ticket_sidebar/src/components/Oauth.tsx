import { Anchor } from '@zendeskgarden/react-buttons';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { MD } from '@zendeskgarden/react-typography';
import styled from 'styled-components';

type OauthProps = {
  oauthUrl: string
}

export const Oauth = (props: OauthProps) => {
  return (
    <Container>
      <MD className="authorze-info">Please authorize fullview to generate an invite.</MD>
      <Anchor isExternal href={props.oauthUrl}>Authorize fullview</Anchor>
    </Container>
  )
}

const Container = styled.div`
  & > .authorize-info {
    margin-bottom: ${(props: { theme: typeof DEFAULT_THEME }) => props.theme.space.sm};
    font-size: ${(props: { theme: typeof DEFAULT_THEME }) => props.theme.fontSizes.md};
  }
`
