import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
    text: {
        type : String,
        required:true,
        unique:true
    },
    votes: { type: Number, default: 0 },
    
});

const questionSchema = new mongoose.Schema({
    
    title: { 
        type: String, 
        required: true 
    },
    options: [optionSchema]
    
});

export const questionsModel= mongoose.model('Questions', questionSchema);