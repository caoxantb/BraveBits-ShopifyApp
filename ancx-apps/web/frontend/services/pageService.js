import { authenticatedFetch } from "@shopify/app-bridge-utils";

const post = async (app, newPage) => {
  const fetchAPIRequest = authenticatedFetch(app);
  const res = await fetchAPIRequest("/api/pages", {
    method: "POST",
    body: JSON.stringify(newPage),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const getAll = async (app) => {
  const fetchAPIRequest = authenticatedFetch(app);
  const res = await fetchAPIRequest("/api/pages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

const getCount = async (app) => {
  const fetchAPIRequest = authenticatedFetch(app);
  const res = await fetchAPIRequest("/api/pages/count", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

const getById = async (app, id) => {
  const fetchAPIRequest = authenticatedFetch(app);
  const res = await fetchAPIRequest(`/api/pages/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

const editById = async (app, id, updatedPage) => {
  const fetchAPIRequest = authenticatedFetch(app);
  const res = await fetchAPIRequest(`/api/pages/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedPage),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

const deleteById = async (app, id) => {
  const fetchAPIRequest = authenticatedFetch(app);
  await fetchAPIRequest(`/api/pages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

const deleteMany = async (app, pages) => {
  const fetchAPIRequest = authenticatedFetch(app);
  await fetchAPIRequest(`/api/pages`, {
    method: "DELETE",
    body: JSON.stringify(pages),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

const pageService = {
  post,
  getAll,
  getCount,
  getById,
  editById,
  deleteById,
  deleteMany,
};

export default pageService;
