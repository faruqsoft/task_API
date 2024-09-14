import  {tokenEncode } from "../utility/tokenUtility.js";
import usersModel from "../model/usersModel.js";
import sendEmail from "../utility/emailUtility.js";

export const registration = async (req,res)=>{

    try {


        let reqBody = req.body;
        await usersModel.create(reqBody)
        return res.json({status:"success","message" : "user registered successfully"});
    
    }
    catch(e){

        return res.json({status:"fail","message":e.toString()});
    }
  
    
}

export const login = async (req,res)=>{

    try {


        let reqBody = req.body;
        let data = await usersModel.findOne(reqBody)

        if(data==null){

            return res.json({status:"fail","message" : "user not found"});

        }
        else{//login success
           let token= tokenEncode(data['email'],data['_id'])
            return res.json({status:"success","message" : "user registered successfully",data:{token:token}});
        }
       
    
    }
    catch(e){

        return res.json({status:"token not found","message":e.toString()});
    }
}




export const profileDetails = async (req,res)=>{
    
try{

    let user_id = req.headers['user_id']
    let data = await usersModel.findOne( {"_id": user_id})
    return res.json({status:"success","message":"user frofile successfully",data:data});

}
catch(e){
    return res.json({status:"fail","message":e.toString()});

}

}




export const ProfileUpdate= async (req,res)=>{
    try {


        let reqBody = req.body;
        let user_id =req.headers['user_id']
        await usersModel.updateOne({"_id" :user_id},reqBody)

        return res.json({status:"success","message" : "user update successfully"});
    
    }
    catch(e){

        return res.json({status:"fail","message":e.toString()});
    }
  

}




export const emailVerify = async (req,res)=>{

    try{
        let email = req.params.email;

    let data=await usersModel.findOne({email: email})
    if(data==null){

        return res.json({ status:"fail","message":"user email does not exist"})
    }
    else{
        // send OTP to email
        let code = Math.floor(100000+Math.random()*900000)
        let emailTo = data['email'];
        let emailText = "Your Code is"+ code;
        let emailSubject = "Task Maneger Verification Code";
        await sendEmail( emailTo,emailText,emailSubject  )

        //update OTPin user

        await usersModel.updateOne({email:email},{otp:code})
        return res.json({status:"success", "message":"verification successfull,check email"});
    }


    }
    catch(e){

        return res.json({status:"fail","message":e.toString()});
    }   


}








export const codeVerify = async (req,res)=>{


    try{

        let reqBody = req.body;
    let data = await usersModel.findOne({email:reqBody['email'],otp:reqBody['otp']});

    if(data==null){

        return res.json({ status:"fail","message":"wrong verification code"})
    }
    else{//login success
      
         return res.json({status:"success","message" : "verify successful"})
        } 

    } 
    catch(e){
        return res.json({status:"fail","message":e.toString()});

    }


    }




export const resetPassword = async (req,res)=>{

    try{

        let reqBody = req.body;
    let data = await usersModel.findOne({email:reqBody['email'],otp:reqBody['otp']});

    if(data==null){

        return res.json({ status:"fail","message":"wrong verification code"})
    }
    else{//login success
      
        await usersModel.updateOne({email:reqBody['email']},{otp: "0", password :reqBody['password']});

        return res.json({status:"success",message:"password reset successful"});

       
        } 

    }
    catch(e){
        return res.json({status:"fail","message":e.toString()});  
    
    }

}