import { questionsModel } from "../models/questionmodel.js";
export default class questionRepository{

    async viewQuestions(questionId){
        try{
            const foundQuestion=await questionsModel.findById({_id:questionId})
            return foundQuestion;
        }catch(err){
            console.log(err);
        }
    }
    
    async createQuestion(title,options){
        try{
            const question = new questionsModel({ title, options });
            await question.save();
            return question;
        }catch(err){
            console.log(err);
        }
    }

    async deleteQuestion(id){
        try{
            const deleted =await questionsModel.findOneAndDelete({ _id:id});
            return deleted;
        }catch(err){
            console.log(err);
        } 
    }

    async addOptionToQuestion(id,option){
        try{
            const updatedQuestion=await questionsModel.findByIdAndUpdate(
                // 1st find question
                {_id:id},

                //  2nd to add option to the question
                { $push: { options:option } },
                { new: true, useFindAndModify: false }
            )

            return updatedQuestion;

        }catch(err){
            console.log(err);
        }
       
    }
}