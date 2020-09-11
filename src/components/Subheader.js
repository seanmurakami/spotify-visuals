import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Count = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 9px 4px 8px;
  background-color: ${props => props.theme.colors.green};
  border-radius: 15px;
  margin-left: 6px;
`;

const Subheader = ({ title, count }) => {
  return (
    <Flex>
      <h2>{title}</h2>
      {count && <Count>{count}</Count>}
    </Flex>
  );
};

export default Subheader;
