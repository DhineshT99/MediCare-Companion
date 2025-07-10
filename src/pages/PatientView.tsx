import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { CalendarView } from "../components/Calendar";
import { CalendarDays, Camera, LogOutIcon } from "lucide-react";
import { CheckIcon } from "../icons/check-icon";
import { ClockIcon } from "../icons/clock-icon";
import { ImageIcon } from "../icons/img-icon";
import { UserIcon } from "../icons/user-icon";
import { useNavigate } from "react-router-dom";
import { UsersIcon } from "../icons/users-icon";
export default function PatientDashboard() {
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [markedTakenDates, setMarkedTakenDates] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [takenDates, setTakenDates] = useState<string[]>([]);
  const [dayStreak, setDayStreak] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [todayStatus, setTodayStatus] = useState(false);
  const [isCaretakerView, setIsCaretakerView] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserName(data?.user?.email || "Patient");
    };
    fetchUser();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [markedTakenDates]);

  const handleMarkAsTaken = () => {
    if (!selectedDay) return;
    const formattedDate = selectedDay.toDateString();
    if (!markedTakenDates.includes(formattedDate)) {
      const updated = [...markedTakenDates, formattedDate];
      setMarkedTakenDates(updated);
      setTakenDates(updated);
    }
  };

  const calculateStats = () => {
    const today = new Date();
    const sortedDates = [...markedTakenDates]
      .map((date) => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    let current = new Date();
    for (let date of sortedDates) {
      if (date.toDateString() === current.toDateString()) {
        streak++;
        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    setDayStreak(streak);

    const isTodayMarked = markedTakenDates.includes(today.toDateString());
    setTodayStatus(isTodayMarked);

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const todayDate = today.getDate();

    const markedThisMonth = markedTakenDates.filter((dateStr) => {
      const date = new Date(dateStr);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear &&
        date.getDate() <= todayDate
      );
    }).length;

    const rate =
      todayDate > 0 ? Math.round((markedThisMonth / todayDate) * 100) : 0;
    setMonthlyRate(rate);
  };

  const isToday = selectedDay?.toDateString() === new Date().toDateString();
  const selectedDateMarked = selectedDay
    ? markedTakenDates.includes(selectedDay.toDateString())
    : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 space-y-6">
      {/* Navbar */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            <div className="text-white font-bold text-lg">M</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">MediCare Companion</h1>
            <p className="text-sm text-gray-500">Patient View</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {" "}
          <button
            onClick={() => navigate("/caretaker")}
            className="border border-gray-300 bg-white px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <UsersIcon className="w-4 h-4" />
            Switch to Caretaker
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-300 bg-white px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <LogOutIcon className="w-4 h-4 text-gray-700" /> Logout
          </button>
        </div>
      </header>

      <section className="bg-gradient-to-r from-emerald-500 to-sky-300 text-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Good Afternoon!</h2>
            <p className="text-white/90 text-lg">
              Ready to stay on track with your medication?
            </p>
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 p-4 flex-start rounded-lg">
            <p className="text-2xl font-bold">{dayStreak}</p>
            <p className="text-sm">Day Streak</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-2xl font-bold">{todayStatus ? "✓" : "○"}</div>
            <p className="text-sm">Today's Status</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-2xl font-bold">{monthlyRate}%</p>
            <p className="text-sm">Monthly Rate</p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="text-blue-600" />
            <h3 className="text-xl font-semibold">
              {isToday
                ? "Today's Medication"
                : `Medication for ${selectedDay?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}`}
            </h3>
          </div>

          {selectedDateMarked ? (
            <>
              <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center mb-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-semibold text-green-700">
                    Medication Completed!
                  </h3>
                  <p className="text-green-700">
                    Great job! You've taken your medication for{" "}
                    {selectedDay?.toLocaleDateString("en-US", {
                      dateStyle: "long",
                    })}
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-green-200 bg-green-50 text-green-900 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold">Daily Medication Set</p>
                    <p className="text-sm">Complete set of daily tablets</p>
                  </div>
                </div>
                <div className="text-sm flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  8:00 AM
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-dashed border-2 border-gray-200 rounded-lg p-8 mt-6 text-center">
                <div className="flex flex-col items-center">
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="preview"
                      className="w-50 h-30 mb-3"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  )}

                  <p className="font-semibold text-gray-700">
                    Add Proof Photo (Optional)
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Take a photo of your medication or pill organizer as
                    confirmation
                  </p>
                  <label
                    htmlFor="photo"
                    className="cursor-pointer bg-white border rounded-md px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
                  >
                    <Camera size={18} /> Take Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    className="hidden"
                    onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              {isToday ? (
                <button
                  onClick={handleMarkAsTaken}
                  className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-medium flex items-center justify-center gap-2"
                >
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Mark as Taken
                </button>
              ) : (
                <div className="mt-6 text-center">
                  <button
                    disabled
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 w-full py-4 text-lg bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Cannot mark future dates
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    You can only mark today's medication as taken
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex justify-end">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition w-90">
            <h3 className="font-semibold text-xl mb-4">Medication Calendar</h3>
            <CalendarView
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              takenDates={takenDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
