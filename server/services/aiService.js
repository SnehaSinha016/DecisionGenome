import axios from "axios";
const AI_URL="https://decisiongenome.onrender.com/";
const checkHealth=async()=>{
    const response=await axios.get(`${AI_URL}/health`);
    return response.data;
};
module.exports={
    checkHealth,
};