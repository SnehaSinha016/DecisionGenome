import api from "./api";

export const getDecisionImpact = async (id) => {

    const { data } = await api.get(

        `/graph/impact/${id}`

    );

    return data;

};