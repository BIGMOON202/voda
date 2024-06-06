import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  setDoc,
  doc,
  collectionGroup,
  getDocs,
} from "firebase/firestore";

const statsFirestoreOverall = () => {
  const [volleyballSchedules, setVolleyballSchedules] = useState([]);
  const [basketballSchedules, setBasketballSchedules] = useState([]);
  const [soccerSchedules, setSoccerSchedules] = useState([]);

  const [volleyballTeams, setVolleyballTeams] = useState([]);
  const [basketballTeams, setBasketballTeams] = useState([]);
  const [soccerTeams, setSoccerTeams] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribeVolleyball = fetchVolleyballSchedules();
    const unsubscribeBasketball = fetchBasketballSchedules();
    const unsubscribeSoccer = fetchSoccerSchedules();
    const unsubscribeVolleyballTeams = fetchVolleyballTeams();
    const unsubscribeBasketballTeams = fetchBasketballTeams();
    const unsubscribeSoccerTeams = fetchSoccerTeams();

    // Clean up subscriptions on unmount
    return () => {
      unsubscribeVolleyball();
      unsubscribeBasketball();
      unsubscribeSoccer();
      unsubscribeVolleyballTeams();
      unsubscribeBasketballTeams();
      unsubscribeSoccerTeams();
    };
  }, []);

  const fetchVolleyballTeams = () => {
    const q = query(collection(db, "VolleyballTeams"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const teamsData = [];
        querySnapshot.forEach((team) => {
          teamsData.push({ id: team.id, ...team.data() });
        });
        setVolleyballTeams(teamsData);
      },
      (err) => {
        setError(err);
      }
    );
  };

  const fetchBasketballTeams = () => {
    const q = query(collection(db, "BasketballTeams"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const teamsData = [];
        querySnapshot.forEach((team) => {
          teamsData.push({ id: team.id, ...team.data() });
        });
        setBasketballTeams(teamsData);
      },
      (err) => {
        setError(err);
      }
    );
  };

  const fetchSoccerTeams = () => {
    const q = query(collection(db, "SoccerTeams"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const teamsData = [];
        querySnapshot.forEach((team) => {
          teamsData.push({ id: team.id, ...team.data() });
        });
        setSoccerTeams(teamsData);
      },
      (err) => {
        setError(err);
      }
    );
  };

  const fetchVolleyballSchedules = () => {
    const q = query(collection(db, "VolleyballSchedules"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const schedulesData = [];
        querySnapshot.forEach((schedule) => {
          const scheduleData = { id: schedule.id, ...schedule.data() };
          fetchStats("Volleyball", schedule.id).then((stats) => {
            scheduleData.stats = stats;
            schedulesData.push(scheduleData);
            setVolleyballSchedules(schedulesData);
          });
        });
      },
      setError
    );
  };

  const fetchBasketballSchedules = () => {
    const q = query(collection(db, "BasketballSchedules"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const schedulesData = [];
        querySnapshot.forEach((schedule) => {
          const scheduleData = { id: schedule.id, ...schedule.data() };
          fetchStats("Basketball", schedule.id).then((stats) => {
            scheduleData.stats = stats;
            schedulesData.push(scheduleData);
            setBasketballSchedules(schedulesData);
          });
        });
      },
      setError
    );
  };

  const fetchSoccerSchedules = () => {
    const q = query(collection(db, "SoccerSchedules"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const schedulesData = [];
        querySnapshot.forEach((schedule) => {
          const scheduleData = { id: schedule.id, ...schedule.data() };
          fetchStats("Soccer", schedule.id).then((stats) => {
            scheduleData.stats = stats;
            schedulesData.push(scheduleData);
            setSoccerSchedules(schedulesData);
          });
        });
      },
      setError
    );
  };

  const fetchStats = async (collectionName, scheduleId) => {
    const collectionRef = collection(
      db,
      `${collectionName}Schedules/${scheduleId}/${collectionName}Stats`
    );
    const q = query(collectionRef);

    try {
      const querySnapshot = await onSnapshot(q, (snapshot) => {
        const statsData = [];
        snapshot.forEach((doc) => {
          statsData.push({ id: doc.id, ...doc.data() });
        });
        switch (collectionName) {
          case "Volleyball":
            setVolleyballSchedules((prevState) =>
              prevState.map((schedule) =>
                schedule.id === scheduleId
                  ? { ...schedule, stats: statsData }
                  : schedule
              )
            );
            break;
          case "Basketball":
            setBasketballSchedules((prevState) =>
              prevState.map((schedule) =>
                schedule.id === scheduleId
                  ? { ...schedule, stats: statsData }
                  : schedule
              )
            );
            break;
          case "Soccer":
            setSoccerSchedules((prevState) =>
              prevState.map((schedule) =>
                schedule.id === scheduleId
                  ? { ...schedule, stats: statsData }
                  : schedule
              )
            );
            break;
          default:
            break;
        }
      });
      return () => querySnapshot();
    } catch (err) {
      console.error(`Error fetching ${collectionName} stats:`, err);
      setError(err);
      return () => {}; // Return empty function for unsubscribe
    }
  };

  const addSubDocument = async (
    docId,
    collectionName,
    subcollectionData = {}
  ) => {
    try {
      const newDocRef = doc(
        collection(
          db,
          `${collectionName}Schedules`,
          docId,
          `${collectionName}Stats`
        )
      );
      await setDoc(newDocRef, subcollectionData);
      // Update state based on the collection name
      switch (collectionName) {
        case "Volleyball":
          setVolleyballSchedules((prevState) => [
            ...prevState,
            { id: newDocRef.id, ...subcollectionData },
          ]);
          break;
        case "Basketball":
          setBasketballSchedules((prevState) => [
            ...prevState,
            { id: newDocRef.id, ...subcollectionData },
          ]);
          break;
        case "Soccer":
          setSoccerSchedules((prevState) => [
            ...prevState,
            { id: newDocRef.id, ...subcollectionData },
          ]);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Error adding new document:", err);
      setError(err);
    }
  };

  const deleteSubDocument = async (docId, collectionName, subDocId) => {
    try {
      const documentRef = doc(
        db,
        `${collectionName}Schedules`,
        docId,
        `${collectionName}Stats`,
        subDocId
      );
      await deleteDoc(documentRef);
      // Update state based on the collection name
      switch (collectionName) {
        case "Volleyball":
          setVolleyballSchedules((prevState) =>
            prevState.filter((item) => item.id !== subDocId)
          );
          break;
        case "Basketball":
          setBasketballSchedules((prevState) =>
            prevState.filter((item) => item.id !== subDocId)
          );
          break;
        case "Soccer":
          setSoccerSchedules((prevState) =>
            prevState.filter((item) => item.id !== subDocId)
          );
          break;
        default:
          break;
      }
    } catch (err) {
      console.error("Error deleting document:", err);
      setError(err);
    }
  };

  return {
    volleyballSchedules,
    basketballSchedules,
    soccerSchedules,
    error,
    volleyballTeams,
    basketballTeams,
    soccerTeams,
    addSubDocument,
    deleteSubDocument,
  };
};

export { statsFirestoreOverall };
