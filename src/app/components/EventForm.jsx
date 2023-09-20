import React, { useState, useEffect } from "react";
import socket from "pages/api/socket.js";
import axios from "axios";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [hostName, setHostName] = useState("");
  const [eventHosts, setEventHosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupClass, setPopupClass] = useState("popup-animation");

  useEffect(() => {  // popup effect assync function
    if (showPopup) {
      // start with 0 opacity
      setPopupClass("popup-animation fade-in");

      // fade in to 100% opacity over 1 second
      setTimeout(() => {
        setPopupClass("popup-animation fade-in show");
      }, 0);

      // hold at 100% opacity for 1 second
      setTimeout(() => {
        setPopupClass("popup-animation show");
      }, 1000);

      // fade out to 0% opacity over 1 second
      setTimeout(() => {
        setPopupClass("popup-animation fade-out");
      }, 2000);

      // remove popup after total 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, [showPopup]);

  const handleSaveEvent = async () => {
    if (!eventName.trim()) {
      return;
    }

    try {
      const newHost = { name: hostName, avatar: "avatar_url" };
      const updatedHosts = [...eventHosts, newHost];

      await axios.post("/api/events", {
        title: eventName,
        date: eventDate,
        description: eventDescription,
        hosts: updatedHosts,
      });

      setEventName("");
      setEventDate("");
      setHostName("");
      setEventDescription("");

      socket.emit("createEvent", { title: eventName, date: eventDate });
    } catch (error) {
      console.error("Failed to save event:", error);
    }
    setShowPopup(true); //popup function 
  };

  return (
    <>
      {showPopup && (
        <div className={popupClass}>
          <span className="text-green-500">{`${eventName} created`}</span>
        </div>
      )}

      <form className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eventName"
          >
            Event Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="Event Name"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eventDate"
          >
            Event Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            placeholder="Event Date"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="eventDescription"
          >
            Event Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hostName"
          >
            Host Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hostName"
            type="text"
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            placeholder="Host Name"
          />
        </div>
        <button
          type="button"
          onClick={handleSaveEvent}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Event
        </button>
      </form>
    </>
  );
};

export default EventForm;
