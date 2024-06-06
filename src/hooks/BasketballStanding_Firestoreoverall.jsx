import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, onSnapshot, query } from "firebase/firestore";

const BasketballStanding_Firestoreoverall = () => {
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
    const q = query(collection(db, "BasketballTeams"));
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
    const q = query(collection(db, "BasketballSchedules"));
    return onSnapshot(
      q,
      (querySnapshot) => {
        const schedulesData = [];
        querySnapshot.forEach((schedule) => {
          schedulesData.push({ id: schedule.id, ...schedule.data() });
        });
        setSchedules(schedulesData);
      },
      (err) => {
        setError(err);
      }
    );
  };

  return { teamsData: teams, schedulesData: schedules, error };
};

export { BasketballStanding_Firestoreoverall };
