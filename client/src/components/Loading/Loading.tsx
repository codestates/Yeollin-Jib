import React, { useEffect, useState } from "react";

import { ModalBackground, Container, Image } from "./Loading.style";

const animationImages = [
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/1.svg",
  "Images/1.svg",
  "Images/2.svg",
  "Images/3.svg",
  "Images/4.svg",
  "Images/5.svg",
  "Images/6.svg",
  "Images/7.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
  "Images/8.svg",
];

const App = () => {
  const [imageNumber, setImageNumber] = useState<number>(0);

  useEffect(() => {
    let count = 0;
    let countInterval = setInterval(() => {
      setImageNumber(count++ % 10);
    }, 1000 / 13);

    return () => clearInterval(countInterval);
  }, []);

  return (
    <ModalBackground>
      <Container>
        <Image src={animationImages[imageNumber]} key={imageNumber} />
      </Container>
    </ModalBackground>
  );
};

export default App;
