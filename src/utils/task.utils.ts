import { TaskModel } from "@/lib/nobox/record-structures/task";
import { ITask } from "@/types";



export async function fetchTasks(){
    const results = await TaskModel.find();

    return results;
}

export async function fetchTask(id:string){
    // Define the parameters for the findOne operation
    const params = { id };

    // Define the options for the findOne operation

    // Perform the findOne operation
    const result = await TaskModel.findOne(params, {
        paramRelationship: "And",
    });

    return result;
}


export async function sendTask(documents:ITask){
    // Define the parameters for the findOne operation

    // const parsedDocuments = parsePostResults(documents as any, true);
    
    const insertedDocuments = await TaskModel.insertOne(documents);

    return insertedDocuments;
}


export async function updateTask(doc:ITask){
    // Define the parameters for the findOne operation

    // console.log(doc);
    const {id, ...rest} = doc;
    const insertedDocuments = await TaskModel.updateOne({id}, rest);

    return insertedDocuments;
}
