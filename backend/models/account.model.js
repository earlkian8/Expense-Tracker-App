import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema);
export default Account;