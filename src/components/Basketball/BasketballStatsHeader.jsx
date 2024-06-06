import React from "react";

export const BasketballStatsHeader = ({ selectedDoc }) => {
  return (
    <div className="flex flex-row">
      <div className="flex justify-center w-full">
        <div className="w-[300px] flex items-center justify-end">
          <p className="text-center font-bold text-4xl">
            {selectedDoc["TeamA"]}
          </p>
        </div>
        <div className="w-[350px] flex items-center justify-center text-gray-700">
          <p className="text-[30px]">{`<`}</p>
          <p className="text-[50px] font-bold">{selectedDoc.Score}</p>
          <p className="text-[50px]">{`>`}</p>
        </div>
        <div className="w-[300px] flex items-center justify-start">
          <p className="text-center font-bold text-4xl">
            {selectedDoc["TeamB"]}
          </p>
        </div>
      </div>
      <div className="flex justify-center"></div>
    </div>
  );
};
