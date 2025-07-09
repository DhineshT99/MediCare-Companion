import { useNavigate } from "react-router-dom";
import { User, UserCheck } from "lucide-react";
import IconHeart from "../icons/logo";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
         <IconHeart />
        </div>
        <h1 className="text-4xl font-bold text-blue-800">
          Welcome to MediCare Companion
        </h1>
        <p className="text-gray-700 text-2xl mt-2">
          Your trusted partner in medication management. Choose your role to get
          started with personalized features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Patient Card */}
        <div className="bg-gradient-to-b from-blue-50 via-white to-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4">
              <User className="text-blue-600" size={28} />
            </div>
            <h2 className="text-lg font-bold text-blue-700 mb-2">
              I'm a Patient
            </h2>
            <p className="text-md text-gray-600 mb-4">
              Track your medication schedule and maintain your health records
            </p>
            <ul className="text-sm text-left text-gray-600 list-disc pl-4 space-y-2 mb-4">
              <li>Mark medications as taken</li>
              <li>Upload proof photos (optional)</li>
              <li>View your medication calendar</li>
              <li>Large, easy-to-use interface</li>
            </ul>
            <button
              className="bg-blue-600 text-white px-12 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/patient")}
            >
              Continue as Patient
            </button>
          </div>
        </div>

        {/* Caretaker Card */}
        <div className="bg-gradient-to-b from-green-50 via-white to-white rounded-xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <UserCheck className="text-green-600" size={28} />
            </div>
            <h2 className="text-lg font-bold text-green-700 mb-2">
              I'm a Caretaker
            </h2>
            <p className="text-md text-gray-600 mb-4">
              Monitor and support your loved one's medication adherence
            </p>
            <ul className="text-sm text-left text-gray-600 list-disc pl-4 space-y-2 mb-4">
              <li>Monitor medication compliance</li>
              <li>Set up notification preferences</li>
              <li>View detailed reports</li>
              <li>Receive email alerts</li>
            </ul>
            <button
              className="bg-green-600 text-white px-12 py-2 rounded hover:bg-green-700 transition"
              onClick={() => navigate("/caretaker")}
            >
              Continue as Caretaker
            </button>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mt-8 text-sm">
        You can switch between roles anytime after setup
      </p>
    </div>
  );
}
