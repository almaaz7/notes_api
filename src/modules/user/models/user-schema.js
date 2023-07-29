//import mongoose from '../../../shared/db/connection.js';
import mongoose, { SchemaTypes } from 'mongoose';
import {AppConstants} from '../../../shared/utils/app-constants.js';
import bcrypt from 'bcrypt';
//const bcrypt = require('bcrypt');
const schemaName = AppConstants.SCHEMA.USER_SCHEMA;
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username:{
        type:SchemaTypes.String,
         required:true,
         minLength: 3,//this is my built in validator like minLength and maxLength
         maxLength: 25,
         match: /^[A-Za-z]+$/ //this matches the name should me only alphabet
        },
    password:{
        type:SchemaTypes.String,
        required:true,
         minLength: 8,//this is my built in validator like minLength and maxLength
         maxLength: 25
    },
    phone:{
        type:SchemaTypes.String,
          validate: {
            validator: function(v) {
              return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
          required: [true, 'User phone number required']
    
    },
    email:{
        type:SchemaTypes.String,
        required:true,
        unique:true,
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    status:{type:SchemaTypes.String , default:'A'},
    creationDate:{type:SchemaTypes.Date, default: new Date()}
    //opt:{},
    //remarks:[]
});

UserSchema.pre('save', async function (next) {//ye line mongoose middleware function register krta hai 
    try {
      if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); // Generate a salt with a cost factor of 10
        this.password = await bcrypt.hash(this.password, salt);
      }
      return next();
    } catch (err) {
      return next(err);
    }
  });
const UserModel = mongoose.model(schemaName, UserSchema);
export default UserModel;

