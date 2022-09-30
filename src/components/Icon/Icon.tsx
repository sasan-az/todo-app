import { ReactElement } from "react";
import styled, { css } from "styled-components";
import { getValidSize } from "styles/helpers";

export type IconProps = {
  /** The react component for svg (Any svg file imported as a component using "svgr" or a custom react component)*/
  component: ReactElement;

  /** icon color. It is a css color value*/
  fill?: string;

  /** The size of icon on different breakpoints. if a number or size string is passed, it will be used as {xs: ...}*/
  size: number;
};

const Icon = styled(
  ({ component: Component, size, fill, ...rest }): ReactElement => (
    <Component {...rest} />
  )
)<IconProps>`
  fill: ${({ fill }) => fill};
  ${({ size }) => css`
    width: ${getValidSize(size)};
    min-width: ${getValidSize(size)};
    max-width: ${getValidSize(size)};
    height: ${getValidSize(size)};
    min-height: ${getValidSize(size)};
    max-height: ${getValidSize(size)};
  `};
`;

export default Icon;
