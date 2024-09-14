import mongoose from "mongoose";
import tasksModel from "../model/tasksModel.js";

export const createTask = async (req,res)=>{


    try{

        let user_id =req.headers['user_id']
        let requestBody=req.body;
        requestBody.user_id=user_id;
    
        await tasksModel.create(requestBody);
         return res.json({status:"success",message : "Task successful"});
    
      
    
       }catch(e){
        return res.json({status:"fail","message":e.toString()});
       }


}

export const updateTaskStatus = async (req,res)=>{

  try{

    let id=req.params.id;
    let status =req.params.status;
    let user_id = req.headers['user_id']
    
    await tasksModel.updateOne({"_id":id,"user_id":user_id }, {status:status});
 
    return res.json({status:"success","message":" Task update Successfull"});

  }
  catch(e){
    return res.json({status:"fail",message:e.toString()});

  }


}






export const taskListByStatus = async (req,res)=>{

    try{

        let user_id = req.headers['user_id']
        let status =req.params.status;
        
    
        let data = await tasksModel.find({"user_id":user_id }, {status:status});
     
        return res.json({status:"success","message":" Task List",data:data});
    
      }
      catch(e){
        return res.json({status:"fail",message:e.toString()});
    
      }

}

export const deleteTask = async (req,res)=>{

  try{
    let id =req.params.id;
    let user_id = req.headers['user_id'];
 
    await tasksModel.deleteOne({"_id":id,"user_id":user_id });
  }
  catch(e){
    return res.json({status:"fail",message:e.toString()});

  }





}

export const countTask = async (req,res)=>{

  try{
    let ObjectId = mongoose.Types.ObjectId
    let user_id = new Object( req.headers['user_id'])
    let data = await tasksModel.aggregate([
         {$match:{user_id:user_id}},
         {$group:{_id:"$status",sum:{$count:{}}}}
     ])
 
  }
  catch(e){
    return res.json({status:"fail",message:e.toString()});

  }

}
