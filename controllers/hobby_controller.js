import mongoose from "mongoose";
import Hobby from "../models/hobby_model.js";
import { capitalizeFirstLetter } from "../utils/app_functions.js";

class HobbyController{
    static async addHobby(req,res,next){
        var {hobby}=req.body;
        hobby=capitalizeFirstLetter(hobby);
        const hobbySchema=new Hobby({
            _id:new mongoose.Types.ObjectId(),
            hobby:hobby,
        });
        hobbySchema.save().then(doc=>{
            res.json({data:doc});
        }).catch(err=>{
            next(err);
        })
    }
    static async getHobbies(req,res,next){
        await Hobby.find().sort("hobby").then((doc)=>{
            res.json({success:true,message:"All Hobbies are here.",data:doc});
        }).catch((err)=>{
            next(err);
        });
    }
}
export default HobbyController;