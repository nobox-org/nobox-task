import { Space } from "nobox-client";
import { createRowSchema } from "../config";

interface User {
    username: string,
    email:string,
    password: string,
}


export const UserStructure: Space<User> = {
    space: "user",
    description: "Record space for users",
    structure: {
        username: {
            description: "User's username",
            type: String,
            required: true,
            unique: true
        },
        email: {
            description: "User's email",
            required: true,
            unique: true,
            type: String
        },
        password: {
            description: "User's password",
            required: true,
            hashed: true,
            type: String,
        },
    }
}

export const UserModel = createRowSchema<User>(UserStructure);
