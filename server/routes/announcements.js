const router = require('express').Router();
const Announcement = require('../models/Announcement');
const Event = require('../models/Event');
const User = require('../models/User');

//Create announcement
router.post('/', async (req, res) => {
    try {

        const event = await Event.findById(req.body.eventId);
        const organizers = event.organizers;
        if (organizers.includes(req.body.userId) || req.body.isAdmin) {
            const newAnnouncement = new Announcement(req.body);
            const savedAnnouncement = await newAnnouncement.save();
            await event.updateOne({ $push: { announcements: savedAnnouncement._id.toString() } });
            res.status(200).json(savedAnnouncement);
        } else {
            res.status(403).json("You can only create an announcement for your event!");
        }
    } catch (err) {
        res.status(404).json(err);
    }
});
//Update announcement
router.patch('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.body.eventId);
        const organizers = event.organizers;
        const announcement = await Announcement.findById(req.params.id);
        if (organizers.includes(req.body.userId) || req.body.isAdmin) {
            await announcement.updateOne({ $set: req.body });
            res.status(200).json("Announcement updated successfully");

        } else {
            res.status(403).json("You can update only your Announcemts!");
        }
    } catch (err) {
        res.status(404).json("Announcement not found!");
    }
});
//Delete announcement
router.delete('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.body.eventId);
        const organizers = event.organizers;
        const announcement = await Announcement.findById(req.params.id);
        if (organizers.includes(req.body.userId) || req.body.isAdmin) {
            await announcement.deleteOne({ $set: req.body });
            res.status(200).json("Announcement deleted successfully");

        } else {
            res.status(403).json("You can delete only your announcement!");
        }
    } catch (err) {
        res.status(404).json("Announcement not found!");
    }
});

//Like/Dislike a announcement
router.patch("/:id/like", async (req, res) => {
    try {
      const announcement = await Announcement.findById(req.params.id);
      if (!announcement.likes.includes(req.body.userId)) {
        await announcement.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The announcement has been liked");
      } else {
        await announcement.updateOne({ $pull: { likes: req.body.userId } });
      }
    } catch (err) {
      res.status(404).json("Announcement not found!");
    }
  });

//api/events/4864654654648468/announcemetnts/





module.exports = router;