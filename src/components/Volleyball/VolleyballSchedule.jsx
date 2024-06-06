import React, { useState, useEffect } from "react";
import { VolleyballScheduleRow } from "./VolleyballScheduleRow";

import left_arrow from "../../assets/icons/left_arrow.png";
import right_arrow from "../../assets/icons/right_arrow.png";
import { useFirestoreOverall } from "../../hooks/useFirestoreOverall";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const VolleyballSchedule = ({ selectedGender }) => {
  const { teamsData, schedulesData, error } = useFirestoreOverall();

  const formatDate = (date) => {
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
    };
  };

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [indexDay, setIndexDay] = useState(new Date());
  const [view, setView] = useState("day");

  const generateWeek = (baseDate) => {
    const millisecondsPerDay = 86400000; // Number of milliseconds in one day
    let days = [];

    for (let i = -3; i <= 3; i++) {
      const date = new Date(baseDate.getTime() + i * millisecondsPerDay);
      days.push(date);
    }

    return days;
  };

  const [days, setDays] = useState([]);

  useEffect(() => {
    setDays(generateWeek(indexDay));
  }, [indexDay]);

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIndexDay(day);
  };

  const incrementDay = () => {
    setIndexDay(new Date(indexDay.getTime() + 86400000));
  };

  const decrementDay = () => {
    setIndexDay(new Date(indexDay.getTime() - 86400000));
  };

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

    return `${teamASetsWon}-${teamBSetsWon}`;
  };

  const filteredDocuments = schedulesData.filter((schedule) => {
    if (view === "all") return schedule.Gender === selectedGender.charAt(0);

    const scheduleDate = new Date(schedule.Date);
    return (
      schedule.Gender === selectedGender.charAt(0) &&
      scheduleDate.getDate() === selectedDay.getDate() &&
      scheduleDate.getMonth() === selectedDay.getMonth() &&
      scheduleDate.getFullYear() === selectedDay.getFullYear()
    );
  });

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-center gap-4">
        <label>
          <input
            type="radio"
            value="all"
            checked={view === "all"}
            onChange={() => setView("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="day"
            checked={view === "day"}
            onChange={() => setView("day")}
          />
          Day
        </label>
      </div>

      {view === "day" && (
        <div className="w-full h-[68px] rounded-[10px] border border-[#CFCFCF] mb-[18px] bg-[#F8FAFC] flex justify-between items-center">
          <div
            className="w-[44px] px-[10px] flex cursor-pointer"
            onClick={decrementDay}
          >
            <img src={left_arrow} className="w-[24px] h-[24px]"></img>
          </div>

          {days.map((day, index) => {
            let dayTxt = formatDate(day);
            return (
              <div
                className="w-[70px] h-[51px] flex-col cursor-pointer"
                key={index}
                onClick={() => handleDayClick(day)}
              >
                <p
                  className={`font-bold text-[16px] text-center ${
                    isSameDay(day, selectedDay)
                      ? "text-black"
                      : "text-[#BBBBBB]"
                  }`}
                >
                  {dayTxt.day} {dayTxt.month}
                </p>
                <p
                  className={`font-bold text-[16px] text-center ${
                    isSameDay(day, selectedDay)
                      ? "text-black"
                      : "text-[#BBBBBB]"
                  }`}
                >
                  {dayTxt.weekday}
                </p>
              </div>
            );
          })}
          <div
            className="w-[44px] px-[10px] flex cursor-pointer"
            onClick={incrementDay}
          >
            <img src={right_arrow} className="w-[24px] h-[24px]"></img>
          </div>
        </div>
      )}

      {view === "day" && (
        <div className="relative inline-block">
          <DatePicker
            selected={selectedDay}
            onChange={(date) => handleDayClick(date)}
            dateFormat="MMMM d, yyyy"
            className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      <div>
        <div className="w-full h-[68px] mb-[18px] bg-[#DFE6ED] flex">
          <div className="w-2/5 px-[20px] flex items-center">
            <p className="font-bold text-[18px]">Matchup</p>
          </div>
          <div className="w-1/5 px-[20px] flex items-center">
            <p className="font-bold text-[18px]">Type</p>
          </div>
          <div className="w-1/5 px-[20px] flex items-center">
            <p className="font-bold text-[18px]">Date</p>
          </div>
          <div className="w-1/5 px-[20px] flex items-center">
            <p className="font-bold text-[18px]">Results</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          {filteredDocuments.map((schedule, index) => {
            const teamA = teamsData.filter(
              (team) => team.Abbreviation == schedule.TeamA
            )[0];
            const teamB = teamsData.filter(
              (team) => team.Abbreviation == schedule.TeamB
            )[0];
            const teamAImageUrl = teamA?.imageUrl;
            const teamBImageUrl = teamB?.imageUrl;
            return (
              <VolleyballScheduleRow
                key={schedule.id}
                TeamA={schedule["TeamA"]}
                TeamB={schedule["TeamB"]}
                Type={schedule.Type == "T" ? "Tournament" : "Conference"}
                Result={calculateResult(
                  schedule["Set1"],
                  schedule["Set2"],
                  schedule["Set3"]
                )}
                Date={schedule.Date}
                logoA={teamAImageUrl}
                logoB={teamBImageUrl}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
