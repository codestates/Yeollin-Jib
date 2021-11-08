import styled from "styled-components";

export const TimerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Time {
  timeLeft: any;
}

export const TimerBg = styled.div<Time>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${(props) =>
    props.timeLeft === "나눔 마감" ? "#C2BFC3" : "#fede8a"};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TimerTxt = styled.div<Time>`
  font-weight: 200;
  font-size: 14px;
  margin-left: 9px;
  span {
    color: ${(props) =>
      props.timeLeft === "나눔 마감" ? "#2d2d2d" : "#2d2d2d"};
  }
`;
