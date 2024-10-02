import React from "react";
import { useFirestoreRealtime } from "../hooks/useFirestoreRealtime";
import { PRHSAAuseFirestoreRealtime } from "../hooks/PRHSAAuseFirestoreRealtime";

const ScheduleModal = ({ isOpen, onClose, children, header, teamabr, selectedGender, selectedYear, selectedCategory }) => {
  let { documents, error } = [];
  let col = '';
  // if(category == "PRHSAA"){
  //   ({ documents, error } = PRHSAAuseFirestoreRealtime("PRHSAAVolleyballSchedules"));
  // } else {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   ({ documents, error } = useFirestoreRealtime("VolleyballSchedules"));
  // }
  if(selectedCategory){
    col = selectedCategory + "VolleyballSchedules";
  } else {
    col = "VolleyballSchedules";
  }

    ({ documents, error } = useFirestoreRealtime(col));

  console.log(documents);
  
  
  const filteredDocuments = documents.filter(
    (doc) => (doc["TeamA"] == teamabr || doc["TeamB"] == teamabr) && doc["Gender"] === selectedGender.charAt(0) && 2000 + Number(doc.Date.split("/")[2]) === selectedYear
  );

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

  const disabledStyles =
    "text-[12px] bg-gray-400 text-gray-500 font-semibold py-1 px-4 rounded shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";
  const enabledStyles =
    "text-[12px] bg-gray-800 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50";

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
            {/* Overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal content */}
            <div className="align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[90%] h-[80vh] flex flex-col">
              {/* Modal header */}
              <div className="p-6 bg-gray-100">{header}</div>
              <div
                className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-auto"
                style={{ maxHeight: "70vh", flex: "1 1 auto" }}
              >
                <div className="flex justify-center">
                  <table className="divide-y divide-gray-200 mt-4 text-black">
                    <thead className="bg-gray-500">
                      <tr>
                        <th className="text-center border border-gray-300 w-[70px] text-white/80">
                          No
                        </th>
                        <th className="text-center border border-gray-300 w-[200px] text-white/80">
                          Date
                        </th>
                        <th className="text-center border border-gray-300 w-[450px] text-white/80">
                          Matchup
                        </th>
                        <th className="text-center border border-gray-300 w-[200px] text-white/80">
                          Location
                        </th>
                        <th className="text-center border border-gray-300 w-[150px] text-white/80">
                          Result
                        </th>
                        {/* <th className="text-center border border-gray-300 w-[150px] text-white/80">
                          Stats
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredDocuments.map((doc, index) => {
                        // const filteredSubDocs = subDocs.filter(
                        //   (subdoc) => subdoc.parentId == doc.id
                        // );
                        return (
                          <tr
                            key={doc.id || index}
                            className={`${
                              index % 2 === 1 ? "bg-gray-50" : "bg-white"
                            }`}
                          >
                            <td className="border border-gray-300 text-center">
                              {index + 1}
                            </td>
                            <td className="text-center border border-gray-300">
                              {formatDate(doc.Date)}
                            </td>
                            <td className="text-center border border-gray-300">
                              <div className="flex justify-center">
                                <div className="w-[200px] flex items-center">
                                  <p className="text-right flex-grow">
                                    {doc["TeamA"]}
                                  </p>
                                </div>
                                <div className="w-[50px] flex items-center justify-center">
                                  <p className="font-bold">VS</p>
                                </div>
                                <div className="w-[200px] flex items-center">
                                  <p className="flex-grow text-left">
                                    {doc["TeamB"]}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center border border-gray-300">
                              {doc["Location"]}
                            </td>
                            <td className="text-center border border-gray-300">
                              {calculateResult(
                                doc["Set1"],
                                doc["Set2"],
                                doc["Set3"]
                              )}
                            </td>
                            {/* <td className="text-center border border-gray-300 py-3">
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
                                title="View match stats"
                                disabled={
                                  calculateResult(
                                    doc["Set1"],
                                    doc["Set2"],
                                    doc["Set3"]
                                  ) == "0-0"
                                }
                              >
                                View Stats
                              </button>
                            </td> */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal footer */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={onClose}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleModal;
