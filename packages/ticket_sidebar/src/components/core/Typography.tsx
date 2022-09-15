import { Paragraph } from "@zendeskgarden/react-typography";
import { DEFAULT_THEME, PALETTE } from "@zendeskgarden/react-theming";
import styled from "styled-components";

export const InfoText = styled(Paragraph)`
  margin-bottom: ${(props) => props.theme.space.xs};
  font-size: ${(props: { theme: typeof DEFAULT_THEME }) =>
    props.theme.fontSizes.md};
  color: ${PALETTE.grey[600]};
`;
