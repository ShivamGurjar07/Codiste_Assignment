import { useEffect, useState, useContext } from "react";
import { fetchEntries, deleteEntry } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import TravelForm from "./TravelForm";
import EditTravelForm from "./EditTravelForm";

const TravelList = () => {
  const { user } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState(null);

  const loadEntries = async () => {
    if (!user) return;
    try {
      const { data } = await fetchEntries(user.token);
      setEntries(data || []);
    } catch (error) {
      toast.error("Error fetching entries");
      setEntries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEntry(id, user.token);
      toast.success("Entry deleted!");
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      toast.error("Error deleting entry");
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry); 
  };

  const handleEditSuccess = (updatedEntry) => {
    setEntries(
      entries.map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry))
    );
    setEditingEntry(null);
  };

  useEffect(() => {
    if (user) loadEntries();
  }, [user]);

  return (
    <div className="travel_list">
      <TravelForm refreshEntries={loadEntries} />
      <h2 className="h1">My Travel Entries</h2>

      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length > 0 ? (
        <div className="travel-grid">
          {entries.map((entry) => (
            <div key={entry._id} className="travel-card">
              {entry.imageUrl && (
                <img src={entry.imageUrl} alt="travel" className="travel-image" />
              )}
              <div className="travel-content">
                <h3>{entry.location}</h3>
                <p className="travel-date">{new Date(entry.date).toDateString()}</p>
                <p>{entry.description}</p>
              </div>
              <div className="button-group">
                <button className="edit-button" onClick={() => handleEdit(entry)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(entry._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No travel entries found.</p>
      )}

      {editingEntry && (
        <EditTravelForm
          entry={editingEntry}
          onClose={() => setEditingEntry(null)}
          onUpdate={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default TravelList;
