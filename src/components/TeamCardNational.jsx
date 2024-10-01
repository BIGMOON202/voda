import React, { useState } from "react";
import volleyball_mark from "../assets/volleyball_mark.png";
import Modal from "./Modal";
import ScheduleModal from "./ScheduleModal";

import { useFirestoreRealtime } from "../hooks/useFirestoreRealtime";
import { PRHSAAuseFirestoreRealtime } from "../hooks/PRHSAAuseFirestoreRealtime";
import { VolleyballPlayerCard } from "./Volleyball/VolleyballPlayerCard";

export const TeamCardNational = ({ teamID, teamlogo, teamname, teamabr, bestteam, selectedGender, selectedYear, category }) => {

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const viewSchedules = () => {
    setScheduleModalOpen(true);
  };

  return (
    <div className="w-full h-[94px] rounded-[12px] border border-[#CFCFCF] px-[16px] py-[20px] flex items-center justify-between">
      <div className="flex gap-[10px]">
        <img
          className="w-[54px] h-[54px] flex-shrink-0 rounded-full"
          src={teamlogo}
        ></img>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[18px] font-bold text-black">{teamname}</p>
          <div className="flex items-center gap-[8px]">
            <p
              className="text-[16px] text-[#1766FF] hover:cursor-pointer"
              onClick={viewSchedules}
            >
              Schedule
            </p>
          </div>
        </div>
      </div>
      {bestteam && (
        <img className="w-[50px] h-[50px]" src={volleyball_mark}></img>
      )}

      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        teamabr={teamabr}
        selectedGender={selectedGender}
        selectedYear={selectedYear}
        category={category}
        header={
          <div className="w-full flex justify-center ">
            <p className="text-black text-2xl text-center font-bold">
              {teamabr}
            </p>
          </div>
        }
      ></ScheduleModal>
    </div>
  );
};
