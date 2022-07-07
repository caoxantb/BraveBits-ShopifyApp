import { authenticatedFetch } from "@shopify/app-bridge-utils";

import { IPage } from "../interfaces/IPage";

const post = async (app: any, newPage: IPage) => {
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

const getAll = async (app: any) => {
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

const getCount = async (app: any) => {
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

const getById = async (app: any, id: string) => {
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

const editById = async (app: any, id: string, updatedPage: IPage) => {
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

const deleteById = async (app: any, id: string) => {
  const fetchAPIRequest = authenticatedFetch(app);
  await fetchAPIRequest(`/api/pages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

const deleteMany = async (app: any, pages: string[]) => {
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
