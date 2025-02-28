import { useState, useContext } from "react";
import { addEntry } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
const TravelForm = ({ refreshEntries }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    location: "",
    date: "",
    description: "",
    imageUrl: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEntry(form, user.token);
      toast.success("Entry added!");
      setForm({ location: "", date: "", description: "", imageUrl: "" }); 
      refreshEntries();
    } catch (error) {
      toast.error("Error adding entry");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Location"
        required
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        type="date"
        required
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <textarea
        placeholder="Description"
        required
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>
      <input
        type="text"
        placeholder="Image URL (Optional)"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};

export default TravelForm;
