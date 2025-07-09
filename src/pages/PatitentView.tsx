import { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { Calendar } from "../components/Calendar";
import { CalendarDays, Camera } from "lucide-react";

export default function PatientDashboard() {
  const [userName, setUserName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [markedTaken, setMarkedTaken] = useState(false);
  const today = new Date().toLocaleDateString("en-US", { dateStyle: "long" });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserName(data?.user?.email || "Patient");
    };
    fetchUser();
  }, []);

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
        <button className="justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:text-accent-foreground h-10 px-4 py-2 flex items-center gap-2 hover:bg-accent transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-users w-4 h-4"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Switch to Caretaker
        </button>
      </header>

      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl p-6 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user w-8 h-8"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Good Afternoon!</h2>
            <p className="text-white/90 text-lg">
              Ready to stay on track with your medication?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/20 p-4 flex-start rounded-lg">
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm">Day Streak</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <div className="text-2xl font-bold">○</div>
            <p className="text-sm">Today's Status</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg">
            <p className="text-2xl font-bold">0%</p>
            <p className="text-sm">Monthly Rate</p>
          </div>
        </div>
      </section>

      {/* Medication + Calendar */}
      <div className="grid md:grid-cols-2 gap-6 justify-between">
        {/* Medication Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="text-blue-600" />
            <h3 className="text-xl font-semibold">Today's Medication</h3>
          </div>

          {/* Medication Set Info */}
          <div className="flex items-center justify-between  p-4 rounded-lg border-gray-50 bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Daily Medication Set
                </p>
                <p className="text-sm text-gray-500">
                  Complete set of daily tablets
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-600">🕗 8:00 AM</div>
          </div>

          {/* Upload Photo */}
          <div className="border-dashed border-2 border-gray-200 rounded-lg p-8 mt-6 text-center">
            <div className="flex flex-col items-center">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="preview"
                  className="w-50 h-30 mb-3"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-image w-12 h-12 text-muted-foreground mx-auto mb-4"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
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

          {/* Mark as Taken */}
          <button
            onClick={() => setMarkedTaken(true)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg font-medium flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check w-5 h-5 mr-2"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Mark as Taken
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white w-100 h-130 rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
          <div></div>
          <h3 className="font-semibold tracking-tight text-xl">
            Medication Calendar
          </h3>
          <Calendar />
        </div>
      </div>
    </div>
  );
}
