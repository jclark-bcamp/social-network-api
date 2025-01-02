import { User, Thought } from '../models/index.js';
import { type Request, type Response } from 'express';
// import mongoose from 'mongoose';



export const getUsers = async (_req: Request, res: Response) => { // Define a function that fetches all users
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}

export const getUserById = async (req: Request, res: Response) => { // Define a function that fetches a single user by its _id
    try {
        const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => { // Define a function that creates a new user
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const updateUser = async (req: Request, res: Response) => { // Define a function that updates a user by its _id
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => { // Define a function that deletes a user by its _id
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts } }); // Delete all thoughts associated with the user
        return res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const addFriend = async (req: Request, res: Response) => { // Define a function that adds a friend to a user's friend list
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to add a friend to the user's friend list
            { new: true }
        );
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteFriend = async (req: Request, res: Response) => { // Define a function that removes a friend from a user's friend list
    try {
        const user = await User.findByIdAndUpdate( // Use findByIdAndUpdate to remove a friend from the user's friend list
            req.params.userId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        return res.json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
}