import api from "./api";

export const getGraph = async () => {
  const { data } = await api.get("/api/graph");
  return data;
};

export const getDecisionGraph = async () => {
  const { data } = await api.get("/api/graph");
  return data;
};

export const getGraphIntelligence = async () => {
  const { data } = await api.get("/api/graph/intelligence");
  return data;
};

export const exploreNode = async (type, value) => {
  const { data } = await api.get(
    `/api/graph/explore?type=${type}&value=${encodeURIComponent(value)}`
  );

  return data;
};