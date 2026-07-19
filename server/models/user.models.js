import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    history: [
        {
            codeSnippet: {
                type: String,
                required: true
            },
            analysis: {
                type: mongoose.Schema.Types.Mixed,
                required: true
            },
            reviewedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);