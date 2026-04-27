const express = require('express');
const path = require('path');
const app = express ();
const PORT = process.env. PORT || 5000;
 
// Middleware to handle JSON data
app.use (express. Json ());
 
// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use (express. Static (path. Join (__dirname, 'public')));
 
// --- MOCK DATABASE (In-memory) ---
let users = [{email: "demo@serveease.com", password: "123”}];
let bookings = [];
let feedbacks = [];
 
// --- API ENDPOINTS ---
 
// 1. User Login
app.post ('/api/login', (req, res) => {
    const {email, password} = req.body;
    const user = users. find (u => u. email === email && u. password === password);
    
    if (user) {
        console.log(`✅ Login Success: ${email}`);
        res. status (200). json ({message: "Login successful!", user: {email, name: "Explorer”}});
    } else {
        console.log (`❌ Login Failed: ${email}`);
        res. status (401). json ({error: "Invalid email or password”});
    }
});
 
// 2. User Registration
app.post ('/api/register', (req, res) => {
    const {email, password} = req. body;
    if (users. find (u => u. email === email)) {
        return res. status (400). json ({error: "User already exists”});
    }
    users. push ({email, password});
    console.log(`👤 New User Registered: ${email}`);
    res. status (201). json ({message: "Account created successfully!”});
});
 [U1.1]
// 3. Save Booking
app.post('/api/bookings', (req, res) => {
    const booking = { id: Date.now(), ...req.body };
    bookings.push(booking);
    console.log(`📅 New Booking Received:`, booking);
    res.status(201).json({ message: "Booking confirmed!", bookingId: booking.id });
});
 
// 4. Save Feedback
app.post('/api/feedback', (req, res) => {
    const feedback = { id: Date.now(), ...req.body };
    feedbacks.push(feedback);
    console.log(`⭐ New Feedback Received:`, feedback);
    res.status(201).json({ message: "Thank you for your feedback!" });
});
 
// Root route serves your index.html
app.get ('*', (req, res) => {
    res. sendFile (path. join (__dirname, 'public', 'index.html'));
});
 
// Start the Server
app.listen(PORT, () => {
    console.log (`
ServerEase Back end is Running!
 Port: ${PORT}
 Local Link: http://localhost:${PORT}
    `);
});
