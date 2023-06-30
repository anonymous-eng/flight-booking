import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    flight: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
