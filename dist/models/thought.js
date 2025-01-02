import { Schema, model } from 'mongoose';
import { reactionSchema } from './reaction.js';
// DONE: thought schema
// NEEDS: thoughtText, createdAt, username, reactions <--- done
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// DONE: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
    return this.reactions.length;
});
// DONE: Create the Thought model using the thoughtSchema
console.log('Registering Thought model');
const Thought = model('Thought', thoughtSchema);
console.log('Thought model registered');
export default Thought;
