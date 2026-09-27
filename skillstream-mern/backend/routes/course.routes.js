import express from 'express';
import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const { search, tag, provider } = req.query;

    let filter = {};

    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
        ];
    }

    if (tag) {
        filter.tags = { $in: [tag] };
    }

    if (provider) {
        filter.provider = { $regex: provider, $options: 'i' };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    res.json(courses);
}));

// @desc    Get single course by ID
// @route   GET /api/v1/courses/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        res.json(course);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
}));

// @desc    Create a course
// @route   POST /api/v1/courses
// @access  Private/Admin
router.post('/', protect, admin, asyncHandler(async (req, res) => {
    const { code, title, description, provider, image, duration, tags } = req.body;
    // Accept both spellings from different clients
    const courseUrl = req.body.courseUrl || req.body.courseurl;

    const course = await Course.create({
        code,
        title,
        description,
        provider,
        image,
        duration,
        courseUrl,
        tags,
    });

    res.status(201).json(course);
}));

// @desc    Update a course
// @route   PUT /api/v1/courses/:id
// @access  Private/Admin
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        const { code, title, description, provider, image, duration, tags } = req.body;
        // Accept both spellings from different clients
        const courseUrl = req.body.courseUrl || req.body.courseurl;
        course.code = code ?? course.code;
        course.title = title ?? course.title;
        course.description = description ?? course.description;
        course.provider = provider ?? course.provider;
        course.image = image ?? course.image;
        course.duration = duration ?? course.duration;
        course.courseUrl = courseUrl ?? course.courseUrl;
        course.tags = tags ?? course.tags;

        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
}));

// @desc    Delete a course
// @route   DELETE /api/v1/courses/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (course) {
        res.json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
}));

export default router;
