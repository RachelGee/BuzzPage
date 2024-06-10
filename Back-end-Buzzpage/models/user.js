const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"/assets/defaulticon_1-Dwk_qUyK.png"
    },
    image2:{
        type:String,
        default:"../../Front-end-Buzzpage/src/assets/images/logo.png"
    },
    bio:{
        type: String,
        default:""
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.hashedPassword;
    }
});

module.exports = mongoose.model('User', userSchema);