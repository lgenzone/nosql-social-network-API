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

const seedDB = async () => {
    await  User.deleteMany({});
    await User.insertMany(users);
};

seedDB().then(() => {
    console.log('Sample data inserted successfully!');
}).catch((err) => {
    console.error('Error inserting sample data', err);
});