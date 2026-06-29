import api from "./api";

export const exploreGraph = async (

    nodeId,

    depth = 2

) => {

    const { data } = await api.get(

        `/graph/explore/${encodeURIComponent(nodeId)}?depth=${depth}`

    );

    return data;

};