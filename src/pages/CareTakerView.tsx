import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  Bell,
  Calendar,
  ChevronDown,
  User,
  LogOutIcon,
  CheckIcon,
  BellIcon,
} from "lucide-react";
import { CalendarView } from "../components/Calendar";
import { CalendarIcon } from "../icons/calendar-icon";
import { AlertIcon } from "../icons/alert-icon";
import { CameraIcon } from "../icons/camera-icon";
import { UsersIcon } from "../icons/users-icon";

export default function CaretakerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    "Overview",
    "Recent Activity",
    "Calendar View",
    "Notifications",
  ];
  const adherenceRate = 85;
  const currentStreak = 5;
  const missed = 3;
  const taken = 4;
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const takenDates = ["2025-07-06", "2025-07-07", "2025-07-09"];

  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [missedMedicationAlertsEnabled, setMissedMedicationAlertsEnabled] =
    useState(true);
  const [alertTime, setAlertTime] = useState("2 hours");
  const [dailyReminderTime, setDailyReminderTime] = useState("20:00");
  const [caretakerEmail, setCaretakerEmail] = useState("caretaker@example.com");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
            {" "}
            <div className="text-white font-bold text-lg">M</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">MediCare Companion</h1>
            <p className="text-sm text-gray-500">Caretaker View</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {" "}
          <button
            onClick={() => navigate("/patient")}
            className="border border-gray-300 bg-white px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <User className="w-4 h-4 text-gray-700" /> Switch to Patient
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
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <UsersIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Caretaker Dashboard</h2>
            <p className="text-white/90">
              Monitoring Eleanor Thompson's medication adherence
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Adherence Rate" value={`${adherenceRate}%`} />
          <StatCard label="Current Streak" value={currentStreak} />
          <StatCard label="Missed This Month" value={missed} />
          <StatCard label="Taken This Week" value={taken} />
        </div>
      </section>

      <div className="flex gap-6 text-sm font-medium bg-[#f3f8fb] rounded-md p-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-2 rounded-md transition duration-200 ${
              activeTab === idx
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-2xl mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gray-700" />
                Today's Status
              </h3>
              <div className="flex justify-between items-center p-4 rounded-md bg-gray-100">
                <div>
                  <p className="font-medium">Daily Medication Set</p>
                  <p className="text-sm text-gray-500">8:00 AM</p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-red-500 text-white font-semibold">
                  Pending
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg  shadow-sm">
              <h3 className="font-semibold text-2xl mb-4">Quick Actions</h3>
              <ul className="space-y-3">
                <QuickAction
                  icon={<Mail size={16} />}
                  label="Send Reminder Email"
                  onClick={() => alert("Message has been sent!")}
                />
                <QuickAction
                  icon={<Bell size={16} />}
                  label="Configure Notifications"
                  onClick={() => setActiveTab(3)}
                />
                <QuickAction
                  icon={<Calendar size={16} />}
                  label="View Full Calendar"
                  onClick={() => setActiveTab(2)}
                />
              </ul>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-2xl">
              Monthly Adherence Progress
            </h3>
            <p className="mb-4 text-lg text-gray-700">
              Overall Progress{" "}
              <span className="float-right font-semibold">
                {adherenceRate}%
              </span>
            </p>
            <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className="absolute top-0 left-0 h-4 bg-gray-900"
                style={{ width: `${adherenceRate}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center text-sm mt-3">
              <div>
                <div className="font-medium text-green-600">22 days</div>
                <div className="text-gray-500">Taken</div>{" "}
              </div>
              <div>
                <div className="font-medium text-red-600">3 days</div>
                <div className="text-gray-500">Missed</div>
              </div>
              <div>
                <div className="font-medium text-blue-600">5 days</div>
                <div className="text-gray-500">Remaining</div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 1 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-2xl mb-4">
            Recent Medication Activity
          </h3>
          <ul className="space-y-4">
            {[
              {
                date: "Monday, June 10",
                time: "8:30 AM",
                status: "Completed",
                withPhoto: true,
              },
              {
                date: "Sunday, June 9",
                time: "8:15 AM",
                status: "Completed",
                withPhoto: false,
              },
              {
                date: "Saturday, June 8",
                time: null,
                status: "Missed",
                withPhoto: false,
              },
              {
                date: "Friday, June 7",
                time: "8:45 AM",
                status: "Completed",
                withPhoto: true,
              },
              {
                date: "Thursday, June 6",
                time: "8:20 AM",
                status: "Completed",
                withPhoto: false,
              },
            ].map((entry, i) => (
              <li
                key={i}
                className={`flex items-center p-4 rounded-lg border ${
                  entry.status === "Missed"
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="mr-4">
                  {" "}
                  {entry.status === "Missed" ? (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100">
                      <AlertIcon className="w-5 h-5 text-red-600" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100">
                      <CheckIcon className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  {" "}
                  <p className="font-semibold text-lg">{entry.date}</p>{" "}
                  <p className="text-gray-500 text-sm">
                    {entry.status === "Missed"
                      ? "Medication missed"
                      : `Taken at ${entry.time}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {" "}
                  {entry.withPhoto && (
                    <div className="inline-flex items-center  gap-2 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground bg-gray-100 text-gray-700">
                      {" "}
                      <CameraIcon className="w-4 h-4 text-gray-700" />
                      Photo
                    </div>
                  )}
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                      entry.status === "Missed"
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {entry.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === 2 && (
        <div className="bg-white p-6 rounded-lg  shadow-sm flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <h3 className="font-semibold text-2xl mb-6">
              Medication Calendar Overview
            </h3>
            <CalendarView
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              takenDates={takenDates}
            />
          </div>

          <div className="w-full ">
            <h4 className="font-semibold text-xl mb-2 mt-6">
              Details for{" "}
              {selectedDay
                ? selectedDay.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "a selected date"}
            </h4>{" "}
            {selectedDay?.toDateString() === new Date().toDateString() ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-md text-sm flex items-start gap-3">
                <span
                  className="mt-1"
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-clock w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
                  }}
                />
                <div>
                  <p className="font-semibold mb-1">Today</p>
                  <p>Monitor Eleanor Thompson's medication status for today.</p>
                </div>
              </div>
            ) : selectedDay && selectedDay > new Date() ? (
              <div className="bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-md text-sm flex items-start gap-3">
                <span
                  className="mt-1"
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-calendar w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>`,
                  }}
                />
                <div>
                  <p className="font-semibold mb-1">Future Date</p>
                  <p>This date is in the future.</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {activeTab === 3 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-2xl mb-4 flex items-center gap-2">
              {" "}
              <BellIcon className="w-6 h-6 text-gray-700" />
              Notification Preferences
            </h3>

            <div className="pb-4 border-b border-gray-200 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">
                    Receive medication alerts via email
                  </p>
                </div>
                <ToggleSwitch
                  enabled={emailNotificationsEnabled}
                  setEnabled={setEmailNotificationsEnabled}
                />
              </div>
              {emailNotificationsEnabled && (
                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email-address"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={caretakerEmail}
                    onChange={(e) => setCaretakerEmail(e.target.value)}
                    placeholder="caretaker@example.com"
                  />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium">Missed Medication Alerts</p>
                  <p className="text-sm text-gray-500">
                    Get notified when medication is not taken on time
                  </p>
                </div>
                <ToggleSwitch
                  enabled={missedMedicationAlertsEnabled}
                  setEnabled={setMissedMedicationAlertsEnabled}
                />
              </div>
              {missedMedicationAlertsEnabled && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="alert-within"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Alert me if medication isn't taken within
                    </label>
                    <Dropdown
                      options={["1 hour", "2 hours", "3 hours", "4 hours"]}
                      selected={alertTime}
                      onSelect={setAlertTime}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="daily-reminder-time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Daily reminder time
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="daily-reminder-time"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={dailyReminderTime}
                        onChange={(e) => setDailyReminderTime(e.target.value)}
                        placeholder="HH:MM"
                      />
                      <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-clock"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Time to check if today's medication was taken
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold  text-2xl mb-4 flex items-center gap-2">
              <Mail size={18} /> Email Preview
            </h3>
            <div className="bg-gray-50 border text-gray-600 p-4 rounded-md text-sm space-y-2">
              {" "}
              <p className="font-semibold">
                Subject: Medication Alert - Eleanor Thompson
              </p>
              <p>Hello,</p>
              <p>
                This is a reminder that Eleanor Thompson has not taken her
                medication today. Please check with her to ensure she takes her
                prescribed medication.
              </p>
              <p>Current adherence rate: 85% (5-day streak)</p>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-green-700 transition duration-200">
              Save Notification Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/20 p-4 rounded-lg text-white shadow-sm">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm">{label}</p>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-4 py-2 w-full rounded-md transparent text-left hover:bg-gray-50"
      >
        {icon}
        {label}
      </button>
    </li>
  );
}
function ToggleSwitch({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}) {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
        enabled ? "bg-gray-950" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Dropdown({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block w-full text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected}
          <ChevronDown size={16} />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${option}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
