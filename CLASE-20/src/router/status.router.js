import express from "express";
import ResponseBuilder from './utils/builders/responseBuilder.js';


const statusRouter = express.Router();

statusRouter.get("/ping", (req, res) => {

});

export default statusRouter