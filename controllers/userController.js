const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find();
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id });
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(req.params.id);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete(req.params.id);
            if (!userData) {
                return res.status(404).json({ message: 'User not found' });
            }
            await Thought.deleteMany({ userId: req.params.id });
            res.json({ message: 'User and their thoughts deleted successfully' });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
};