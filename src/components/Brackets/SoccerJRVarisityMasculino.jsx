import React from "react";
import { Circle, Layer, Line, Rect, Stage, Text } from "react-konva";

const lines = [
  [52, 120, 246, 120],
  [52, 237, 246, 237],
  [52, 352, 246, 352],
  [52, 468, 246, 468],
  [52, 556, 246, 556],
  [52, 672, 246, 672],
  [246, 120, 246, 237],
  [246, 352, 246, 468],
  [246, 556, 246, 672],

  [246, 63, 445, 63],
  [246, 178, 445, 178],
  [246, 410, 445, 410],
  [246, 614, 445, 614],
  [445, 63, 445, 178],
  [445, 410, 445, 614],

  [445, 121, 641, 121],
  [445, 526, 641, 526],
  [641, 121, 641, 526],
  [641, 324, 740, 324],
];

const texts = [
  [52, 90, 246, 120, "NOTRE DAME"],
  [52, 237, 246, 267, "PERPETUO"],
  [52, 120, 246, 237, "JUEVES\n5:30PM"],

  [52, 322, 246, 352, "SAN IGNACIO"],
  [52, 468, 246, 498, "ST JOHN'S"],
  [52, 352, 246, 468, "JUEVES\n3:30PM"],

  [52, 526, 246, 556, "SAN JOSE"],
  [52, 672, 246, 702, "BALDWIN"],
  [52, 556, 246, 672, "VIERNES\n3:30PM"],

  [246, 33, 445, 63, "MARISTA"],
  [246, 63, 445, 178, "VIERNES\n5:30PM"],

  [246, 410, 445, 614, "SABADO\n10:00AM"],

  [445, 121, 641, 526, "SABADO\n3:00PM"],
];

export const SoccerJRVarisityMasculino = () => {
  return (
    <>
    <div className="w-full"><p className="text-center text-[30px] font-bold">Soccer JR Varisity Masculino</p></div>
    <div className="flex w-full h-full items-center justify-center">
      <Stage width={780} height={740}>
        <Layer>
          {texts.map(([sx, sy, ex, ey, text], i) => (
            <Text
              key={i}
              x={sx}
              y={sy}
              width={ex - sx}
              height={ey - sy}
              align="center"
              verticalAlign="middle"
              fontStyle="bold"
              text={text}
              fontSize={20}
            />
          ))}

          {lines.map((line, i) => (
            <Line key={i} points={line} stroke="black" />
          ))}
        </Layer>
      </Stage>
    </div>
    </>
  );
};
