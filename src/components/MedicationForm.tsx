import { useForm } from "react-hook-form";
import { supabase } from "../services/supabaseClient";
import { useEffect, useState } from "react";

type Medication = {
  id?: number;
  name: string;
  dosage: string;
  user_id?: string;
  last_taken?: string;
};

export default function MedicationForm() {
  const { register, handleSubmit, reset } = useForm<Medication>();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id || null);
    };
    fetchUser();
  }, []);

  const onSubmit = async (data: Medication) => {
    if (!userId) return alert("Please log in first!");

    const { error } = await supabase.from("medications").insert({
      ...data,
      user_id: userId,
      taken_today: false,
    });

    if (error) alert("Error: " + error.message);
    else {
      reset();
      alert("Medication added!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 p-4 border rounded"
    >
      <input
        {...register("name")}
        placeholder="Medication Name"
        className="p-2 border rounded w-full"
      />
      <input
        {...register("dosage")}
        placeholder="Dosage (e.g. 1 pill)"
        className="p-2 border rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Medication
      </button>
    </form>
  );
}
