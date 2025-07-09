import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function Calendar() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const missedDates = [
    new Date(2025, 6, 1),
    new Date(2025, 6, 2),
    new Date(2025, 6, 8),
  ];

  const takenDates = [new Date(2025, 6, 9)];

  return (
    <div className="flex flex-col items-center text-sm text-gray-700">
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={setSelectedDay}
        showOutsideDays
        fromYear={2020}
        toYear={2030}
        modifiers={{
          missed: missedDates,
          taken: takenDates,
        }}
        modifiersClassNames={{
          missed: "bg-red-200 text-red-800",
          taken: "bg-green-200 text-black-800",
          today: "bg-blue-500 text-white",
        }}
        classNames={{
          caption: "flex justify-between items-center mb-2 font-semibold",
          table: "w-full border-spacing-2",
          day_selected: "bg-black-500 text-white",
          day: "rounded-full w-8 h-8 hover:bg-gray-100 transition",
        }}
      />

      <div className="flex-row gap-4 space-y-2 text-sm mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span> Medication
          taken
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full"></span> Missed
          medication
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Today
        </div>
      </div>
    </div>
  );
}
