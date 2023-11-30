const router = require("express").Router();
const { User, Thought } = require("../../models");

// GET all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughtData = await Thought.find();
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by id
router.get("/:thoughtID", async (req, res) => {
  try {
    const thoughtData = await Thought.findOne({ _id: req.params.thoughtID });
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new thought

router.post("/", async (req, res) => {
  try {
    const thoughtData = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      req.body.userId,
      { $push: { thoughts: thoughtData._id } },
      { new: true }
    );
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT to update a thought by id

router.put("/:thoughtID", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtID },
      req.body,
      { new: true }
    );
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by id

router.delete("/:thoughtID", async (req, res) => {
  try {
    const DeleteThought = await Thought.findOneAndRemove({
      _id: req.params.thoughtID,
    });

    if (!DeleteThought) {
      return res
        .status(404)
        .json({ message: "No such thought with this ID exists!" });
    }

    await User.findOneAndUpdate(
      {},
      { $pull: { thought: DeleteThought._id } },
      { new: true }
    );

    res.json(DeleteThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a reaction stored in a single thought's reactions array field
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE to remove a reaction by id
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    );
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
