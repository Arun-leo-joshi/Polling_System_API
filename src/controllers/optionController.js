import optionrepository from "../Repository/optionrepository.js";

// creating instance of repository class
const OptionRepository=new optionrepository();

export default class optionController{

    async deleteOption(req,res){

        try{
            const optionId=req.params.id;
            console.log(optionId);
            const deletedOption=await OptionRepository.deleteOption(optionId);
            if(deletedOption){
                return res.status(200).send("Option Successfully Deleted");
            }
        }catch(error) {
            return res.status(500).send({ error: error.message });
        }
        
    }


    async addVote(req,res){
        try{
            const optionId=req.params.id;
            const addedVote=await OptionRepository.addVote(optionId);

            if(addedVote){
                res.status(200).send("Succesfully added Vote");
            }else{
                return res.staus(404).send("Question not found");
            }

        }catch(error) {
            return res.status(500).send({ error: error.message });
        }
        

    }
}