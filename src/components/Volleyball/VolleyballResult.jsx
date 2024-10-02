import React, { useState, useEffect } from "react";
import { useFirestoreOverallNational } from "../../hooks/useFirestoreOverallNational";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import left_arrow from "../../assets/icons/left_arrow.png";
import right_arrow from "../../assets/icons/right_arrow.png";
import { VolleyballResultCard } from "./VolleyballResultCard";
import teamlogo from "../../assets/teamlogo.png";

export const VolleyballResult = ({ selectedGender, selectedYear, selectedCategory }) => {
  let col = '';
  if(selectedCategory){
    col = selectedCategory;
  }
  const { teamsData, schedulesData, error } = useFirestoreOverallNational(col);
  const formatDate = (date) => {
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
    };
  };

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [indexDay, setIndexDay] = useState(new Date());
  const [filterMode, setFilterMode] = useState("day");

  const generateWeek = (baseDate) => {
    const millisecondsPerDay = 86400000;
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

  const extractScores = (result) => {
    const score1 = [0, 0, 0];
    const score2 = [0, 0, 0];

    for (let key in result) {
      if (key.startsWith("Set")) {
        if (result[key] != null && result[key] != "") {
          const [scoreTeam1, scoreTeam2] = result[key].split("-").map(Number);
          const setNumber = parseInt(key.slice(3)) - 1;
          score1[setNumber] = scoreTeam1;
          score2[setNumber] = scoreTeam2;
        }
      }
    }

    let totalScore = [0, 0];
    for (let i = 0; i < score1.length; i++) {
      if (score1[i] > score2[i]) {
        totalScore[0]++;
      } else if (score1[i] < score2[i]) {
        totalScore[1]++;
      }
    }

    return {
      score1: score1,
      score2: score2,
      totalScore: totalScore,
    };
  };

  const filteredDocuments = schedulesData.filter((result) => {
    if (filterMode === "all") return result.Gender === selectedGender.charAt(0) && 2000 + Number(result.Date.split("/")[2]) === selectedYear;
    const resultDate = new Date(result.Date);
    return (
      result.Gender === selectedGender.charAt(0) &&
      resultDate.getDate() === selectedDay.getDate() &&
      resultDate.getMonth() === selectedDay.getMonth() &&
      resultDate.getFullYear() === selectedDay.getFullYear()
    );
  });

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex items-center mb-[20px]">
        <label className="mr-[10px]">
          <input
            type="radio"
            value="all"
            checked={filterMode === "all"}
            onChange={() => setFilterMode("all")}
            className="mr-[5px]"
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="day"
            checked={filterMode === "day"}
            onChange={() => setFilterMode("day")}
            className="mr-[5px]"
          />
          Day
        </label>
      </div>
      {filterMode == "day" && (
        <>
          <div
            className={`w-full h-[68px] rounded-[10px] border border-[#CFCFCF] mb-[18px] bg-[#F8FAFC] flex justify-between items-center ${
              filterMode === "all" ? "opacity-50 pointer-events-none" : ""
            }`}
          >
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
          <div className="relative inline-block mb-[20px]">
            <DatePicker
              selected={selectedDay}
              onChange={(date) => handleDayClick(date)}
              dateFormat="MMMM d, yyyy"
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              disabled={filterMode === "all"}
            />
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-[20px] pb-[50px]">
        {filteredDocuments.map((result, index) => {
          const teamA = teamsData.filter(
            (team) => team.Abbreviation == result.TeamA
          )[0];
          const teamB = teamsData.filter(
            (team) => team.Abbreviation == result.TeamB
          )[0];
          const teamAImageUrl = teamA?.imageUrl;
          const teamBImageUrl = teamB?.imageUrl;

          return (
            <VolleyballResultCard
              key={index}
              type={result.Type}
              team1={result["TeamA"]}
              team2={result["TeamB"]}
              score1={extractScores(result).score1}
              score2={extractScores(result).score2}
              totalScore={extractScores(result).totalScore}
              team1_logo={teamAImageUrl}
              team2_logo={teamBImageUrl}
              Date={result.Date}
              Location={result.Location}
            />
          );
        })}
      </div>
    </div>
  );
};
