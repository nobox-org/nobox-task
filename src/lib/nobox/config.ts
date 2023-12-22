import  {  Config,  getFunctions,  getSchemaCreator  }  from  "nobox-client";



if (!process.env.NEXT_PUBLIC_NOBOX_TOKEN) {
    throw new Error("Nobox token is required");
}

export const config: Config = {
    endpoint:  "https://api.nobox.cloud",
    project:  "noboxBlog",
    token: process.env.NEXT_PUBLIC_NOBOX_TOKEN,
};

export const createRowSchema = getSchemaCreator(config, { type: "rowed" });

export  const  Nobox  =  getFunctions(config);
