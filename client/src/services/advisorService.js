import api from "./api";

export const getExecutiveAdvice = async (decision) => {

    const { data } = await api.post(

        "/executive-advisor",

        decision

    );

    return data;

};