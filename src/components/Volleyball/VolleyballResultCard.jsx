import React from "react";
import polygon from "../../assets/icons/Polygon.png";

export const VolleyballResultCard = ({
  type,
  team1,
  team2,
  team1_logo,
  team2_logo,
  score1,
  score2,
  totalScore,
  Date,
}) => {
  return (
    <div className="w-full h-[240px] border rounded-[12px] border-[#CFCFCF] flex flex-col">
      <div className="flex flex-col h-[200px] border-b pl-[30px] py-[20px] gap-[24px]">
        <div className="flex justify-between">
          <p className="font-bold text-[18px] text-[#94ACC4]">{type}</p>
          <div className="flex">
            {score1.map((score, index) => (
              <p
                key={index}
                className="w-[70px] text-center font-bold text-[18px]"
              >
                {index + 1}
              </p>
            ))}
            <p className="w-[50px] text-right font-bold text-[18px]">T</p>
            <div className="w-[30px]"></div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[20px] items-center">
            <img
              className="w-[38px] h-[38px] flex-shrink-0 rounded-full"
              src={team1_logo}
            ></img>
            <p
              className={`font-bold text-[18px] ${
                totalScore[0] > totalScore[1] ? "text-black" : "text-[#5F5F5F]"
              }`}
            >
              {team1}
            </p>
          </div>
          <div className="flex items-center">
            {score1.map((score, index) => (
              <p
                key={index}
                className={`w-[70px] text-center font-bold text-[18px] ${
                  score1[index] > score2[index]
                    ? "text-black"
                    : "text-[#5F5F5F]"
                }`}
              >
                {score1[index]}
              </p>
            ))}
            <p
              className={`w-[50px] text-right font-bold text-[18px] ${
                totalScore[0] > totalScore[1] ? "text-black" : "text-[#5F5F5F]"
              }`}
            >
              {totalScore[0]}
            </p>
            <div className="w-[30px] flex justify-end">
              {totalScore[0] > totalScore[1] && (
                <img className="w-[20px] h-[20px]" src={polygon}></img>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-[20px] items-center">
            <img
              className="w-[38px] h-[38px] flex-shrink-0 rounded-full"
              src={team2_logo}
            ></img>
            <p
              className={`font-bold text-[18px] ${
                totalScore[0] < totalScore[1] ? "text-black" : "text-[#5F5F5F]"
              }`}
            >
              {team2}
            </p>
          </div>
          <div className="flex items-center">
            {score1.map((score, index) => (
              <p
                key={index}
                className={`w-[70px] text-center font-bold text-[18px] ${
                  score1[index] < score2[index]
                    ? "text-black"
                    : "text-[#5F5F5F]"
                }`}
              >
                {score2[index]}
              </p>
            ))}
            <p
              className={`w-[50px] text-right font-bold text-[18px] ${
                totalScore[0] < totalScore[1] ? "text-black" : "text-[#5F5F5F]"
              }`}
            >
              {totalScore[1]}
            </p>
            <div className="w-[30px] flex justify-end">
              {totalScore[0] < totalScore[1] && (
                <img className="w-[20px] h-[20px]" src={polygon}></img>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full flex items-center px-[30px]">
        <p className="text-[18px]">{Date}</p>
      </div>
    </div>
  );
};
