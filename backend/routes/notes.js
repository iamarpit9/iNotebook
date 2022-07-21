const express = require("express");
const router = express.Router();
const getUser = require("../Middleware/getUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator"); // express-validator

// ROUTE1: Fetch all notes of user using: GET "api/notes/createuser" Login required

router.get("/fetchnotes", getUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

// ROUTE2: Add a new note using: GET "api/notes/addnote"  Login required

router.post(
  "/addnote",
  getUser,
  [
    // Express-Validator
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be atleast 5 characters long"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // Return Bad Request if errors occur
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

// ROUTE3: Update an existing note using: PUT "api/notes/updatenote"  Login required

router.put("/updatenote/:id", getUser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    // Create new note object
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if user updating the note is same as the user who created the note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

// ROUTE4: Delete a note using: DELETE "api/notes/updatenote"  Login required

router.delete("/deletenote/:id", getUser, async (req, res) => {
  try {
    // Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Check if user deleting the note is same as the user who created the note
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

// ROUTE5: Fetch all GLOBAL notes of user using: GET "api/notes/createuser" Login required

router.get("/fetchallnotes", async (req, res) => {
  try {

    
    const notes = await Notes.find({ isPublic: true });

    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

module.exports = router;
