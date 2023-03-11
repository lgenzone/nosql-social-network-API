const mongoose = require('mongoose');
const { User, Thought } = require('../models');

mongoose.connect('mongodb://localhost/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to the database!');
}).catch((err) => {
    console.error('Error connecting to the database', err);
});

// sample data 
const users = [
    {
        username: 'Alice',
        email: 'alice@mail.com',
    },
    {
        username: 'Madelyn',
        email: 'madelyn@mail.com'
    },
    {
        username: 'Ellie',
        email: 'ellie@mail.com'
    },
];

const thoughts = [
    {
        thoughtText: 'Excited to announce that I got a promotion at work today!',
        username: 'Sophie',
    },
    {
        thoughtText: 'Thinking about booking a trip to Denver. Any restaurant recommendations??',
        username: 'Ethan',
    },
    {
        thoughtText: 'Need a new show to binge! What is everyone watching right now?',
        username: 'Isabelle',
    },
];

const seedDB = async () => {
    await  User.deleteMany({});
    await User.collection.insertMany(users);
    await Thought.deleteMany({});
    await Thought.collection.insertMany(thoughts);
};

seedDB().then(() => {
    console.log('Sample data inserted successfully!');
}).catch((err) => {
    console.error('Error inserting sample data', err);
});