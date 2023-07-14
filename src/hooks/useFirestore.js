import {
  collection,
  addDoc,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useReducer, useState } from "react";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const ref = collection(db, c);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDoc = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDoc });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (id, newData) => {
    const ref = doc(db, c, id);
    try {
      const updatedDocument = await updateDoc(ref, newData);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteDocument = async (id) => {
    const ref = doc(db, c, id);
    try {
      await deleteDoc(ref);
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getDocument = async (c, id) => {
    const ref = doc(db, c, id);
    try {
      const snap = await getDoc(ref);
      console.log(snap.data());
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    response,
  };
};
