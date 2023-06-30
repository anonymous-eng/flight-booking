import Note from "../models/noteModel.js";
import asyncHandler from "express-async-handler";

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

const searchNotes = asyncHandler(async (req, res) => {
  const {date} = req.body;

  const notes = await Note.find({ "date": { "$gt": ISODate("date") } });
  
  if (notes) {
    res.json(notes);
  } else {
    res.status(404).json({ message: "Flights not found" });
  }
});


const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Flight not found" });
  }
});

const CreateNote = asyncHandler(async (req, res) => {
  const { flight, date, seats } = req.body;
  
  if (!flight || !date || !seats) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const note = new Note({ flight, date, seats });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});


const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note) {
    await note.remove();
    res.json({ message: "Flight Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});


const UpdateNote = asyncHandler(async (req, res) => {

  const note = await Note.findById(req.params.id);

  if (note) {
    var count = note.seats;
    count = count - 1;
    note.seats = count;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

export { getNoteById, getNotes, CreateNote, DeleteNote, UpdateNote, searchNotes };
