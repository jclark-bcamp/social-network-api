import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/social-network-api');
export default mongoose.connection;
