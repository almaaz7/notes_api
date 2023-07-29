import { noteService } from "../services/note-service.js";
import {STATUS_CODES} from "../../../shared/utils/app-constants.js";
 const noteController = {
    async getAllNotes(request, response){
        try{
        const docs = await noteService.readAllNotes();
        response.status(STATUS_CODES.SUCCESS).json({'notes':docs});
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Problem in Fetching Notes'});
            console.log(err);
        }
    },
    async addNote(request, response){
        const noteBody = request.body;
        console.log('Data Rec by Controller ', noteBody);
        try{
        const doc = await noteService.addNote(noteBody);
        if(doc && doc.title){
            response.status(STATUS_CODES.SUCCESS).json({message:'Note Added SuccessFully'});
        }
        else{
            response.status(STATUS_CODES.RESOURCE_NOT_FOUND).json({message:'Not Able to Add a Note'});
        }
        }
        catch(err){
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in Adding Note'});
            console.log(err);
        }
    },
    async deleteNote(request,response){
        
            const noteBody=request.body;
            console.log('Data deleted acc to  title  is ',noteBody);
            const title=request.query.title;
            console.log({title});
            await noteService.deleteOneTask(title).then((result)=>{
                response.status(STATUS_CODES.SUCCESS).json({message:'Note deleted SuccessFully'});
            }).catch((err)=>{
            response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in deleting the Note'});
            console.log(err)});
    
    },
    async updateNote(request,response){
        const noteBody=request.body;
      //  console.log('Data updated acc to  title  is ',noteBody);
        const noteId=noteBody.title;
        console.log(noteId);
        await noteService.updateTask(noteId,noteBody).then((doc)=>{
            response.status(STATUS_CODES.SUCCESS).json({'Note updated SuccessFully':doc});
        }).catch((err)=>{
        response.status(STATUS_CODES.SERVER_ERROR).json({message:'Error in updating the Note'});
        console.log(err)});
    }

}
    export default noteController;
