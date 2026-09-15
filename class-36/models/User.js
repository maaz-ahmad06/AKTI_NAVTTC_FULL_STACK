const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Profession / Job Title is required'],
        trim: true
    },
    organization: {
        type: String,
        required: [true, 'Company / Institute is required'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        default: 'Pakistan',
        trim: true
    },
    experience: {
        type: String,
        enum: ['Student / Fresher', 'Junior (1-2 Years)', 'Mid-Level (3-5 Years)', 'Senior (5+ Years)', 'Freelancer / Self-Employed'],
        default: 'Junior (1-2 Years)'
    },
    skills: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false // Excluded by default from database queries for security
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
