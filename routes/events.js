const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
//create Event
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update Event
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId === req.body.userId || req.body.isAdmin) {

      await event.updateOne({ $set: req.body });
      res.status(200).json("Event updated successfully");

    } else {
      res.status(403).json("You can update only your event!");
    }
  } catch (err) {
    res.status(404).json("Event not found!");
  }
});

//delete Event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId === req.body.userId || req.body.isAdmin) {

      await event.deleteOne({ $set: req.body });
      res.status(200).json("Event deleted successfully");

    } else {
      res.status(403).json("You can update only your event!");
    }
  } catch (err) {
    res.status(404).json("Event not found!");
  }
});
//participate in Event
router.put("/:id/participate", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.participants.includes(req.body.userId)) {
      await event.updateOne({ $push: { participants: req.body.userId } });
      res.status(200).json("You have signed for the event!");
    } else {
      await post.updateOne({ $pull: { participants: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(404).json("Event not found!");
  }
});
//get Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json(err);
  }
});
//get timeline Events
router.get("/timeline/all", async (req, res) => {
  try {

    const currentUser = await User.findById(req.body.userId);

    const userEvents = await Event.find({ userId: currentUser._id });

    const friendEvents = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Event.find({ userId: friendId });
      })
    );
    res.status(200).json(userEvents.concat(...friendEvents))
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get User's All Events
router.get("/timeline/user", async (req, res) => {
  try {

    const currentUser = await User.findById(req.body.userId);

    const userEvents = await Event.find({ userId: currentUser._id });
    res.status(200).json(userEvents)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;