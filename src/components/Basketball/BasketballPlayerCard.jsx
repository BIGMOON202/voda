import React from "react";

export const BasketballPlayerCard = ({
  Gender,
  TeamName,
  Name,
  LastName,
  Number,
  Position,
  Height,
  Grade,
}) => {
  return (
    <div className="w-[202px] h-[202px] rounded-[16px] border flex flex-col">
      {/* <div className="relative h-[148px]">
        <img src={player} className="w-full h-full rounded-t-[16px]"></img>
        <div className="absolute w-[42px] h-[42px] rounded-tl-[16px] border border-white drop-shadow-sm bottom-0 right-0 bg-black/30 bg-opacity-50 flex justify-center items-center">
          <p className=" font-extrabold text-[20px] text-white">{Number}</p>
        </div>
      </div> */}
      <div className="px-[15px] pt-[16px] flex flex-col gap-[4px] text-center">
        <p className="font-bold text-[15px]">
          {Name} {LastName}
        </p>
        <p className="px-2 rounded-[6px] bg-black text-[14px] text-white font-bold inline-block">
          {TeamName}
        </p>
        <p className=" font-extrabold text-[20px] text-[#94ACC4]">{Number}</p>
        <p className="font-medium text-[13px]">{Position}</p>
        <div className="flex items-center justify-center">
          <p className="text-[13px]">{Height}</p>
          <span className="text-[10px] mx-3">|</span>
          <p className="text-[13px]">{Grade}</p>
        </div>
      </div>
    </div>
  );
};
