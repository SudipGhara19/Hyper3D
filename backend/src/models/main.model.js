import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    folders: [
        {
            name: { type: String, required: true, unique: true },
            createdAt: { type: Date, default: Date.now },
            models: [
                {
                    name: { type: String, required: true },
                    slug: {type: String, required: true},
                    description: { type: String },
                    modelUrl: { type: String, required: true },
                    uploadedAt: { type: Date, default: Date.now }
                }
            ]
        }
    ],

    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("3DViewUser", UserSchema);
export default User;
