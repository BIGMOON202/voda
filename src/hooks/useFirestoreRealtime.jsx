import { useEffect, useState } from "react";
import { db, imageDb } from "../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
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
import { connectStorageEmulator } from "firebase/storage";

const useFirestoreRealtime = (col) => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, col));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setDocs(items);
      },
      (err) => {
        setError(err);
      }
    );

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [col]);

  const updateDocument = async (docId, data) => {
    const documentRef = doc(db, col, docId);
    try {
      await updateDoc(documentRef, data);
    } catch (err) {
      console.error("Error updating document:", err);
      setError(err);
    }
  };

  const deleteDocument = async (docId) => {
    const documentRef = doc(db, col, docId);
    try {
      await deleteDoc(documentRef);
    } catch (err) {
      console.error("Error deleting document:", err);
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

  const addDocument = async (data = {}) => {
    try {
      const docRef = await addDoc(collection(db, col), {
        createdDate: new Date().toISOString(),
        isActive: true,
        ...data,
      });
      return docRef.id;
    } catch (err) {
      console.error("Error adding new document:", err);
      setError(err);
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

  const uploadImage = async (file) => {
    const imgRef = ref(imageDb, `files/${v4()}`);
    try {
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      return url;
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const deleteImage = async (imageUrl) => {
    try {
      // Extract the path from the URL
      console.log(imageUrl);
      const baseUrl =
        "https://firebasestorage.googleapis.com/v0/b/voda-sports.appspot.com/o/";
      const encodedPath = imageUrl.replace(baseUrl, "").split("?")[0];
      const decodedPath = decodeURIComponent(encodedPath);
      console.log("Extracted path:", encodedPath);
      console.log("Decoded path:", decodedPath);

      const storageRef = ref(imageDb, decodedPath);
      console.log("Storage reference:", storageRef.fullPath);
      await deleteObject(storageRef);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return {
    documents: docs,
    error,
    updateDocument,
    deleteDocument,
    addDocument,
    addSubDocument,
    deleteSubDocument,
    uploadImage,
    deleteImage,
  };
};

export { useFirestoreRealtime };
