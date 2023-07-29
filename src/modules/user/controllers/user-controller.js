import { userService } from "../services/user-service.js";
import {STATUS_CODES} from "../../../shared/utils/app-constants.js";
 const UserController = {
    async getAllUser(request, response){
        const UserBody=request.query.email;
        // const userEmail=UserBody.email;
        try{
        const docs = await userService.ViewUser(UserBody);
        response.status(STATUS_CODES.SUCCESS).json(docs);
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Problem in Displaying User'});
            console.log(err);
        }
    },
    async addUser(request, response){
        const userBody = request.body;
        console.log('Data Rec by Controller ', userBody);
        try{
        const doc = await userService.addUser(userBody);
        if(doc && doc.email){
            response.status(STATUS_CODES.SUCCESS).json({message:'User Registered SuccessFully'});
        }
        else{
            response.status(STATUS_CODES.RESOURCE_NOT_FOUND).json({message:'Not Able to Resister a User'});
        }
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in Registering User'});
            console.log(err);
        }
    },
    async deleteUser(request,response){
        
            const UserBody=request.body;
            console.log('User details deleted acc to  email address  is ',UserBody);
            const email=request.query.email;
            console.log({email});
            await userService.deleteOneTask(email).then((result)=>{
                response.status(STATUS_CODES.SUCCESS).json({message:'User details deleted SuccessFully'});
            }).catch((err)=>{
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in deleting the User details'});
            console.log(err)});
    
    },
    async updateUser(request,response){
        const UserBody=request.body;
        console.log('Data updated acc to  email  is ',UserBody);
        const userEmail=UserBody.email;
       // console.log({userEmail});
        await userService.updateTask(userEmail,
            UserBody).then((doc)=>{
            response.status(STATUS_CODES.SUCCESS).json({'User details updated SuccessFully':doc});
        }).catch((err)=>{
        response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in updating the User details '});
        console.log(err)});
    }
    

}
export default UserController;
