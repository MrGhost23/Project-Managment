import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useState } from "react";

export const useDocument = async (c, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  const ref = doc(db, c, id);
  try {
    const snap = await getDoc(ref);
    setDocument(snap.data());
  } catch (err) {
    console.log(err.message);
    setError(err.message);
  }
  return { document, error };
};
