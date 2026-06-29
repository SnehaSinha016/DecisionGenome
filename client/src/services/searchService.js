import api from "./api";

export const searchGraph = async (type, value) => {

    const { data } = await api.get(
        `/graph/search?q=${encodeURIComponent(value)}`
    );

    return data;

};