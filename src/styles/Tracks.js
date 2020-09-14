import styled from "styled-components";

export const Track = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 0 8px;
  img {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }
  .mr {
    margin-right: 20px;
  }
  &:hover {
    cursor: pointer;
  }
  &:hover {
    & .track-name {
      color: ${props => props.theme.colors.green};
    }
  }
`;

export const TrackAlbum = styled.div`
  color: grey;
  font-size: 12px;
  margin-top: 3px;
`;

export const TrackTime = styled.div`
  color: grey;
  font-size: 14px;
  margin-left: auto;
`;
