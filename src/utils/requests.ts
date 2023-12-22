import { PostModel } from "@/lib/nobox/record-structures/post";
import { IPost } from "@/types";


function parsePostResults(results:any[], up=false) {

    let _results = results, is_array = false;

    if (!Array.isArray(results)){
        _results = [results]
        is_array = true
    }


    const res = _results.map((item)=>{

        // Parse it to nobox
        if (up) {
            
            if(item.reaction) item.reaction = JSON.stringify(item.reaction)
            return item
        }

        // Parse it from nobox
        const _dt:IPost = {
            title: item.title,
            content: item.content,
            userId: item.userId,

            id: item.id,
            date: item.created_at,
            reaction: JSON.parse(item.reaction)
        }

        return _dt
    })

    if (is_array) return res[0];
    return res;
}


export async function fetchPosts(){
    const results = await PostModel.find();

    return parsePostResults(results);
}

export async function fetchPost(id:string){
    // Define the parameters for the findOne operation
    const params = { id };

    // Define the options for the findOne operation

    // Perform the findOne operation
    const result = await PostModel.findOne(params, {
        paramRelationship: "And",
    });

    return parsePostResults(result as any);
}


export async function sendPost(documents:IPost | IPost[]){
    // Define the parameters for the findOne operation

    const parsedDocuments = parsePostResults(documents as any, true);
    
    const insertedDocuments = await PostModel.insertOne(parsedDocuments);

    return parsePostResults(insertedDocuments as any)
}