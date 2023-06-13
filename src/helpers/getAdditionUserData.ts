import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { UserAdditionalData } from "../types/UserAdditionalData";

export const getAdditionalUserData = async (uid: string) => {
  const id = doc(db, 'users', uid);

  return getDoc(id).then((doc) => {
     return doc.data() as UserAdditionalData;
  }).catch(error => console.log(error));
};