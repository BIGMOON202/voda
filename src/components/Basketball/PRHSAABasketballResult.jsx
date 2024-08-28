import React, { useState, useEffect } from "react";
import { PRHSAABasketballStanding_Firestoreoverall } from "../../hooks/PRHSAABasketballStanding_Firestoreoverall";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import left_arrow from "../../assets/icons/left_arrow.png";
import right_arrow from "../../assets/icons/right_arrow.png";
import { BasketballResultCard } from "./BasketballResultCard";
import teamlogo from "../../assets/teamlogo.png";

export const PRHSAABasketballResult = ({ selectedGender, selectedYear }) => {
  const { teamsData, schedulesData } = PRHSAABasketballStanding_Firestoreoverall();

  const formatDate = (date) => {
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
    };
  };

  const [selectedDay, setSelectedDay] = useState(new Date());
  const [indexDay, setIndexDay] = useState(new Date());
  const [filterOption, setFilterOption] = useState("day");

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

  const getTotalScore = (result) => {
    if (result.Score == null) {
      return [0, 0];
    } else {
      return result.Score.split("-").map(Number);
    }
  };

  const filteredDocuments = schedulesData.filter((result) => {
    const resultDate = new Date(result.Date);
    return (
      result.Gender === selectedGender.charAt(0) && 2000 + Number(result.Date.split("/")[2]) === selectedYear &&
      (filterOption === "all" ||
        (resultDate.getDate() === selectedDay.getDate() &&
          resultDate.getMonth() === selectedDay.getMonth() &&
          resultDate.getFullYear() === selectedDay.getFullYear()))
    );
  });

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex gap-4 mb-4">
        <label>
          <input
            type="radio"
            value="all"
            checked={filterOption === "all"}
            onChange={() => setFilterOption("all")}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="day"
            checked={filterOption === "day"}
            onChange={() => setFilterOption("day")}
          />
          Day
        </label>
      </div>
      {filterOption === "day" && (
        <div>
          <div className="w-full h-[68px] rounded-[10px] border border-[#CFCFCF] mb-[18px] bg-[#F8FAFC] flex justify-between items-center">
            <div
              className="w-[44px] px-[10px] flex cursor-pointer"
              onClick={decrementDay}
            >
              <img
                src={left_arrow}
                className="w-[24px] h-[24px]"
                alt="Previous day"
              />
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
              <img
                src={right_arrow}
                className="w-[24px] h-[24px]"
                alt="Next day"
              />
            </div>
          </div>
          <div className="relative inline-block">
            <DatePicker
              selected={selectedDay}
              onChange={(date) => handleDayClick(date)}
              dateFormat="MMMM d, yyyy"
              className="p-2 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-[20px]">
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
            <BasketballResultCard
              key={index}
              type={result.Type}
              team1={result.TeamA}
              team2={result.TeamB}
              totalScore={getTotalScore(result)}
              team1_logo={teamAImageUrl}
              team2_logo={teamBImageUrl}
              Date={result.Date}
            />
          );
        })}
      </div>
    </div>
  );
};
