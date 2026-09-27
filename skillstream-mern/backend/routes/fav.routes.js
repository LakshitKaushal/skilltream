import express from 'express';
import asyncHandler from 'express-async-handler';
import Favorite from '../models/Favorite.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get user's favourite courses
// @route   GET /api/v1/favourites
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
    const favourites = await Favorite.find({ user: req.user._id }).sort('-createdAt');
    res.json(favourites);
}));

// @desc    Add course to favourites
// @route   POST /api/v1/favourites
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { code, title, description, instructor, imageurl, courseurl, duration, tags } = req.body;

    if (!code || !title) {
        res.status(400);
        throw new Error('Course code and title are required');
    }

    // Check if already favourited
    const exists = await Favorite.findOne({ user: req.user._id, code });
    if (exists) {
        res.status(400);
        throw new Error('Already in your favourites');
    }

    const fav = await Favorite.create({
        user: req.user._id,
        code,
        title,
        description: description || '',
        instructor: instructor || '',
        imageurl: imageurl || '',
        courseurl: courseurl || '',
        duration: duration || 0,
        tags: tags || []
    });

    res.status(201).json(fav);
}));

// @desc    Remove course from favourites by course code
// @route   DELETE /api/v1/favourites/:code
// @access  Private
router.delete('/:code', protect, asyncHandler(async (req, res) => {
    const code = Number(req.params.code);

    const fav = await Favorite.findOneAndDelete({ user: req.user._id, code });

    if (fav) {
        res.json({ message: 'Removed from favourites' });
    } else {
        res.status(404);
        throw new Error('Favourite not found');
    }
}));

export default router;
