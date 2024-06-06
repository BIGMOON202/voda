import React, { useState } from "react";
import basketball_mark from "../../assets/basketball_mark.png";
import Modal from "../Modal";
import BasketballScheduleModal from "./BasketballScheduleModal";

import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";
import { BasketballPlayerCard } from "./BasketballPlayerCard";

export const BasketballTeamCard = ({
  teamID,
  teamlogo,
  teamname,
  teamabr,
  bestteam,
  teamGender,
}) => {
  const { documents, error } = useFirestoreRealtime("BasketballPlayers");
  const filteredDocuments = documents.filter(
    (doc) => doc.TeamName == teamabr && doc.Gender == teamGender
  );
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const viewPlayers = () => {
    setPlayerModalOpen(true);
  };
  const viewSchedules = () => {
    setScheduleModalOpen(true);
  };

  return (
    <div className="w-full h-[94px] rounded-[12px] border border-[#CFCFCF] px-[16px] py-[20px] flex items-center justify-between">
      <div className="flex gap-[10px]">
        <img className="w-[54px] h-[54px]" src={teamlogo}></img>
        <div className="flex flex-col gap-[8px]">
          <p className="text-[18px] font-bold text-black">{teamname}</p>
          <div className="flex items-center gap-[8px]">
            <p
              className="text-[16px] text-[#1766FF] hover:cursor-pointer"
              onClick={viewPlayers}
            >
              Players
            </p>
            <span className="text-[12px] text-[#CFCFCF] mx-2">|</span>
            <p
              className="text-[16px] text-[#1766FF] hover:cursor-pointer"
              onClick={viewSchedules}
            >
              Schedules
            </p>
          </div>
        </div>
      </div>
      {bestteam && (
        <img className="w-[50px] h-[50px]" src={basketball_mark}></img>
      )}

      <Modal
        isOpen={playerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
        header={
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-center">
              <div className="flex flex-col items-center">
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src={teamlogo}
                  alt="teamlogo"
                ></img>
                <p className="text-black text-2xl text-center font-bold">
                  {teamname}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center ">
              <p className="text-black text-1xl">(</p>
              <p className="text-black text-1xl">
                {filteredDocuments.length}&nbsp;
              </p>
              <p className="text-black text-1xl">members)</p>
            </div>
          </div>
        }
      >
        <div className="flex flex-wrap gap-[20px]">
          {filteredDocuments.map((player, index) => (
            <BasketballPlayerCard
              key={player.id}
              TeamName={player.TeamName}
              Name={player.Name}
              LastName={player.LastName}
              Number={player.Number}
              Position={player.Position}
              Height={player.Height}
              Grade={player.Grade}
            />
          ))}
        </div>
      </Modal>
      <BasketballScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        teamabr={teamabr}
        teamGender={teamGender}
        header={
          <div className="w-full flex justify-center ">
            <div className="flex flex-col items-center">
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={teamlogo}
                alt="teamlogo"
              ></img>
              <p className="text-black text-2xl text-center font-bold">
                {teamname}
              </p>
            </div>
          </div>
        }
      ></BasketballScheduleModal>
    </div>
  );
};
