import React from "react";

export const BasketballStandingRow = ({
  teamlogo,
  teamname,
  overall,
  tournament,
  conference,
}) => {
  return (
    <div className="w-full h-[68px] bg-[#F8FAFC] border-t border-b border-[#CFCFCF] flex">
      <div className="w-1/4 px-[20px] flex items-center gap-[10px]">
        <img
          src={teamlogo}
          className="w-[40px] h-[40px] flex-shrink-0 rounded-full"
        ></img>
        <p className="font-medium text-[18px]">{teamname}</p>
      </div>
      <div className="w-1/4 px-[20px] flex items-center">
        <p className="font-medium text-[18px]">{overall}</p>
      </div>
      <div className="w-1/4 px-[20px] flex items-center">
        <p className="font-medium text-[18px]">{tournament}</p>
      </div>
      <div className="w-1/4 px-[20px] flex items-center">
        <p className="font-medium text-[18px]">{conference}</p>
      </div>
    </div>
  );
};
