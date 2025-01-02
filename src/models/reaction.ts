import { Schema, Document } from 'mongoose';

// DONE: reaction interface
// NEEDS: reactionBody, username, createdAt <--- done
export interface IReaction extends Document {
  reactionBody: string;
  username: string;
  createdAt: Date;
}

// DONE: reaction schema
// NEEDS: reactionBody, username, createdAt <--- done
export const reactionSchema = new Schema<IReaction>(
  {
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;