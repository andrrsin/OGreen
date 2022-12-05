const router = require('express').Router();
const Event = require('../models/Event');
const User = require('../models/User');
const Announcement = require('../models/Announcement');
//create Event
router.post('/', async (req, res) => {
  const newEvent = new Event(req.body);
  try {
    newEvent.organizers.push(req.body.userId);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update Event
router.patch('/:id', async (req, res) => {

  try {
    const event = await Event.findById(req.params.id);
    const organizers = event.organizers;
    if (organizers.includes(req.body.userId) || req.body.isAdmin) {

      await event.updateOne({ $set: req.body });
      res.status(200).json("Event updated successfully");

    } else {
      res.status(403).json("You can update only your event!");
    }
  } catch (err) {
    res.status(404).json(err);//"Event not found!");
  }
});

//delete Event
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (event.userId === req.body.userId || req.body.isAdmin) {
      // const announcements = await Announcement.find({eventId:event.announcements});
      // announcements.forEach(async (announcement) => {
      //   await announcement.deleteOne({ $set: req.body });
      // });
      await event.deleteOne({ $set: req.body });
      res.status(204).json("Event deleted successfully");

    } else {
      res.status(403).json("You can delete only your event!");
    }
  } catch (err) {
    res.status(404).json("Event not found!");
  }
});

//participate in Event
router.patch("/:id/participate", async (req, res) => {
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
//Add organizer
router.patch("/:id/organize", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.userId === req.body.userId || req.body.isAdmin) {
      if (!event.organizers.includes(req.body.organizer)) {
        await event.updateOne({ $push: { organizers: req.body.organizer } });
        res.status(200).json("You have added as organizer!");
      } else {
        await post.updateOne({ $pull: { organizers: req.body.organizer } });
        res.status(200).json("You have removed as organizer");
      }
    } else {
      res.status(403).json("You can add organizers only in your event!");
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
router.get("/timeline", async (req, res) => {
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

//Get announcements by Event
router.get('/:id/announcements', async (req, res) => {
  try {
      const eventAnnouncements = await Announcement.find({ eventId: req.params.id });
      res.status(200).json(eventAnnouncements);
} catch (err) {
  res.status(404).json(err);
}
});

//Get User's All Events
router.get("/user", async (req, res) => {
  try {

    const currentUser = await User.findById(req.body.userId);

    const userEvents = await Event.find({ userId: currentUser._id });
    res.status(200).json(userEvents)
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;