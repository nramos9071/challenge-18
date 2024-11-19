const mongoose = require('mongoose');
const { User, Thought } = require('../models');

// Sample data
const users = [
    {
        username: 'corina.soto',
        email: 'corina@example.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'louis.munoz',
        email: 'louis@example.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'jeffery.riley',
        email: 'jeff@example.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'joe.villescaz',
        email: 'joe@example.com',
        thoughts: [],
        friends: []
    },
    {
        username: 'jordan.tellez',
        email: 'jordan@example.com',
        thoughts: [],
        friends: []
    }
];

const thoughts = [
    {
        thoughtText: 'I wish the cowboys were better',
        username: 'jordan.tellez',
        reactions: []
    },
    {
        thoughtText: 'I would not like to be a cowboys fan anymore',
        username: 'corina.soto',
        reactions: []
    },
    {
        thoughtText: 'I think Brian Wright is a great GM',
        username: 'jeffery.riley',
        reactions: []
    },
    {
        thoughtText: 'We are so lucky to have Brian Wright as our GM',
        username: 'louis.munoz',
        reactions: []
    },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Insert sample data
        const createdUsers = await User.insertMany(users);
        const createdThoughts = await Thought.insertMany(thoughts);

        // Update users with thoughts
        
         for (let i = 0; i < createdUsers.length; i++) {
            const user = createdUsers[i];
            const userThoughts = createdThoughts.filter(thought => thought.username === user.username);
            await User.findByIdAndUpdate(
                user._id,
                { $push: { thoughts: { $each: userThoughts.map(thought => thought._id) } } },
                { new: true }
            );
        }

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDatabase();