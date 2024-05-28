import { questionsModel } from "../models/questionmodel.js";


export default class optionrepository{

    async deleteOption(optionId){

        try{
            // step1: Find question whose option needed to be deleted with optionId
            const foundQuestion=await questionsModel.findOne({'options._id':optionId});
            
            if(!foundQuestion) {
                throw new Error('Option not found');
            }
            const questionId=foundQuestion._id;
            
            // step 2 pull/delete option from that question by passing questionId
            const deletedOption= await questionsModel.findByIdAndUpdate(
                { _id : questionId },
                { $pull: { options: { _id: optionId } } },
                { new: true }
            );
            
            return deletedOption;

        }catch(err){
            console.log(err);
        }    
    }


    async addVote(optionId){
        try{
            const addedVote = await questionsModel.findOneAndUpdate(
                { "options._id": optionId },
                { $inc: { "options.$.votes": 1 } },
                { new: true }
            );
              
            return addedVote;

        }catch(err){
            console.log(err);
        }
    }
}