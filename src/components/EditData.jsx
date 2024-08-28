import React, { useState, useEffect, useRef } from "react";
import { useFirestoreRealtime } from "../hooks/useFirestoreRealtime";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faUpload,
  faEdit,
  faTrashAlt,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

const fields = {
  Volleyball: {
    Teams: ["Gender", "TeamName", "Abbreviation"],
    Players: [
      "Gender",
      "TeamName",
      "Name",
      "LastName",
      "Number",
      "Position",
      "Height",
      "Grade",
    ],
    Schedules: [
      "Gender",
      "Date",
      "Type",
      "TeamA",
      "TeamB",
      "Set1",
      "Set2",
      "Set3",
      "Location"
    ],
  },
  Basketball: {
    Teams: ["Gender", "TeamName", "Abbreviation"],
    Players: [
      "Gender",
      "TeamName",
      "Name",
      "LastName",
      "Number",
      "Position",
      "Height",
      "Grade",
    ],
    Schedules: ["Gender", "Date", "Type", "TeamA", "TeamB", "Score"],
  },
  Soccer: {
    Teams: ["Gender", "TeamName", "Abbreviation"],
    Players: [
      "Gender",
      "TeamName",
      "Name",
      "LastName",
      "Number",
      "Position",
      "Height",
      "Grade",
    ],
    Schedules: ["Gender", "Date", "Type", "TeamA", "TeamB", "Score", "Penalty"],
  },
  PRHSAAVolleyball: {
    Teams: ["Gender", "TeamName", "Abbreviation"],
    Players: [
      "Gender",
      "TeamName",
      "Name",
      "LastName",
      "Number",
      "Position",
      "Height",
      "Grade",
    ],
    Schedules: [
      "Gender",
      "Date",
      "Type",
      "TeamA",
      "TeamB",
      "Set1",
      "Set2",
      "Set3",
      "Location"
    ],
  },
  PRHSAABasketball: {
    Teams: ["Gender", "TeamName", "Abbreviation"],
    Players: [
      "Gender",
      "TeamName",
      "Name",
      "LastName",
      "Number",
      "Position",
      "Height",
      "Grade",
    ],
    Schedules: ["Gender", "Date", "Type", "TeamA", "TeamB", "Score"],
  },
  PRHSAASoccer: {
    Teams: ["Gender", "TeamName", "Abbreviation"],
    Players: [
      "Gender",
      "TeamName",
      "Name",
      "LastName",
      "Number",
      "Position",
      "Height",
      "Grade",
    ],
    Schedules: ["Gender", "Date", "Type", "TeamA", "TeamB", "Score", "Penalty"],
  },
};

