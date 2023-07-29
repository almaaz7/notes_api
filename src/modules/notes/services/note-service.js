import NotesModel from '../models/note-schema.js';
export const noteService = {
    async addNote(noteObject){
        try{
        const doc = await NotesModel.create(noteObject);
        return doc;
        }
        catch(err){
            throw err;
        }
    },
    async readAllNotes(){
        try{
        const docs = await NotesModel.find({}).select("title descr cdate importance").exec();
        return docs;    
    }
        catch(err){
            throw err;
        }
    },
    async deleteOneTask(title){
        try{
            console.log("Title is",title);
            const doc = await NotesModel.deleteOne({title:title});
            // return doc;
            }
            catch(err){
                throw err;
            }

    },
    async updateTask(noteId,noteBody){
        try{
            console.log("Title is",noteId);
            const doc = await NotesModel.findOneAndUpdate(
            {title:noteId},
             noteBody,
             {new:true}
            );
            console.log("updated successfully");
            return doc;
            // return doc;
            }
            catch(err){
                console.log(err)
                throw err;
            }  
    }
}