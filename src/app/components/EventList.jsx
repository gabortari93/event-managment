import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import socket from "pages/api/socket.js"; // Import socket client

function EventList() {
  const [events, setEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loadedCount, setLoadedCount] = useState(10);

  const fetchEvents = useCallback(async () => {
    try {
      const url =
        statusFilter === "all"
          ? `/api/events?limit=${loadedCount}`
          : `/api/events?status=${statusFilter}&limit=${loadedCount}`;

      console.log("Fetching with URL: ", url);
      const res = await axios.get(url, {
        headers: { "Cache-Control": "no-cache" },
      });

      console.log("Fetched events with filter ", statusFilter, ": ", res.data);
      setEvents(res.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }, [statusFilter, loadedCount]);

  useEffect(() => {
    fetchEvents();

    // listen for a "newEvent" message from the server
    socket.on("newEvent", (data) => {
      console.log("Received new event data:", data);
      fetchEvents(); // refetch events when a new one is added
    });

    return () => {
      socket.off("newEvent");
    };
  }, [fetchEvents]);

  const displayedEvents = events.slice(0, loadedCount);

  const formatDate = (dateString) => {  //sql date time formating
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <select
        className="mb-4 block w-full mt-1 bg-white rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Draft">Draft</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Past">Past</option>
      </select>

      <ul className="space-y-4 relative">
        {displayedEvents.map((event) => (
          <li key={event.id} className="p-4 bg-gray-100 rounded group relative">
            <div className="cursor-pointer">
              {event.title} - {event.status} -{" "}
              {event.date ? formatDate(event.date) : "Draft"}
            </div>
            <div className="group-hover:opacity-50 transition-opacity duration-200 bg-gray-800 px-4 py-2 text-sm text-gray-100 rounded-md absolute top-0 -left-96 ml-5 opacity-0 z-50 flex flex-row items-center justify-start w-72 h-32">
              <img
                src="/avatar.jpg"
                alt="Avatar"
                className="object-cover w-12 h-12 rounded-full"
              />
              <div className="text-white">
                {/* check if 'hosts' exists and is an array with at least one element */}
                <span>
                  {event.hosts && event.hosts.length > 0
                    ? event.hosts[0].name
                      ? event.hosts[0].name
                      : "Unknown host"
                    : "Unknown host"}
                </span>

                <div className="mt-2">
                  {/* Check if 'description' is null or empty, then display default text */}
                  <p>
                    {event.description
                      ? event.description
                      : "There is no description."}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setLoadedCount(loadedCount + 10)}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Load More
      </button>
    </div>
  );
}

export default EventList;
