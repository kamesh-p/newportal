import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [];

function Calender() {
  const router = useRouter();
  const { user, mentor } = router.query;
  console.log("user and mentor:", user, mentor);
  const [newEvent, setNewEvent] = useState({ start: "", end: "", reason: "" });
  const [allEvents, setAllEvents] = useState(events);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if (
        (d1 <= d2 && d2 <= d3) ||
        (d1 <= d4 && d4 <= d3) ||
        (d2 <= d1 && d1 <= d4) ||
        (d2 <= d3 && d3 <= d4)
      ) {
        alert("CLASH: Leave request conflicts with existing events");
        return;
      }
    }

    setAllEvents([
      ...allEvents,
      {
        ...newEvent,
        title: "Leave Request",
      },
    ]);
    setLeaveRequests([...leaveRequests, newEvent]);
  }

  const openLeaveModal = () => {
    setIsLeaveModalOpen(true);
  };

  const handleleave = async (e) => {
    setIsLeaveModalOpen(false);
    e.preventDefault();

    try {
      const response = await fetch("/api/submitLeave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEvent, user, mentor, status: false }),
      });

      if (response.ok) {
        console.log("leave submitted");
      } else {
        console.error("error in submitting");
      }
    } catch (error) {
      console.error("Error submitting leave:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="ml-32 absolute right-5 items-center space-x-4 mb-4">
        <button
          className="bg-red-500 text-white rounded p-2"
          onClick={openLeaveModal}
        >
          Leave
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />

      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <button
              className="relative bg-red-500 p-1 text-white left-80"
              onClick={() => setIsLeaveModalOpen(false)}
            >
              x
            </button>
            <h2 className="text-lg font-bold mb-4">Leave Request</h2>
            <div>
              <label htmlFor="startDate">Start Date:</label>
              <DatePicker
                id="startDate"
                className="border rounded p-2"
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="endDate">End Date:</label>
              <DatePicker
                id="endDate"
                className="border rounded p-2"
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
            </div>
            <div className="mt-2">
              <label htmlFor="leaveReason">Reason for Leave:</label>
              <input
                type="text"
                id="leaveReason"
                className="border rounded p-2 w-full"
                value={newEvent.reason}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, reason: e.target.value })
                }
              />
            </div>
            <button
              className="bg-blue-500 text-white rounded p-2 mt-4"
              onClick={handleleave}
            >
              Submit Leave Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calender;
