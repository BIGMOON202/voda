import React from "react";
import teamlogo from "../../assets/teamlogo.png";

export const SoccerScheduleRow = ({
  TeamA,
  TeamB,
  Type,
  Result,
  Penalty,
  Date,
  logoA,
  logoB,
}) => {
  const getPenaltyScore = (strScore) => {
    if (strScore == null || strScore == "") {
      return [0, 0];
    } else {
      return strScore.split("-").map(Number);
    }
  };
  return (
    <div className="w-full h-[68px] bg-[#F8FAFC] border-t border-b border-[#CFCFCF] flex">
      <div className="w-1/5 px-[20px] flex items-center justify-between">
        <div className="w-1/5 px-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <img
              src={logoA}
              className="w-[40px] h-[40px] flex-shrink-0 rounded-full"
            ></img>
            <p className="font-medium text-[18px]">{TeamA}</p>
          </div>
        </div>
        <p>@</p>
      </div>
      <div className="w-1/5 px-[20px] flex items-center gap-[10px]">
        <img
          src={logoB}
          className="w-[40px] h-[40px] flex-shrink-0 rounded-full"
        ></img>
        <p className="font-medium text-[18px]">{TeamB}</p>
      </div>
      <div className="w-1/5 px-[20px] flex items-center">
        <p className="font-medium text-[18px]">{Type}</p>
      </div>
      <div className="w-1/5 px-[20px] flex items-center">
        <p className="font-medium text-[18px]">{Date}</p>
      </div>
      <div className="w-1/5 px-[20px] flex items-center">
        <p className="font-medium text-[18px]">
          {Result === "" || Result == null
            ? "-"
            : `(${getPenaltyScore(Penalty)[0]})${Result}(${
                getPenaltyScore(Penalty)[1]
              })`}
        </p>
      </div>
    </div>
  );
};
