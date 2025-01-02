import { Router } from 'express';
// GET to get all thoughts
// GET to get a single thought by its _id
// POST to create a new thought. Don't forget to push the created thought's _id to the associated user's thoughts array field. (note that the examples below are just sample data):
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id
// DELETE to remove a thought by its _id
// import {
//   getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction,
// } from '../../controllers/thoughtController.js';
import thoughtController from '../../controllers/thoughtController.js';
const router = Router();
// GET to get all thoughts
router.get('/', thoughtController.getThoughts);
// GET to get a single thought by its _id
router.get('/:thoughtId', thoughtController.getThoughtById);
// POST to create a new thought
router.post('/', thoughtController.createThought);
// PUT to update a thought by its _id
router.put('/:thoughtId', thoughtController.updateThought);
// DELETE to remove a thought by its _id
router.delete('/:thoughtId', thoughtController.deleteThought);
// POST 
router.post('/:thoughtId/reactions', thoughtController.addReaction);
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', thoughtController.removeReaction);
export default router;
