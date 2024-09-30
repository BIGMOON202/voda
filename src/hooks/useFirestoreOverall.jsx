import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  deleteDoc,
  setDoc,
  addDoc,
  doc,
  collectionGroup,
  getDocs,
} from "firebase/firestore";

const useFirestoreOverall = () => {
  const [teams, setTeams] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribeTeams = fetchTeams();
    const unsubscribeSchedules = fetchSchedules();

    // Clean up subscriptions on unmount
    return () => {
      unsubscribeTeams();
      unsubscribeSchedules();
    };
  }, []);

  const fetchTeams = () => {
    const q = query(collection(db, "VolleyballTeams"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const teamsData = [];
        querySnapshot.forEach((team) => {
          teamsData.push({ id: team.id, ...team.data() });
        });
        setTeams(teamsData);
      },
      (err) => {
        setError(err);
      }
    );
  };

  const fetchSchedules = () => {
    const q = query(collection(db, "VolleyballSchedules"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const alldocs = querySnapshot.docs.map(it => it.data());
        // console.log('alldocs', alldocs);

        Promise.all(
          alldocs.map((schedule) => {
            return new Promise((resolve) => {
              // Fetch subcollection "volleyballstats"
              fetchVolleyballStats(schedule.id).then((stats) => {
                resolve({
                  ...schedule,
                  volleyballStats: stats
                });
              });
            })
          })
        ).then(schedulesData => {
          setSchedules(schedulesData);
        });

      },
      (err) => {
        setError(err);
      }
    );

    return unsubscribe; // Return the unsubscribe function
  };

  const fetchVolleyballStats = async (scheduleId) => {
    const q = query(
      collection(db, `VolleyballSchedules/${scheduleId}/VolleyballStats`)
    );
    const statsData = [];

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((stat) => {
        statsData.push({ id: stat.id, ...stat.data() });
      });
      return statsData;
    } catch (err) {
      console.error("Error fetching volleyball stats:", err);
      return [];
    }
  };

  const addSubDocument = async (docId, subcollectionData = {}) => {
    try {
      console.log(docId);
      const newCityRef = doc(
        collection(db, "VolleyballSchedules", docId, "VolleyballStats")
      );
      await setDoc(newCityRef, subcollectionData);
      // await setDoc(doc(db, col, docId, 'VolleyballStats', 'randomID-xyz'), {
      //     name: "Los Angeles",
      //     state: "CA",
      //     country: "USA"
      //   });
    } catch (err) {
      console.error("Error adding new document:", err);
      setError(err);
    }
  };

  const deleteSubDocument = async (docId, subDocId) => {
    const documentRef = doc(db, col, docId, "VolleyballStats", subDocId);
    try {
      await deleteDoc(documentRef);
    } catch (err) {
      console.error("Error deleting document:", err);
      setError(err);
    }
  };

  return {
    teamsData: teams,
    schedulesData: schedules,
    error,
    addSubDocument,
    deleteSubDocument,
  };
};

export { useFirestoreOverall };
