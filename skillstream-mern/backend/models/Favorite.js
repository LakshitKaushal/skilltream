import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // Embedded course data (sent directly from frontend)
    code: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    instructor: { type: String, default: '' },
    imageurl: { type: String, default: '' },
    courseurl: { type: String, default: '' },
    duration: { type: Number, default: 0 },
    tags: [{ type: String }]
}, {
    timestamps: true
});

// Prevent duplicate favorites per user per course code
favoriteSchema.index({ user: 1, code: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
