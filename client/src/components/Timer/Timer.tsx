import React, { useState, useEffect } from "react";

import { TimerContainer, TimerBg, TimerTxt } from "./Timer.style";

interface PromiseTime {
  date: string;
}
function Timer({ date }: PromiseTime) {
  const calculateTimeLeft = (date: string) => {
    // dueDate 형식은 "2021-11-07 01:39:40" 형식이거나 "2021.11.07 01:39:40" 형식 이어야 합니다.
    const difference = +new Date(date) - +new Date();
    let timeLeft: any = {};
    // 남은 시간이 존재할 경우 3일 이하로 시간, 3일 이상 디데이
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // 남은 시간이 존재하지 않을 경우 00:00 으로 설정
      timeLeft = {
        days: 0,
        hours: "0",
        minutes: "0",
      };
    }

    if (!timeLeft.days && timeLeft.hours === "0" && timeLeft.minutes === "0") {
      return "나눔 마감";
    } else if (timeLeft.days >= 3) {
      return `D-${timeLeft.days}`;
      // 시간이나 분이 한자리 수 일때 뒤에 0 붙여주기
    } else if (timeLeft.minutes < 10) {
      return `${timeLeft.days * 24 + timeLeft.hours}:0${timeLeft.minutes}`;
    } else if (timeLeft.days * 24 + timeLeft.hours < 10) {
      return `0${timeLeft.days * 24 + timeLeft.hours}:${timeLeft.minutes}`;
    } else if (
      timeLeft.minutes < 10 &&
      timeLeft.days * 24 + timeLeft.hours < 10
    ) {
      return `0${timeLeft.days * 24 + timeLeft.hours}:0${timeLeft.minutes}`;
    } else {
      return `${timeLeft.days * 24 + timeLeft.hours}:${timeLeft.minutes}`;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);
  });

  return (
    <TimerContainer>
      <TimerBg timeLeft={timeLeft}>
        <img src="./images/clock.svg" alt="timer"></img>
      </TimerBg>
      <TimerTxt timeLeft={timeLeft}>
        <span>{timeLeft}</span>
      </TimerTxt>
    </TimerContainer>
  );
}

export default Timer;
