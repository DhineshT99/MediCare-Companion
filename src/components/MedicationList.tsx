import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export default function MedicationList() {
  const [meds, setMeds] = useState<any[]>([]);

  const fetchMeds = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) return;

    const { data, error } = await supabase
      .from("medications")
      .select("*")
      .eq("user_id", userId);

    if (!error) setMeds(data || []);
  };

  const markAsTaken = async (id: number) => {
    await supabase
      .from("medications")
      .update({
        taken_today: true,
        last_taken: new Date().toISOString(),
      })
      .eq("id", id);

    fetchMeds(); // refresh list
  };

  useEffect(() => {
    fetchMeds();
  }, []);

  return (
    <div className="p-4 space-y-2">
      {meds.map((med) => (
        <div key={med.id} className="border p-3 rounded shadow">
          <p><strong>{med.name}</strong> - {med.dosage}</p>
          <p>Status: {med.taken_today ? "✅ Taken Today" : "❌ Not Taken"}</p>
          {!med.taken_today && (
            <button
              onClick={() => markAsTaken(med.id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark as Taken
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
