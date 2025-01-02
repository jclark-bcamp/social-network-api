import { Schema } from 'mongoose';
// DONE: reaction schema
// NEEDS: reactionBody, username, createdAt <--- done
export const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
export default reactionSchema;
