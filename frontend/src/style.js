import { css } from 'emotion';

export const appStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 900px;
    border-radius: 2px;
    margin-top: 20px;
  }

  & > div:not(:first-child) {
    margin-top: 20px;
  }
`;
