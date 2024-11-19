const { Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.id });
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(req.params.id);
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete(req.params.id);
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Thought deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json({ message: 'Reaction deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },



};