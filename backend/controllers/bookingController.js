import express from 'express';
import bookingModel from '../models/bookingModels.js';
import { sendAdminNotification } from '../utils/sendEmail.js';

const createBooking = async (req, res) => {
  try {
    const userId = req.user?.id; // from authUser middleware
    const {
      plan,
      dateTime,
      city,
      location,
      bookingType,
      name,
      phone,
      email,
      message,
    } = req.body || {};

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (!bookingType) {
      return res
        .status(400)
        .json({ success: false, message: "bookingType is required" });
    }

    const newBooking = new bookingModel({
      userId,
      bookingType,
      plan,
      dateTime: dateTime || undefined,
      city,
      location,
      name,
      phone,
      email,
      message,
    });

    await newBooking.save();

    // 📧 Notify admin about the new booking / enquiry (non-blocking)
    try {
      const label = bookingType === "contact" ? "Enquiry" : "Consultation Booking";
      await sendAdminNotification(
        `📅 New ${label} — ${name || "Customer"}`,
        `<h2>New ${label}</h2>
         <p><strong>Type:</strong> ${bookingType}</p>
         <p><strong>Name:</strong> ${name || "-"}</p>
         <p><strong>Phone:</strong> ${phone || "-"}</p>
         <p><strong>Email:</strong> ${email || "-"}</p>
         ${plan ? `<p><strong>Plan:</strong> ${plan.title || JSON.stringify(plan)}</p>` : ""}
         ${dateTime ? `<p><strong>Preferred:</strong> ${new Date(dateTime).toLocaleString()}</p>` : ""}
         ${city ? `<p><strong>City:</strong> ${city}</p>` : ""}
         ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}
         ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
         <p><em>${new Date().toLocaleString()}</em></p>`
      );
    } catch (mailErr) {
      console.log("Admin booking email failed:", mailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find().populate();
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { createBooking  , getAllBookings };
