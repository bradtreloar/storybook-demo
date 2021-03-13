import { range } from "lodash";
import React from "react";
import styled from "styled-components";
import { romanNumeral } from "../utils";

export interface FaceProps {
  fieldColor: string;
}

export interface DialProps {
  dialColor: string;
}

export interface HandPathProps {
  handColor: string;
  thickness: string;
}

export interface HandWrapperProps extends HandPathProps {
  rotation: number;
}

export interface HandProps extends HandWrapperProps {
  length: "hour" | "minute" | "second";
}

export type Numerals = "arabic" | "roman";

export interface MarkProps {
  value: number;
}

export interface NumericMarkProps extends MarkProps {
  numerals: Numerals;
}

export type ClockSize = "small" | "medium" | "large";

export interface AnalogClockProps {
  hour: number;
  minute: number;
  second?: number;
  numerals?: Numerals;
  size: ClockSize;
}

const ClockSVG = styled.svg<{ size: ClockSize }>`
  max-height: 100%;
  max-width: 100%;
  position: relative;
  width: ${(p) =>
    p.size === "large" ? "200px" : p.size === "medium" ? "150px" : "100px"};
`;

const Face = styled.circle<FaceProps>`
  stroke: none;
  fill: ${(p) => p.fieldColor};
`;

const Dial = styled.circle<DialProps>`
  stroke: none;
  fill: ${(p) => p.dialColor};
`;

const HandWrapper = styled.g<HandWrapperProps>`
  path {
    stroke: ${(p) => p.handColor};
    stroke-width: ${(p) => p.thickness};
    stroke-linecap: round;
    transform: rotate(${(p) => p.rotation.toFixed(2)}deg);
    transform-origin: center;
    transition: 1s linear all;
  }
`;

const NumericMarkText = styled.text<{ numerals: Numerals }>`
  font-family: Cambria, "Hoefler Text", Utopia, "Liberation Serif",
    "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;
  text-align: center;
  text-anchor: middle;
  dominant-baseline: central;
  font-size: ${(p) => (p.numerals === "roman" ? `0.5rem` : `0.75rem`)};
`;

const NotchMarkWrapper = styled.g<{ rotation: string }>`
  path {
    stroke: black;
    stroke-width: 1px;
    stroke-linecap: round;
    transform: rotate(${(p) => p.rotation});
    transform-origin: center;
    transition: 1s linear all;
  }
`;

const NumericMark: React.FC<NumericMarkProps> = ({ value, numerals }) => {
  const r = 42;
  const θ = ((value - 3) / 6) * Math.PI;
  const hPosition = (r * Math.cos(θ) + 50).toFixed(2);
  const vPosition = (r * Math.sin(θ) + 50).toFixed(2);

  return (
    <NumericMarkText
      numerals={numerals}
      x={`${hPosition}%`}
      y={`${vPosition}%`}
    >
      {numerals === "roman" ? romanNumeral(value) : value}
    </NumericMarkText>
  );
};

const NotchMark: React.FC<MarkProps> = ({ value }) => {
  const rotation = `${value * 30}deg`;

  return (
    <NotchMarkWrapper rotation={rotation}>
      <path
        d={`
          M 50, 3
          l 0, 7
        `}
      />
    </NotchMarkWrapper>
  );
};

const Hand: React.FC<HandProps> = ({
  length,
  handColor,
  rotation,
  thickness,
}) => {
  return (
    <HandWrapper
      handColor={handColor}
      rotation={rotation}
      thickness={thickness}
    >
      <path
        d={`
          M 50, 50
          l 0, ${
            length === "hour" ? "-25" : length === "minute" ? "-48" : "-35"
          }
        `}
      />
      {length === "second" && (
        <path
          d={`
          M 50, 50
          l 0, 10
        `}
        />
      )}
    </HandWrapper>
  );
};

const AnalogClock: React.FC<AnalogClockProps> = ({
  hour,
  minute,
  second,
  numerals,
  size,
}) => {
  const hourAngle = second
    ? (hour + minute / 60 + second / 3600) * 30
    : (hour + minute / 60) * 30;
  const minuteAngle = second ? (minute + second / 60) * 6 : minute * 6;
  const secondAngle = second ? second * 6 : 0;

  return (
    <ClockSVG size={size} viewBox="0 0 100 100">
      <Face cx="50" cy="50" r="50" fieldColor="white"></Face>
      <Hand
        length="hour"
        thickness="2px"
        handColor="black"
        rotation={hourAngle}
      />
      <Hand
        length="minute"
        thickness="1.25px"
        handColor="black"
        rotation={minuteAngle}
      />
      <Dial cx="50" cy="50" r="2.5px" dialColor="black" />
      {second !== undefined && (
        <>
          <Hand
            length="second"
            thickness="1px"
            handColor="red"
            rotation={secondAngle}
          />
          <Dial cx="50" cy="50" r="1px" dialColor="red" />
        </>
      )}
      {range(1, 13).map((hour) =>
        numerals ? (
          <NumericMark value={hour} numerals={numerals} />
        ) : (
          <NotchMark value={hour} />
        )
      )}
    </ClockSVG>
  );
};

export default AnalogClock;
