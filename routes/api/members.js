const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const members = require("../../Members");
// Get all memebers
router.get("/", (req, res) => {
  res.json(members);
});

// Get a Single Member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create a Member
router.post("/", (req, res) => {
  //   res.send(req.body);
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    statust: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Email and Name is necessary" });
  }

  members.push(newMember);
  res.json(members);
});

// Update Member

router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: "Member succesfully updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});


// Delete a Member
// This doesn't actually delete the member
// The filter function only filters out the specified member
router.delete("/:id", (req, res) => {
    const found = members.some((member) => member.id === parseInt(req.params.id));
    if (found) {
        res.json({msg: "Member with id deledted", members: members.filter((member) => member.id !== parseInt(req.params.id))});
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });
module.exports = router;
