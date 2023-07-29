import UserModel from '../models/user-schema.js';
import bcrypt from 'bcrypt';
export const userService = {
    async addUser(userObject){
        try{
       // console.log(userObject);
        const doc = await UserModel.create(userObject);
        return doc;
        }
        catch(err){
            throw err;
        }
    },
    async ViewUser(userEmail) {
        try {
          const docs = await UserModel.findOne({ email: userEmail }).select("username password phone email").exec();
          return docs;
        } catch (err) {
          console.error("Error while fetching user:", err);
          throw err;
        }
      },
      
    async deleteOneTask(email){
        try{
            console.log("Email is",email);
            const doc = await UserModel.deleteOne({email:email});
            // return doc;
            }
            catch(err){
                throw err;
            }

    },
   
async  updateTask(userEmail, UserBody) {
  try {
    // Hash the new password
    if (UserBody.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(UserBody.password, saltRounds);
      UserBody.password = hashedPassword;
    }

    // Perform the update
    const doc = await UserModel.findOneAndUpdate(
      { email: userEmail },
      UserBody,
      { new: true }
    );

    console.log("User details updated successfully");
    return doc;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

    // async updateTask(userEmail,UserBody){
    //     try{
    //         console.log("email is",userEmail);
    //         const doc = await UserModel.findOneAndUpdate(
    //         {email:userEmail},
    //           UserBody,
    //          {new:true}
    //         );
    //         console.log("updated successfully");
    //         return doc;
    //         // return doc;
    //         }
    //         catch(err){
    //             console.log(err)
    //             throw err;
    //         }  
    // }
}