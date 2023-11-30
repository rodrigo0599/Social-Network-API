const router = require("express").Router();
const { User, Thought } = require("../../models");

// GET all users

router.get("/", async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by id

router.get("/:userID", async (req, res) => {
  try {
    const oneUser = await User.findOne({ _id: req.params.userID })
      .populate("thoughts")
      .populate("friends");
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a user by id

router.put("/:userID", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userID },
      req.body,
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a user by id

router.delete("/:userID", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.userID });
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    const deleteUser = await User.findOneAndRemove({ _id: req.params.userID });
    res.status(200).json(deleteUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list

router.post("/:userID/friends/:friendID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    const friend = await User.findById(req.params.friendID);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    user.friends.push(friend._id);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:userID/friends/:friendID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    const friend = await User.findById(req.params.friendID);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    user.friends.pull(friend._id);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
