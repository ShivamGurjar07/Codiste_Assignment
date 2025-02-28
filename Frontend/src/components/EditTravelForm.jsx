import { useState, useContext } from "react";
import { updateEntry } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const EditTravelForm = ({ entry, onClose, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    location: entry.location,
    date: entry.date.split("T")[0], 
    description: entry.description,
    imageUrl: entry.imageUrl,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateEntry(entry._id, form, user.token);
      toast.success("Entry updated!");
      onUpdate(data);
    } catch (error) {
      toast.error("Error updating entry");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Entry</h2>
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
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <div className="modal-buttons">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTravelForm;
