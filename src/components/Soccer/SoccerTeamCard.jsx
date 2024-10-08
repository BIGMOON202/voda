import React, { useState } from "react";
import soccer_mark from "../../assets/soccer_mark.png";
import Modal from "../Modal";
import SoccerScheduleModal from "./SoccerScheduleModal";

import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";
import { PRHSAAuseFirestoreRealtime } from "../../hooks/PRHSAAuseFirestoreRealtime";
import { SoccerPlayerCard } from "./SoccerPlayerCard";

export const SoccerTeamCard = ({
  teamID,
  teamlogo,
  teamname,
  teamabr,
  bestteam,
  teamGender,
  category
}) => {
  let { documents, error } = [];
  if(category == "PRHSAA"){
  ({ documents, error } = PRHSAAuseFirestoreRealtime("PRHSAASoccerPlayers"));
  } else {
    ({ documents, error } = useFirestoreRealtime("SoccerPlayers"));
  }
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
        <img
          className="w-[54px] h-[54px] flex-shrink-0 rounded-full"
          src={teamlogo}
        ></img>
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
              Schedule
            </p>
          </div>
        </div>
      </div>
      {bestteam && <img className="w-[50px] h-[50px]" src={soccer_mark}></img>}

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
            <SoccerPlayerCard
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
      <SoccerScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        teamabr={teamabr}
        teamGender={teamGender}
        category={category}
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
      ></SoccerScheduleModal>
    </div>
  );
};
