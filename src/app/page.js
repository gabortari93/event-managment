"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

export default function Home() {
  const [showForm, setShowForm] = useState(true);
  const [activePage, setActivePage] = useState("form"); 

  const togglePage = (page) => {  //page toggle effect
    setActivePage("");
    setTimeout(() => {
      setShowForm(page === "form");
      setActivePage(page);
    }, 300);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center mt-4">
        <button
          className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2 focus:outline-none focus:shadow-outline ${
            activePage === "form" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => togglePage("form")}
        >
          Show Event Form
        </button>
        <button
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2 focus:outline-none focus:shadow-outline ${
            activePage === "list" ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => togglePage("list")}
        >
          Show Event List
        </button>
      </div>
      <div
        className={`transition-opacity duration-300 ${
          activePage === "form" ? "opacity-100" : "opacity-0"
        }`}
      >
        {showForm && <EventForm />}
      </div>
      <div
        className={`transition-opacity duration-300 ${
          activePage === "list" ? "opacity-100" : "opacity-0"
        }`}
      >
        {!showForm && <EventList />}
      </div>
    </main>
  );
}
