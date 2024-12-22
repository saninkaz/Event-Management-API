const express = require("express");
const { createEvent, registerEvent, updateEvent, deleteEvent, getEventDetails, getAllEvents } = require("../controllers/eventcontroller");
const { authMiddleware, authorize } = require("../middlewares/auth");


const eventRouter = express.Router();

eventRouter.post('/create', authMiddleware, authorize("admin"), createEvent);
eventRouter.post('/register/:eventId', authMiddleware, registerEvent);
eventRouter.put('/update/:eventId', authMiddleware, authorize("admin"), updateEvent);
eventRouter.delete('/:eventId', authMiddleware, authorize("admin"), deleteEvent);
eventRouter.get('/all', authMiddleware, getAllEvents);
eventRouter.get('/:eventId', authMiddleware, getEventDetails);

module.exports = { eventRouter } 