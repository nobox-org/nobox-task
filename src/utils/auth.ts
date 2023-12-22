import { UserModel } from "@/lib/nobox/record-structures/user";
import { IUser } from "@/types";


let localStorage:Storage;

if (typeof window !== 'undefined' && window.localStorage) {
    localStorage = window.localStorage
}

export async function createUser(document: any){
    // Define the parameters for the findOne operation
    
    const insertedDocument = await UserModel.insertOne(document);

    return insertedDocument;
}

export async function login(userdata: any){
    // Define the parameters for the findOne operation
    const {email, password} = userdata;
    const userData = await UserModel.findOne({ email, password });

    if (!userData) throw new Error("Account does not exist");

    if (localStorage) localStorage.setItem('NOBOX:BLOG::USER', JSON.stringify(userData, null, 2))

    return userData;
}


export function getUser(): IUser | null{
    // Define the parameters for the findOne operation

    if (!localStorage) return null

    const _stored_data = localStorage.getItem('NOBOX:BLOG::USER');

    if (!_stored_data) return null;

    return JSON.parse(_stored_data) as IUser;
}

export function logout(){
    // Define the parameters for the findOne operation
    if (!localStorage) return
    return localStorage.removeItem('NOBOX:BLOG::USER');
}
