import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faEye } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

import Modal from "../components/Modal";
import { StatsTable } from "../components/StatsTable";
import { ViewStatsHeader } from "../components/Volleyball/ViewStatsHeader";

import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { statsFirestoreOverall } from "../hooks/statsFirestoreOverall";
import { StatsTableBasketball } from "../components/StatsTableBasketball";
import { useNavigate } from "react-router-dom";

export const EditStats = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email == "felix@vodastatspr.com") {
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, []);

  const [activeTab, setActiveTab] = useState("Volleyball");
  const [activeGender, setActiveGender] = useState("Men");
  const [subDocs, setSubDocs] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubDocs, setSelectedSubDocs] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [viewSport, setViewSport] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRefsVolleyball = useRef([]);
  const fileInputRefsBasketball = useRef([]);
  const fileInputRefsSoccer = useRef([]);
  let mergedString = activeTab + "Schedules";

  const {
    volleyballSchedules,
    basketballSchedules,
    soccerSchedules,
    error,
    addSubDocument,
    deleteSubDocument,
  } = statsFirestoreOverall();

  const filteredVolleyballData = volleyballSchedules.filter(
    (team) => team.Gender === activeGender.charAt(0)
  );

  const filteredBasketballData = basketballSchedules.filter(
    (team) => team.Gender === activeGender.charAt(0)
  );

  const filteredSoccerData = soccerSchedules.filter(
    (team) => team.Gender === activeGender.charAt(0)
  );

  const sortedVolleyballData = filteredVolleyballData.sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateA - dateB;
  });

  const sortedBasketballData = filteredBasketballData.sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateA - dateB;
  });

  const sortedSoccerData = filteredSoccerData.sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateA - dateB;
  });

  const handleFileUploadVolleyball = async (e, docId, filteredSubDocs) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    const slicedJson = jsonData.slice(2);
    console.log(jsonData);
    const keyMapping_Volleyball = {
      __EMPTY: "Number",
      __EMPTY_1: "Name",
      __EMPTY_2: "School",
      __EMPTY_3: "Points",
      __EMPTY_4: "Serve_Ace",
      __EMPTY_5: "Serve_Errors",
      __EMPTY_6: "Serve_TA",
      __EMPTY_7: "Reception_Errors",
      __EMPTY_8: "Reception_TA",
      __EMPTY_9: "Attacks_Kill",
      __EMPTY_10: "Attacks_Errors",
      __EMPTY_11: "Attacks_TA",
      __EMPTY_12: "Block_Points",
      __EMPTY_13: "Other_Digs",
      __EMPTY_14: "Other_Assists",
    };

    const updatedJson = slicedJson.map((obj) => {
      const updatedObj = {};
      Object.keys(obj).forEach((oldKey) => {
        // Get the corresponding new key name from the mapping or use the old key if not found
        const newKey = keyMapping_Volleyball[oldKey] || oldKey;
        updatedObj[newKey] = obj[oldKey];
      });
      return updatedObj;
    });
    // console.log(docId);
    // await addSubDocument(docId, updatedJson);

    filteredSubDocs.forEach(async (row) => {
      await deleteSubDocument(docId, "Volleyball", row.id);
    });

    updatedJson.forEach(async (row) => {
      await addSubDocument(docId, "Volleyball", row);
    });
  };

  const handleFileUploadBasketball = async (e, docId, filteredSubDocs) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
    console.log(jsonData);

    const keyMapping_Basketball = {
      Number: "Number",
      Name: "Name",
      School: "School",
      MIN: "Min",
      "FG%": "fg",
      "3P%": "threeP",
      "FT%": "ft",
      REB: "Reb",
      AST: "Ast",
      BLK: "blk",
      STL: "stl",
      TO: "TO",
      PTS: "pts",
    };

    const updatedJson = jsonData.map((obj) => {
      const updatedObj = {};
      Object.keys(obj).forEach((oldKey) => {
        // Get the corresponding new key name from the mapping or use the old key if not found
        const newKey = keyMapping_Basketball[oldKey] || oldKey;
        updatedObj[newKey] = obj[oldKey];
      });
      return updatedObj;
    });

    filteredSubDocs.forEach(async (row) => {
      await deleteSubDocument(docId, "Basketball", row.id);
    });

    updatedJson.forEach(async (row) => {
      await addSubDocument(docId, "Basketball", row);
    });
  };

  const formatDate = (inputDate) => {
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

    const result = `${teamASetsWon}-${teamBSetsWon}`;

    return result;
  };
  const disabledStyles =
    "text-[12px] bg-gray-400 text-gray-500 font-semibold py-1 px-4 rounded shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";
  const enabledStyles =
    "text-[12px] bg-gray-800 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";

  const enabledStyles1 =
    "text-[12px] bg-green-800 hover:bg-green-700 text-white font-semibold py-1 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleGenderChange = (gender) => {
    setActiveGender(gender);
  };

  const handleViewStats = (doc, filteredSubDocs, sport) => {
    setViewSport(sport);
    setSelectedDoc(doc);
    setSelectedSubDocs(filteredSubDocs);
    setModalOpen(true); // Open the modal
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        {/* Main tabs */}
        <button
          className={`mr-4 px-4 py-2 border rounded ${
            activeTab === "Volleyball" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleTabChange("Volleyball")}
        >
          Volleyball
        </button>
        <button
          className={`mr-4 px-4 py-2 border rounded ${
            activeTab === "Soccer" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleTabChange("Soccer")}
        >
          Soccer
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            activeTab === "Basketball" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleTabChange("Basketball")}
        >
          Basketball
        </button>
      </div>

      {/* Gender tabs */}
      <div className="flex justify-center mt-4">
        <button
          className={`mr-4 px-4 py-2 border rounded ${
            activeGender === "Men" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleGenderChange("Men")}
        >
          Men
        </button>
        <button
          className={`px-4 py-2 border rounded ${
            activeGender === "Women" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleGenderChange("Women")}
        >
          Women
        </button>
      </div>

      {/* Content based on active tab and gender */}
      {activeTab === "Volleyball" && (
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
                <th className="text-center border border-gray-300 w-[150px] text-white/80">
                  Upload
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedVolleyballData.map((doc, index) => {
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
                        <div className="w-[250px] flex items-center">
                          <p className="text-right flex-grow font-bold">
                            {doc["TeamA"]}
                          </p>
                        </div>
                        <div className="w-[50px] flex items-center justify-center">
                          <p>VS</p>
                        </div>
                        <div className="w-[250px] flex items-center">
                          <p className="flex-grow text-left font-bold">
                            {doc["TeamB"]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center border border-gray-300">
                      {calculateResult(doc["Set1"], doc["Set2"], doc["Set3"])}
                    </td>
                    <td className="text-center border border-gray-300 py-3">
                      <button
                        className={
                          calculateResult(
                            doc["Set1"],
                            doc["Set2"],
                            doc["Set3"]
                          ) == "0-0" || doc.stats.length == 0
                            ? disabledStyles
                            : enabledStyles1
                        }
                        title="View match stats"
                        disabled={
                          calculateResult(
                            doc["Set1"],
                            doc["Set2"],
                            doc["Set3"]
                          ) == "0-0" || doc.stats.length == 0
                        }
                        onClick={() => {
                          handleViewStats(doc, doc.stats, "Volleyball");
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        View Stats
                      </button>
                    </td>
                    <td className="text-center border border-gray-300 py-3">
                      <input
                        type="file"
                        ref={(element) =>
                          (fileInputRefsVolleyball.current[index] = element)
                        }
                        onChange={(e) => {
                          handleFileUploadVolleyball(e, doc.id, doc.stats);
                          e.target.value = null;
                        }} // Pass doc.id to the handleUpload function
                        accept=".xlsx,.xls"
                        style={{ display: "none" }}
                      />
                      <button
                        className={
                          calculateResult(
                            doc["Set1"],
                            doc["Set2"],
                            doc["Set3"]
                          ) == "0-0"
                            ? disabledStyles
                            : enabledStyles
                        }
                        title="Upload match stats"
                        onClick={() =>
                          fileInputRefsVolleyball.current[index].click()
                        }
                        disabled={
                          calculateResult(
                            doc["Set1"],
                            doc["Set2"],
                            doc["Set3"]
                          ) == "0-0"
                        }
                      >
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload Stats
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "Soccer" && (
        <div>
          {activeGender === "men" && (
            <div className="mt-8">{/* Men's Soccer content */}</div>
          )}
          {activeGender === "women" && (
            <div className="mt-8">{/* Women's Soccer content */}</div>
          )}
        </div>
      )}
      {activeTab === "Basketball" && (
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
                <th className="text-center border border-gray-300 w-[150px] text-white/80">
                  Upload
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedBasketballData.map((doc, index) => {
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
                        <div className="w-[250px] flex items-center">
                          <p className="text-right flex-grow font-bold">
                            {doc["TeamA"]}
                          </p>
                        </div>
                        <div className="w-[50px] flex items-center justify-center">
                          <p>VS</p>
                        </div>
                        <div className="w-[250px] flex items-center">
                          <p className="flex-grow text-left font-bold">
                            {doc["TeamB"]}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center border border-gray-300">
                      {doc.Score}
                    </td>
                    <td className="text-center border border-gray-300 py-3">
                      <button
                        className={
                          doc.Score == undefined || doc.stats.length == 0
                            ? disabledStyles
                            : enabledStyles1
                        }
                        title="View match stats"
                        disabled={
                          doc.Score == undefined || doc.stats.length == 0
                        }
                        onClick={() => {
                          handleViewStats(doc, doc.stats, "Basketball");
                        }}
                      >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        View Stats
                      </button>
                    </td>
                    <td className="text-center border border-gray-300 py-3">
                      <input
                        type="file"
                        ref={(element) =>
                          (fileInputRefsBasketball.current[index] = element)
                        }
                        onChange={(e) => {
                          handleFileUploadBasketball(e, doc.id, doc.stats);
                          e.target.value = null;
                        }} // Pass doc.id to the handleUpload function
                        accept=".xlsx,.xls"
                        style={{ display: "none" }}
                      />
                      <button
                        className={
                          doc.Score == undefined
                            ? disabledStyles
                            : enabledStyles
                        }
                        title="Upload match stats"
                        onClick={() =>
                          fileInputRefsBasketball.current[index].click()
                        }
                        disabled={doc.Score == undefined}
                      >
                        <FontAwesomeIcon icon={faUpload} className="mr-2" />
                        Upload Stats
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
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
            {viewSport == "Volleyball" && (
              <StatsTable
                subDocs={selectedSubDocs.filter(
                  (subdoc) => subdoc.School === selectedDoc["TeamA"]
                )}
              />
            )}
            {viewSport == "Basketball" && (
              <StatsTableBasketball
                subDocs={selectedSubDocs.filter(
                  (subdoc) => subdoc.School === selectedDoc["TeamA"]
                )}
              />
            )}
          </div>

          <div className="flex flex-col bg-black">
            <div className="w-full flex justify-center py-2">
              <p className="text-[#94ACC4] text-2xl font-bold">
                {selectedDoc["TeamB"]}
              </p>
            </div>
            {viewSport == "Volleyball" && (
              <StatsTable
                subDocs={selectedSubDocs.filter(
                  (subdoc) => subdoc.School === selectedDoc["TeamB"]
                )}
              />
            )}
            {viewSport == "Basketball" && (
              <StatsTableBasketball
                subDocs={selectedSubDocs.filter(
                  (subdoc) => subdoc.School === selectedDoc["TeamB"]
                )}
              />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
