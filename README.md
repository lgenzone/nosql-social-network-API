# Soical Network API 

## Description 

This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Technologies Used 

* Node.js
* Express.js
* MongoDB
* Mongoose 

## Usage 

To get started with the project, you'll need to have [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed on your machine.

1. Clone [this repository](https://github.com/lgenzone/nosql-social-network-API)
2. Run `npm install` to install the project's dependencies 
3. Start the MongoDB server 
4. Run `npm start` or `node index.js` to start the server 
5. Use an API testing tool like [Insomnia](https://insomnia.rest/download) or [Postman](https://www.postman.com/downloads/) to interact with the API. 

## API Endpoints 
* `/api/users` - GET all users, POST a new user
* `/api/users/:userId` - GET a single user, PUT to update a user, DELETE a user
* `/api/thoughts` - GET all thoughts, POST a new thought
* `/api/thoughts/:thoughtId` - GET a single thought, PUT to update a thought, DELETE a thought
* `/api/users/:userId/friends/:friendId` - POST to add a friend, DELETE to remove a friend
* `/api/thoughts/:thoughtId/reactions` - POST to add a reaction to a thought, DELETE to remove a reaction from a thought

## Walkthrough Video 

Click [here](https://drive.google.com/file/d/1Ovo5ekMAt0386t1VrpYsGmFKlOhKODgK/view) to watch a walkthrough video demonstrating the functionality of the API. 

## License 

MIT


## Questions 

For questions related to this project, please reach out to me using the links below.

* [Github](https://github.com/lgenzone)
* [Email](lgenzone@icloud.com)
