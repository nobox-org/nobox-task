import { UserModel } from "@/lib/nobox/record-structures/user";

export async function createUser(document: any){
    // Define the parameters for the findOne operation
    
    const insertedDocument = await UserModel.insertOne(document);

    console.log(insertedDocument)

    return insertedDocument;
}

export async function login(userdata: any){
    // Define the parameters for the findOne operation
    const {email, password} = userdata;
    const userData = await UserModel.findOne({ email, password });

    if (!userData) throw new Error("Account does not exist");

    localStorage.setItem('NOBOX:BLOG::USER', JSON.stringify(userData, null, 2))

    return userData;
}


export function getUser(){
    // Define the parameters for the findOne operation

    const _stored_data = localStorage.getItem('NOBOX:BLOG::USER');

    if (!_stored_data) return null;

    return JSON.parse(_stored_data);
}

export function logout(){
    // Define the parameters for the findOne operation

    return localStorage.removeItem('NOBOX:BLOG::USER');
}
