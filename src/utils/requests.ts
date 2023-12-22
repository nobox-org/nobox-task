import { PostModel } from "@/lib/nobox/record-structures/post";
import { IPost } from "@/types";


function parsePostResults(results:any[], up=false) {

    let _results = results, is_array = false;

    if (!Array.isArray(results)){
        _results = [results]
        is_array = true
    }


    const res = _results.map((item)=>{
        if (up) {
            
            item.reaction = JSON.stringify(item.reaction)
            return item
        }


        return ({
            title: item.title,
            body: item.body,
            id: item.id,
            date: item.created_at,
            userId: item.userId,
            reaction: JSON.parse(item.reaction)
        })
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

    const parsedDocuments = parsePostResults(documents as any);
    const insertedDocuments = await PostModel.insert(parsedDocuments);

    return parsePostResults(insertedDocuments)
}