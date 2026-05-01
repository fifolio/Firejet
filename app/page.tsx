"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/backend/config";

export default function Home() {

  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<{ id: string; inputText: string }[]>([]);

  // Fetch the updated list of items after adding, editing, or deleting an item
  const fetchItems = async () => {
    const snapshot = await getDocs(collection(db, "items"));
    setItems(snapshot.docs.map((doc) => (
      {
        id: doc.id,
        inputText: doc.data().inputText
      }
    )));
  }

  // Function to handle adding a new item to Firestore
  const handleAddItem = async () => {
    await addDoc(collection(db, "items"), { inputText })
    setInputText('');

    // Fetch the updated list of items after adding a new one
    fetchItems();
  };

  // Function to handle item deletion
  const handleDelete = (id: string) => async () => {
    await deleteDoc(doc(db, "items", id));

    // Fetch the updated list of items after deletion
    fetchItems();
  }

  const handleUpdate = (id: string) => async () => {
    await updateDoc(doc(db, "items", id), {
      inputText: inputText
    })

    // Fetch the updated list of items after editing
    fetchItems();
  }


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
            items.map((item) => (
              <div key={item.id}>
                <div className="w-full flex justify-between items-center space-y-4">
                  <li className="my-5">{item.inputText}</li>
                  <button onClick={handleUpdate(item.id)} className="bg-yellow-700 py-1 px-2 rounded-md cursor-pointer">Edit</button>
                  <button onClick={handleDelete(item.id)} className="bg-red-700 py-1 px-2 rounded-md cursor-pointer">Delete</button>
                </div>
              </div>
            ))
            : <li>No items to display</li>
        }
      </ul>
    </div>
  );
}