import React from "react";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";
import { PRHSAAuseFirestoreRealtime } from "../../hooks/PRHSAAuseFirestoreRealtime";

const SoccerScheduleModal = ({
  isOpen,
  onClose,
  children,
  header,
  teamabr,
  teamGender,
  category
}) => {
  let { documents, error } = [];
  if(category == "PRHSAA"){
    ({ documents, error } = PRHSAAuseFirestoreRealtime("PRHSAASoccerSchedules"));
  } else {
    ({ documents, error } = useFirestoreRealtime("SoccerSchedules"))
  }
  const filteredDocuments = documents.filter(
    (doc) =>
      (doc["TeamA"] == teamabr || doc["TeamB"] == teamabr) &&
      doc.Gender == teamGender
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

  const getPenaltyScore = (strScore) => {
    if (strScore == null || strScore == "") {
      return [0, 0];
    } else {
      return strScore.split("-").map(Number);
    }
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
                        <th className="text-center border border-gray-300 w-[300px] text-white/80">
                          Date
                        </th>
                        <th className="text-center border border-gray-300 w-[550px] text-white/80">
                          Matchup
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
                                <div className="w-[250px] flex items-center">
                                  <p className="text-right flex-grow">
                                    {doc["TeamA"]}
                                  </p>
                                </div>
                                <div className="w-[50px] flex items-center justify-center">
                                  <p className="font-bold">VS</p>
                                </div>
                                <div className="w-[250px] flex items-center">
                                  <p className="flex-grow text-left">
                                    {doc["TeamB"]}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="text-center border border-gray-300">
                              {doc.Score == "" || doc.Score == null
                                ? "-"
                                : `(${getPenaltyScore(doc.Penalty)[0]})${
                                    doc.Score
                                  }(${getPenaltyScore(doc.Penalty)[1]})`}
                            </td>
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

export default SoccerScheduleModal;
