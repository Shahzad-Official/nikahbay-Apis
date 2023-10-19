import Joi from "joi";
import { BadRequest } from "../handlers/error_handler.js";

function hobbyMiddleware(req,res,next){
    var hobbySchema=Joi.object({
        hobby:Joi.string().min(3).required(),
    });
    const {error,value}=hobbySchema.validate(req.body);
    if(error){
        throw new BadRequest(error.details[0].message);
    }else{
        next();
    }
}

export {hobbyMiddleware};