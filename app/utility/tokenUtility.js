 import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/config.js";
 import jwt from "jsonwebtoken";

export const tokenEncode = (email,user_id)=>{

    const key = JWT_KEY
    const expire = {expiresIn:JWT_EXPIRE_TIME}
    const payload ={email:email,user_id:user_id}
    return jwt.sign(payload,key,expire)
}

export const tokenDecode = (token)=>{
    try {

        const key = JWT_KEY
        return jwt.verify(token,key)

    }catch(e){
        return null
    }
    
}
