const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// API Routes

// 1. Get all registered members (Password excluded completely)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users',
            error: error.message
        });
    }
});

// 2. Register user with full details & securely hash sensitive password
app.post('/api/users', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            role,
            organization,
            city,
            country,
            experience,
            skills,
            bio,
            password
        } = req.body;

        // Basic validations
        if (!fullName || !email || !phone || !role || !organization || !city || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields (Name, Email, Phone, Role, Organization, City, Password)'
            });
        }

        // Check if email is already registered
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'A member with this email address already exists'
            });
        }

        // Securely hash sensitive password using bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Parse skills into an array if passed as string
        let skillsArray = [];
        if (Array.isArray(skills)) {
            skillsArray = skills;
        } else if (typeof skills === 'string') {
            skillsArray = skills
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0);
        }

        // Create new user in MongoDB
        const newUser = new User({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            role: role.trim(),
            organization: organization.trim(),
            city: city.trim(),
            country: country ? country.trim() : 'Pakistan',
            experience: experience || 'Junior (1-2 Years)',
            skills: skillsArray,
            bio: bio ? bio.trim() : '',
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Convert to object and ensure password is never exposed in response
        const userResponse = savedUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User registered successfully and stored in MongoDB!',
            data: userResponse
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while registering user',
            error: error.message
        });
    }
});

// 3. Delete user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id).select('-password');

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: 'User record not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Member profile removed successfully',
            data: deletedUser
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while deleting record',
            error: error.message
        });
    }
});

// Serve frontend page fallback
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});