import Head from "next/head";

import { motion } from "framer-motion";
import { db } from "@/firebase/config";
import { FieldValue, getDoc, setDoc, increment } from "firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const handler = async (req, res) => {
	try {
		const clicksDocRef = doc(db, "test", "clicks2");
		const clicksDoc = await getDoc(clicksDocRef);
		console.log(clicksDoc.data());

		res.status(200).json({ message: "OK" });
	} catch (err) {
		console.log(err);
		res.status(200).json({ message: "OK" });
	}
};

export default handler;
