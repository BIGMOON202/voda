import React from "react";

export const ViewStatsHeader = ({ selectedDoc }) => {
  const calculateResult = (set1, set2, set3) => {
    const defaultScore = "0-0";
    const score1 = set1 || defaultScore;
    const score2 = set2 || defaultScore;
    const score3 = set3 || defaultScore;

    const [set1TeamAScore, set1TeamBScore] = score1.split("-").map(Number);
    const [set2TeamAScore, set2TeamBScore] = score2.split("-").map(Number);
    const [set3TeamAScore, set3TeamBScore] = score3.split("-").map(Number);

    const teamASetsWon =
      (set1TeamAScore > set1TeamBScore ? 1 : 0) +
      (set2TeamAScore > set2TeamBScore ? 1 : 0) +
      (set3TeamAScore > set3TeamBScore ? 1 : 0);
    const teamBSetsWon =
      (set1TeamBScore > set1TeamAScore ? 1 : 0) +
      (set2TeamBScore > set2TeamAScore ? 1 : 0) +
      (set3TeamBScore > set3TeamAScore ? 1 : 0);

    const result = `${teamASetsWon}-${teamBSetsWon}`;

    return result;
  };
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
          <p className="text-[50px] font-bold">
            {calculateResult(
              selectedDoc["Set1"],
              selectedDoc["Set2"],
              selectedDoc["Set3"]
            )}
          </p>
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
