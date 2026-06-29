import api from "./api";

export const getGraph = async () => {
  const { data } = await api.get("/graph");
  return data;
};

export const getDecisionGraph = async () => {
  const { data } = await api.get("/graph/decision-view");
  return data;
};

export const getGraphIntelligence = async () => {
  const { data } = await api.get("/graph/intelligence");
  return data;
};

export const exploreNode = async (type, value) => {
  const { data } = await api.get(
    `/graph/explore?type=${type}&value=${encodeURIComponent(value)}`
  );

  return data;
};