import questionRepository from "../Repository/questionRepository.js";
import { questionsModel } from "../models/questionmodel.js";

// creating instance of repository class
const Questionrepository=new questionRepository();

export default class questionController{

    async viewQuestions(req,res){

        try{
            const questionId=req.params.id;
            
            const foundQuestion= await Questionrepository.viewQuestions(questionId);
            if(!foundQuestion){
                res.status(404).send("Question not found")
            }else{
                res.status(200).send(foundQuestion);
            }
        }catch(error){
            return res.status(500).send({ error: error.message });
        }

    }
    

    async createQuestion(req,res){
        try {
            const {title,options}  = req.body;

            // Check if question already exists?
            const existingQuestion = await questionsModel.findOne({ title: title });
            
            if (existingQuestion) {
                return res.status(500).send("Question already exists");
            }else{
                // Create Question
                const question=await Questionrepository.createQuestion(title,options)
                if(question){
                    return res.status(201).send(question);
                }
            }
            
        }catch(error){
            return res.status(500).send({ error: error.message });
        }
    }


    async deleteQuestion(req,res){
        try{
            const id=req.params.id;
            console.log(id);

            // check if question exists
            const question=await questionsModel.findOne({_id:id});

            if(question){

                const deleted=await Questionrepository.deleteQuestion(id);
                if(deleted){
                return res.status(200).send("Question Successfully Deleted");
                }

            }else{
                return res.status(404).send("Question not Found");
            }

        }catch(error) {
            return res.status(500).send({ error: error.message });
        }
    }


    async addOptionToQuestion(req,res){
        try{
            const id=req.params.id;
            const option= req.body;

            // check if Question exists
            const ExistingQuestion=await questionsModel.findById({_id:id});

            if(!ExistingQuestion){
                return res.staus(404).send("Question not found");
            }

            // check if option already exists in the ExistingQuestion
            const optionExists = ExistingQuestion.options.some(opt => opt.text === option.text);
            
            if (optionExists) {
                return res.status(409).send('Option already exists');
            }
            
            if(ExistingQuestion && !optionExists){
                const updatedQuestion=await Questionrepository.addOptionToQuestion(id,option);
                return res.status(200).send("Option succesfully added"+updatedQuestion);
            }
        }catch(error) {
            return res.status(500).send({ error: error.message });
        }
         
    }

}