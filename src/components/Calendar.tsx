import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import './Calendar';

type CalendarProps = {
  selectedDay: Date | undefined;
  setSelectedDay: (day: Date | undefined) => void;
  takenDates: string[];
};

export function CalendarView({
  selectedDay,
  setSelectedDay,
  takenDates,
}: CalendarProps) {
  const missedDates = [
    new Date(2025, 6, 1),
    new Date(2025, 6, 2),
    new Date(2025, 6, 8),
  ];

  const takenDateObjects = takenDates.map((str) => new Date(str));

  const monthCaptionStyle = {
    marginTop: "12px",
  };

  return (
    <div className="flex flex-col items-start text-sm text-gray-700">
   <div className="calendar-container"> <DayPicker
        mode="single"
        navLayout="around"
        selected={selectedDay}
        onSelect={setSelectedDay}
        showOutsideDays
        modifiers={{
          missed: missedDates,
          taken: takenDateObjects,
        }}
        modifiersClassNames={{
          missed: "bg-red-200 text-red-800",
          taken: "bg-green-200 text-black-800",
          today: "bg-blue-500 text-white",
        }}
        classNames={{
          caption: "relative flex justify-center items-center font-semibold mb-2",
          caption_label: "text-base font-medium",
           nav: "absolute inset-0 flex justify-between items-center px-2",
  nav_button: "rounded-md border p-1 bg-white hover:bg-gray-100 text-gray-500 shadow", // 👈 changed to gray
          nav_button_previous: "",
          nav_button_next: "",
          table: "w-full border-spacing-2",
          head_row: "flex",
          row: "flex",
          head_cell: "w-8 h-8 font-medium text-gray-500",
          cell: "w-8 h-8 text-center",
          day: "rounded-full w-8 h-8 hover:bg-gray-100 transition",
          day_selected: "bg-black text-white",
        }}
        styles={{
          month_caption: monthCaptionStyle,
        }}
      /></div>

      <div className="flex flex-col items-start gap-2 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full" />
          Medication taken
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          Missed medication
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full" />
          Today
        </div>
      </div>
    </div>
  );
}
