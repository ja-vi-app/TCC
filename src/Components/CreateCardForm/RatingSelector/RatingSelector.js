/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Container } from "@mui/material";
import "./RatingSelector.scss";

export function RatingSelector() {
  const [starHightlighted, setStarHightlighted] = useState(0);
  const [isClicked, setIsClicked] = useState(-1);

  function getStarClass(index) {
    return starHightlighted >= index ? "accent" : "";
  }

  function handleClassMouseOver(index) {
    setStarHightlighted(index);
  }

  function handleClassMouseOut() {
    if (isClicked > -1) setStarHightlighted(isClicked);
    else setStarHightlighted(-1);
  }

  function handleClassClick(index) {
    setIsClicked(index);
  }

  return (
    <>
      <Container>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
          <svg
            key={index}
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"svg-default-stroke " + getStarClass(index)}
            onMouseOver={() => handleClassMouseOver(index)}
            onMouseOut={() => handleClassMouseOut()}
            onClick={() => handleClassClick(index)}
          >
            <path d="M22.6033 27.3393L15.4608 22.9988C14.9822 22.708 14.3814 22.708 13.9028 22.9988L6.76038 27.3393C6.38211 27.5692 5.91371 27.2304 6.01362 26.7992L7.91388 18.5976C8.03897 18.0578 7.85621 17.4929 7.43859 17.1286L1.10495 11.6041C0.772351 11.314 0.951314 10.7667 1.39106 10.7291L9.71567 10.018C10.271 9.9706 10.7543 9.61915 10.9705 9.10544L14.221 1.38353C14.3927 0.975518 14.9709 0.975515 15.1427 1.38354L18.3931 9.10544C18.6094 9.61915 19.0926 9.9706 19.648 10.018L27.9726 10.7291C28.4123 10.7667 28.5913 11.314 28.2587 11.6041L21.9251 17.1286C21.5074 17.4929 21.3247 18.0578 21.4498 18.5976L23.35 26.7992C23.4499 27.2304 22.9815 27.5692 22.6033 27.3393Z" />
          </svg>
        ))}
      </Container>
    </>
  );
}
