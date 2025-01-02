import { Router } from 'express';

// Import all of the API routes from /api/index
const router = Router();

// GET all users
// GET a single user by its _id and populated thought and friend data

// POST a new user (note that the examples below are just sample data):

// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }

// PUT to update a user by its _id

// DELETE to remove user by its _id

import { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend } from '../../controllers/userController.js';

// GET all users
router.route('/').get(getUsers)

// POST a new user
router.route('/').post(createUser);

// GET a single user
router.route('/:userId').get(getUsers);

// PUT to update a user
router.route('/:userId').put(updateUser);

// DELETE to remove a user
router.route('/:userId').delete(deleteUser);

// Add friend
router.route('/:userId/friends/:friendId').post(addFriend);

// Delete friend
router.route('/:userId/friends/:friendId').delete(deleteFriend);



export default router;