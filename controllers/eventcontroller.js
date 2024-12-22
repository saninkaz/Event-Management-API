const { eventModel } = require("../models/eventModel");
const mongoose=require("mongoose");

// Create Event


const createEvent = async (req, res) => {
    try {

        const event = await eventModel.create(req.body)
        console.log(event);
        res.json({ success: true, message: "Event successfully created", event })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occured while creating event" })
    }
}

// Register for event

const registerEvent = async (req, res) => {
    try {
        const user = req.user

        const eventId = req.params.eventId;

        const event = await eventModel.findById(eventId);

        for (let ev of event.students) {
            if (ev.studentId == user.id) {
                res.json({ message: "Student already registered" });
                return;
            }
        }

        const User = {
            studentId: user.id,
            name: user.name,
            email: user.email,
            department: user.department,
            year: user.year
        }

        event.students.push(User);

        await eventModel.findByIdAndUpdate(eventId, event);
        res.json({ success: true, message: "Event successfully registered" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occured while registering" })
    }
}


// Update Event details

const updateEvent = async (req, res) => {
    try {

        const eventId = req.params.eventId;
        const event = await eventModel.findByIdAndUpdate(eventId, req.body);

        if (!event) {
            res.status(404).json({ success: false, message: "Event not found" });
            return;
        }

        const updatedEvent = await eventModel.findById(event.id);
        console.log(updatedEvent);
        res.json({ success: true, message: "Event details successfully updated", updatedEvent });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occured while updating event details" })
    }
}

// Delete Event

const deleteEvent = async (req, res) => {
    try {

        const eventId = req.params.eventId;
        const event = await eventModel.findByIdAndDelete(eventId);

        if (!event) {
            res.status(404).json({ success: false, message: "Event not found" });
            return;
        }

        res.json({ success: true, message: "Event deleted successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occured while deleting event" })
    }
}

// Get Event Details

const getEventDetails = async (req, res) => {
    try {

        const eventId = req.params.eventId;

        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            res.status(400).json({ success: false, message: "Invalid event ID" });
            return;
        }

        const event = await eventModel.findById(eventId);


        if (!event) {
            res.status(404).json({ success: false, message: "Event not found" });
            return;
        }

        res.json({ success: true, message: "Event details fetched successfully", event });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occured fetching event details" })
    }
}

// Get All Events

const getAllEvents = async (req, res) => {
    try {

        const events = await eventModel.find({});

        if (events.length === 0) {
            res.status(404).json({ message: "There are no events currently" });
            return;
        }

        res.json({ success: true, message: "Successfully fetched all events", events });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error Occured while fetching all events" })
    }
}

module.exports = { createEvent, registerEvent, updateEvent, deleteEvent, getEventDetails, getAllEvents }