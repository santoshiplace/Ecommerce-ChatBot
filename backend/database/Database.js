// Example database connection setup
import mongoose from 'mongoose';

const connectDatabase = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Database connected successfully');
    }).catch((err) => {
        console.error('Database connection error:', err);
    });
};

export default connectDatabase;
