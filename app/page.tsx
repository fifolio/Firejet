"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/backend/config";

export default function Home() {

  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<{ id: string; inputText: string }[]>([]);

  const handleAddItem = async () => {
    await addDoc(collection(db, "items"), { inputText })
    setInputText('');
  };

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, "items"));
      setItems(snapshot.docs.map((doc) => (
        {
          id: doc.id,
          inputText: doc.data().inputText
        }
      )))
    };
    fetchItems();
  }, [])

  return (
    <div className="flex flex-col gap-2 max-w-3xl m-auto">
      <h1 className="mb-8">Welcome to Firejet</h1>

      <div className="flex gap-2">
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter your item..." className="border-2 p-2" />
        <button onClick={handleAddItem} className="border p-2">Add item</button>
      </div>

      <ul>
        {
          items.length > 0 ?
            items.map((item) => (<li key={item.id}>{item.inputText}</li>))
            : <li>No items to display</li>}
      </ul>
    </div>
  );
}