export const EditData = ({ activeSport, selectedCategory }) => {
  const inputImageRef = useRef(null);
  const fileInputRef = useRef(null);
  const selectedDocRef = useRef(null);

  let mergedString = activeSport + selectedCategory;
  const {
    documents: initialDocuments,
    error,
    updateDocument,
    deleteDocument,
    addDocument,
    uploadImage,
    deleteImage,
  } = useFirestoreRealtime(mergedString);
  const [documents, setDocuments] = useState([]);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setDocuments(initialDocuments);
  }, [initialDocuments]);

  const isEqual = (obj1, obj2) => {
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of keys is different
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Check if all keys and their values are the same
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  const handleEdit = (index) => {
    setEditRowIndex(index);
  };

  const handleSave = (index) => {
    updateDocument(documents[index].id, documents[index]);
    setEditRowIndex(null);
  };

  const handleRemove = async (index) => {
    if (documents[index] && documents[index].id) {
      await deleteDocument(documents[index].id);
      const updatedDocuments = documents.filter((_, idx) => idx !== index);
      setDocuments(updatedDocuments);
    }
  };

  const handleAddEmptyDocument = async () => {
    const newDocId = await addDocument();
    console.log("Added new empty document with ID:", newDocId);
  };

  const handleChange = (index, field, value) => {
    const newDocuments = [...documents];
    newDocuments[index][field] = value;
    setDocuments(newDocuments);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    // documents.forEach((doc) => {
    //   deleteDocument(doc.id);
    // });

    json.forEach(async (row) => {
      let filteredDoc = [];
      if (mergedString == "VolleyballSchedules" || mergedString == "PRHSAAVolleyballSchedules") {
        filteredDoc = documents.filter((doc) => {
          return (doc.Gender =
            row.Gender &&
            doc.Date == row.Date &&
            doc.TeamA == row.TeamA &&
            doc.TeamB == row.TeamB &&
            doc.Type == row.Type &&
            doc.Set1 == row.Set1 &&
            doc.Set2 == row.Set2 &&
            doc.Set3 == row.Set3);
        });
      } else if (mergedString == "SoccerSchedules" || mergedString == "PRHSAASoccerSchedules") {
        filteredDoc = documents.filter((doc) => {
          return (doc.Gender =
            row.Gender &&
            doc.Date == row.Date &&
            doc.TeamA == row.TeamA &&
            doc.TeamB == row.TeamB &&
            doc.Type == row.Type &&
            doc.Score == row.Score &&
            doc.Penalty == row.Penalty);
        });
      } else if (mergedString == "BasketballSchedules" || mergedString == "PRHSAABasketballSchedules") {
        filteredDoc = documents.filter((doc) => {
          return (doc.Gender =
            row.Gender &&
            doc.Date == row.Date &&
            doc.TeamA == row.TeamA &&
            doc.TeamB == row.TeamB &&
            doc.Type == row.Type &&
            doc.Score == row.Score);
        });
      } else if (selectedCategory == "Teams") {
        filteredDoc = documents.filter((doc) => {
          return (doc.Gender =
            row.Gender &&
            doc.TeamName == row.TeamName &&
            doc.Abbreviation == row.Abbreviation);
        });
      } else if (selectedCategory == "Players") {
        filteredDoc = documents.filter((doc) => {
          return (doc.Gender =
            row.Gender &&
            doc.TeamName == row.TeamName &&
            doc.Name == row.Name &&
            doc.LastName == row.LastName &&
            doc.Number == row.Number &&
            doc.Position == row.Position &&
            doc.Height == row.Height &&
            doc.Grade == row.Grade);
        });
      }

      if (filteredDoc.length > 0) {
        console.log("same");
      } else {
        await addDocument(row);
      }
    });

    fileInputRef.current.value = "";
  };

  const onUploadImageClicked = (doc) => {
    selectedDocRef.current = doc;
    inputImageRef.current.click();
  };

  const onImageChange = async (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      const doc = selectedDocRef.current;
      console.log(doc);
      // if (doc.imageUrl != null) {
      //   await deleteImage(doc.imageUrl);
      // }
      const imgUrl = await uploadImage(file);
      doc["imageUrl"] = imgUrl;
      updateDocument(doc.id, doc);
      inputImageRef.current.value = "";

      // axios
      // file, docid
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col flex-grow bg-white p-5 gap-2">
      <div className="flex gap-[10px] text-black font-semibold">
        <p>{activeSport}</p>
        <p>/</p>
        <p>{selectedCategory}</p>
        <p>{documents.length}</p>
      </div>

      <div className="flex justify-between p-2">
        <div className="flex gap-2">
          <span className="text-black">{fileName}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
            onClick={handleAddEmptyDocument}
            title="Add a new row"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Row
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
            accept=".xlsx, .xls"
          />
          <button
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            title="Upload data from an Excel file"
            onClick={() => fileInputRef.current.click()}
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" />
            Upload Excel
          </button>
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200 mt-4 text-black">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left pl-2 border border-gray-300">No</th>
            {fields[activeSport][selectedCategory].map((field, index) => (
              <th key={index} className="text-left border border-gray-300">
                {field}
              </th>
            ))}
            {selectedCategory == "Teams" && (
              <th className="w-40 text-center border border-gray-300">Logo</th>
            )}
            <th className="w-60 text-center border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documents.map((doc, index) => (
            <tr
              key={doc.id || index}
              className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="pl-2 border border-gray-300">{index + 1}</td>
              {fields[activeSport][selectedCategory].map((field, idx) => (
                <td key={idx} className="text-left border border-gray-300">
                  {editRowIndex === index ? (
                    <input
                      type="text"
                      value={doc[field] || ""}
                      onChange={(e) =>
                        handleChange(index, field, e.target.value)
                      }
                      className="w-full px-2 py-1"
                    />
                  ) : (
                    doc[field] || "—"
                  )}
                </td>
              ))}
              {selectedCategory == "Teams" && (
                <td className="text-center border border-gray-300 flex justify-between px-2 items-center">
                  {doc.imageUrl ? (
                    <img className="w-10 h-10" src={doc.imageUrl} />
                  ) : (
                    <img className="w-10 h-10" />
                  )}
                  <button
                    onClick={() => onUploadImageClicked(doc)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out focus:outline-none focus:ring text-[14px] focus:ring-blue-300"
                  >
                    Upload
                  </button>
                </td>
              )}
              <td className="text-center border border-gray-300">
                {editRowIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out focus:outline-none focus:ring text-[14px] focus:ring-blue-300"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(index)}
                      disabled={editRowIndex !== null && editRowIndex !== index}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out focus:outline-none focus:ring text-[14px] focus:ring-green-300 mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} className="mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      disabled={editRowIndex !== null && editRowIndex !== index}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out focus:outline-none focus:ring focus:ring-red-300 text-[14px]"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
                      Remove
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <input
        name="logo_image"
        type="file"
        accept="image/*"
        hidden
        ref={inputImageRef}
        onChange={onImageChange}
      />
    </div>
  );
};
