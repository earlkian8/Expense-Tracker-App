import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "income"
    },
    description: {
        type: String,
        required: true
    },
    account: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Account", 
        required: true 
    }
}, {
    timestamps: true
});

const Income = mongoose.model('Income', incomeSchema);

export default Income; 