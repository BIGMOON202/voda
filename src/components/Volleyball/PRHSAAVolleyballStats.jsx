import React, { useState, useEffect } from "react";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";
import Modal from "../Modal";
import { ViewStatsHeader } from "./ViewStatsHeader";
import { StatsTable } from "../StatsTable";
import { PRHSAAstatsFirestoreOverall } from "../../hooks/PRHSAAstatsFirestoreOverall";

export const PRHSAAVolleyballStats = ({ selectedGender, selectedYear }) => {
  const { volleyballSchedules, volleyballTeams } = PRHSAAstatsFirestoreOverall();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubDocs, setSelectedSubDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState({});

  const filteredDocuments = volleyballSchedules.filter(
    (doc) => doc.Gender === selectedGender.charAt(0) && 2000 + Number(doc.Date.split("/")[2]) === selectedYear
  );
  const sortedDocuments = filteredDocuments.sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateA - dateB;
  });

  function formatDate(inputDate) {
    const [month, day, year] = inputDate.split("/");

    if (!month || !day || !year) {
      return "Invalid date format";
    }

    const dateObj = new Date(`20${year}-${month}-${day}`);

    if (isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const monthName = monthNames[dateObj.getMonth()];

    return `${dayOfWeek}, ${monthName} ${day}`;
  }

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

  const handleViewStats = (doc, filteredSubDocs) => {
    setSelectedDoc(doc);
    setSelectedSubDocs(filteredSubDocs);
    setModalOpen(true);
  };

  const disabledStyles =
    "text-[12px] bg-gray-400 text-gray-500 font-semibold py-1 px-4 rounded shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";
  const enabledStyles =
    "text-[12px] bg-gray-800 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";

  return (
    <div className="flex justify-center pt-[50px]">
      <table className="divide-y divide-gray-200 mt-4 text-black">
        <thead className="bg-gray-500">
          <tr>
            <th className="text-center border border-gray-300 w-[70px] text-white/80">
              No
            </th>
            <th className="text-center border border-gray-300 w-[300px] text-white/80">
              Date
            </th>
            <th className="text-center border border-gray-300 w-[550px] text-white/80">
              Matchup
            </th>
            <th className="text-center border border-gray-300 w-[150px] text-white/80">
              Result
            </th>
            <th className="text-center border border-gray-300 w-[150px] text-white/80">
              Stats
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedDocuments.map((doc, index) => {
            const teamA = volleyballTeams.filter(
              (team) => team.Abbreviation == doc.TeamA
            )[0];
            const teamB = volleyballTeams.filter(
              (team) => team.Abbreviation == doc.TeamB
            )[0];
            const teamAImageUrl = teamA?.imageUrl;
            const teamBImageUrl = teamB?.imageUrl;
            return (
              <tr
                key={doc.id || index}
                className={`${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="border border-gray-300 text-center">
                  {index + 1}
                </td>
                <td className="text-center border border-gray-300">
                  {formatDate(doc.Date)}
                </td>
                <td className="text-center border border-gray-300">
                  <div className="flex justify-center">
                    <div className="w-[250px] flex items-center gap-[10px]">
                      <p className="text-right flex-grow">{doc["TeamA"]}</p>
                      <img
                        className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                        alt="logoA"
                        src={teamAImageUrl}
                      />
                    </div>
                    <div className="w-[50px] flex items-center justify-center">
                      <p className="font-bold">VS</p>
                    </div>
                    <div className="w-[250px] flex items-center gap-[10px]">
                      <img
                        className="w-[24px] h-[24px] flex-shrink-0 rounded-full"
                        alt="logoB"
                        src={teamBImageUrl}
                      />
                      <p className="flex-grow text-left">{doc["TeamB"]}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center border border-gray-300">
                  {calculateResult(doc["Set1"], doc["Set2"], doc["Set3"])}
                </td>
                <td className="text-center border border-gray-300 py-3">
                  <button
                    className={
                      calculateResult(doc["Set1"], doc["Set2"], doc["Set3"]) ==
                        "0-0" || doc.stats.length == 0
                        ? disabledStyles
                        : enabledStyles
                    }
                    title="View match stats"
                    disabled={
                      calculateResult(doc["Set1"], doc["Set2"], doc["Set3"]) ==
                        "0-0" || doc.stats.length == 0
                    }
                    onClick={() => {
                      handleViewStats(doc, doc.stats);
                    }}
                  >
                    View Stats
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={<ViewStatsHeader selectedDoc={selectedDoc} />}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col bg-black">
            <div className="w-full flex justify-center py-2">
              <p className="text-[#94ACC4] text-2xl font-bold">
                {selectedDoc["TeamA"]}
              </p>
            </div>
            <StatsTable
              subDocs={selectedSubDocs.filter(
                (subdoc) => subdoc.School === selectedDoc["TeamA"]
              )}
            />
          </div>

          <div className="flex flex-col bg-black">
            <div className="w-full flex justify-center py-2">
              <p className="text-[#94ACC4] text-2xl font-bold">
                {selectedDoc["TeamB"]}
              </p>
            </div>
            <StatsTable
              subDocs={selectedSubDocs.filter(
                (subdoc) => subdoc.School === selectedDoc["TeamB"]
              )}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
