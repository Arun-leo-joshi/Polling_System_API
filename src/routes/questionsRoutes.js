import express from 'express';
import questionController from '../controllers/questionController.js';


const Questioncontroller=new questionController();
const questionrouter = express.Router();

questionrouter.get("/:id",Questioncontroller.viewQuestions);
questionrouter.post('/create',Questioncontroller.createQuestion);
questionrouter.delete("/:id/delete",Questioncontroller.deleteQuestion);
questionrouter.put('/:id/options/create', Questioncontroller.addOptionToQuestion);



export default questionrouter;