import axios from "axios";
const AI_URL="http://127.0.0.1:8000";
const checkHealth=async()=>{
    const response=await axios.get(`${AI_URL}/health`);
    return response.data;
};
module.exports={
    checkHealth,
};