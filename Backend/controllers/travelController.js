const TravelEntry = require("../models/TravelEntry");
const addData = async (req, res) => {
  try {
    const entry = new TravelEntry({ ...req.body, user: req.user.id });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({message: "Error while adding data" });
  }
};
const getMultipleData = async (req, res) => {
  try {
    const entries = await TravelEntry.find({ user: req.user.id });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Error while fetching data" });
  }
};
const getData = async (req, res) => {
  try {
    const entry = await TravelEntry.findById(req.params.id);
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: "Data not found" });
  }
};
const updatedata = async (req, res) => {
  try {
    const updatedEntry = await TravelEntry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ message: "Error while updating" });
  }
};
const deleteData = async (req, res) => {
  try {
    await TravelEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error while deleting" });
  }
};
module.exports = { addData, getMultipleData, getData, updatedata, deleteData };
