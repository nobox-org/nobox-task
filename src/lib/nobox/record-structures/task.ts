import { Space } from "nobox-client";
import { createRowSchema } from "../config";

interface Task {
    task:string,
    completed: boolean,
    userId: string,
}

export const TaskStructure: Space<Task> = {
    space: "task",
    description: "Record space for tasks",
    structure: {
        task: {
            description: "Task given",
            type: String,
            required: true
        },
        completed: {
            description: "Task status, completed or not",
            required: true,
            type: Boolean,
            defaultValue:false
        },
        userId: {
            description: "Task author id",
            required: false,
            type: String,
        }
    }
}

export const TaskModel = createRowSchema<Task>(TaskStructure);
