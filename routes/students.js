const express = require("express");
const router = express.Router();
const Student = require("../models/student");

//Getting all
router.get("/", async (req, res) => {
  try {
    const student = await Student.find();
    res.send(student);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Getting one
router.get("/:id", getStudent, (req, res) => {
  res.json(res.student);
});

//Creating one
router.post("/", async (req, res) => {
  const student = new Student({
    studentID: req.body.studentID,
    name: req.body.name,
    yearOfBirth: req.body.yearOfBirth,
    address: req.body.address
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Updating one
router.patch("/:id", getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.student.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Deleting one
router.delete("/:id", getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: "Deleted Student" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: "Cannot find student" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
}

module.exports = router;
