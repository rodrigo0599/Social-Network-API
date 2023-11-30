const connection = require("../config/connection");
const { Thought, User } = require("../models");
const mongoose = require("mongoose");

const seedData = async () => {
  const existingUsers = await User.find();
  const existingThoughts = await Thought.find();

  if (existingUsers.length === 0) {
    const user1 = await User.create({
      username: "user1",
      email: "User@test.com",
      thoughts: [],
      friends: [],
    });
    const user2 = await User.create({
      username: "user2",
      email: "user2@test.com",
      thought: [],
      friends: [],
    });
    const user3 = await User.create({
      username: "user3",
      email: "UserC@test.com",
      thought: [],
      friends: [],
    });
    const user4 = await User.create({
      username: "user4",
      email: "user4@test.com",
      thought: [],
      friends: [],
    });
    const user5 = await User.create({
      username: "user5",
      email: "user5@test.com",
      thought: [],
      friends: [],
    });
    user1.friends.push(user2, user3, user4, user5);
    user2.friends.push(user1, user3, user4, user5);
    user3.friends.push(user1, user2, user4, user5);
    user4.friends.push(user1, user2, user3, user5);
    user5.friends.push(user1, user2, user3, user4);

    await user1.save();
    await user2.save();
    await user3.save();
    await user4.save();
    await user5.save();

    console.log("Seed data for users created successfully!");
  } else {
    console.log("Seed data for users already exists.");
  }

  if (existingThoughts.length === 0) {
    const thought1 = await Thought.create({
      thoughtText: "Thought 1",
      username: "user1",
      reactions: [],
    });
    const thought2 = await Thought.create({
      thoughtText: "Thought 2",
      username: "user2",
      reactions: [],
    });

    await thought1.save();
    await thought2.save();

    console.log("Seed data for thoughts created successfully!");
  } else {
    console.log("Seed data for thoughts already exists.");
  }
  try {
    const user1 = new User();
    const user2 = new User();
    const thought1 = new Thought();
    const thought2 = new Thought();

    user1.thoughts = user1.thoughts || [];
    user2.thoughts = user2.thoughts || [];

    user1.thoughts.push(thought1);
    user2.thoughts.push(thought2);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
