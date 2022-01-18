const express = require("express");

const router = express.Router();

const fetchuser = require("../middleware/fetchuser");

const Notes = require("../models/Notes");

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req._id });
        res.send(notes);
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
});

router.post("/addnotes", fetchuser, async (req, res) => {
    try {
        const notes = new Notes({
            user: req._id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
        });
        const createNotes = await notes.save();
        res.send(createNotes);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
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

        const note = await Notes.findById(req.params.id);

        if (!note) {
            res.status(404).send("Not Found");
        }

        if (note.user != req._id) {
            res.status(401).send("Not Allowed");
        }

        const updatedNote = await Notes.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: newNote },
            { new: true, runValidators: true }
        );

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);

        if (!note) {
            res.status(404).send("Not Found");
        }

        if (note.user != req._id) {
            res.status(401).send("Not Allowed");
        }

        const deletedNote = await Notes.findByIdAndDelete(req.params.id);

        res.json(deletedNote);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
