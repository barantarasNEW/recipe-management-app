import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { UserAdditionalData } from "../types/UserAdditionalData";

export const updateAdditionalUserData = async (uid: string, data: UserAdditionalData) => {
  const ref = doc(db, "users", uid);

  await updateDoc(ref, { ...data });
};