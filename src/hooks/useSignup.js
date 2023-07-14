import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/config";
import { useAuthContext } from "../context/useAuthContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}.png`;
      const imgRef = ref(storage, uploadPath);
      const snapshot = await uploadBytes(imgRef, thumbnail);

      const photoURL = await getDownloadURL(imgRef);

      // add display name to user
      await updateProfile(user, {
        displayName,
        photoURL,
      });

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        online: true,
        displayName,
        photoURL,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signup, error, isPending };
};
