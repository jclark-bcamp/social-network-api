import { Schema, model } from 'mongoose';
// DONE: user schema
// NEEDS: username, email, thoughts, friends <--- done
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // mongoose matching validation
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId, // reference to the Thought model
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId, // reference to the User model
            ref: 'User',
        },
    ],
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// DONE: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// NEEDS: friends.length <--- done
userSchema
    .virtual('friendCount')
    .get(function () {
    return this.friends.length;
});
const User = model('User', userSchema);
export default User;
