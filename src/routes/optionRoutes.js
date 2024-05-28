import express from 'express';
import optionController from '../controllers/optionController.js';

const optionrouter= express.Router();
const OptionController= new optionController();

optionrouter.delete("/:id/delete", OptionController.deleteOption);
optionrouter.put("/:id/add_vote",OptionController.addVote);


export default optionrouter;