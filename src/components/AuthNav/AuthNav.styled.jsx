import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  &.active::after {
    content: '';
    position: absolute;
    left: 6px;
    bottom: -1px;
    display: inline-block;
    width: calc(100% - 12px);
    height: 2px;
    background-color: white;
    border-radius: 1px;
  }
`;
