import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

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

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function CalenderLeave() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [allEvents, setAllEvents] = useState(events);
  const [leave, setLeave] = useState(false);
  const [datePickerDisabledDates, setDatePickerDisabledDates] = useState([]);

  useEffect(() => {
    const existingLeaveDates = allEvents.map((event) => [
      event.start,
      event.end,
    ]);

    setDatePickerDisabledDates(existingLeaveDates.flat());
  }, [leave, allEvents]);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }

    setAllEvents([...allEvents, newEvent]);
    setLeave(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(),
    });
  }

  return (
    <div className="container mx-auto p-8">
      <div className="ml-32 flex items-center space-x-4 mb-4">
        <button
          onClick={() => setLeave(true)}
          className="bg-red-500 text-white rounded p-2"
        >
          Leave
        </button>
      </div>

      {leave && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75 blur"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Leave</p>
                <button
                  className="modal-close cursor-pointer z-50"
                  onClick={() => setLeave(false)}
                >
                  <span className="text-3xl">×</span>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <DatePicker
                  selected={newEvent.start}
                  onChange={(date) =>
                    setNewEvent({ ...newEvent, start: date })
                  }
                  excludeDates={datePickerDisabledDates}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <DatePicker
                  selected={newEvent.end}
                  onChange={(date) => setNewEvent({ ...newEvent, end: date })}
                  excludeDates={datePickerDisabledDates}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleAddEvent}
                className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700"
              >
                Add Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default CalenderLeave;
