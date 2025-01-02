import { User, Thought } from '../models/index.js';
// const { ObjectId } = mongoose.Types;
// TODO: Get, create, get by id, update, and delete thoughts
export default {
    async getThoughts(_req, res) {
        try {
            const thoughts = await Thought.find().populate('reactions');
            res.json(thoughts);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(// Add thought to user's thoughts array
            req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(201).json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId).populate('reactions'); // Populate reactions
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' }); // Return 404 if not found
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true }); // Return updated thought
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId); // Find and delete thought
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            return res.json({ message: 'Thought deleted successfully' });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(// Add reaction to thought's reactions array
            req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, // Remove directly
            { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            return res.json(thought);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },
};
