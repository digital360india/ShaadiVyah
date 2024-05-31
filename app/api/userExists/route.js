import { getAuth, getUserByEmail } from "firebase/auth";
import firebaseApp, { db } from "@/firebase/firebase";
const auth = getAuth(firebaseApp);



export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const userRecord = await auth().getUserByEmail(email);
    res.status(200).json({ user: userRecord });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      res.status(200).json({ user: null });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
