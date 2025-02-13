import { globalLoading } from "./appState";

const baseUrl = "http://localhost:8000";
const apiUrl = `${baseUrl}/api`;

function getAuthHeaders(json: boolean = true) {
  const headers: HeadersInit = new Headers();
  const token = sessionStorage.getItem("jwtToken");
  if (json) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

async function getRequest(endpoint: string) {
  globalLoading(true);
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    headers: getAuthHeaders(),
  });
  globalLoading(false);
  return response.json();
}

async function postRequest(endpoint: string, data: object) {
  globalLoading(true);
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  globalLoading(false);
  return response.json();
}

async function patchRequest(endpoint: string, data: object) {
  globalLoading(true);
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  globalLoading(false);
  return response.json();
}

async function deleteRequest(endpoint: string) {
  globalLoading(true);
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  globalLoading(false);
  return response.json();
}

async function uploadFile(fieldName: string, file: File, endpoint: string) {
  const formData = new FormData();
  formData.append(fieldName, file);
  globalLoading(true);  
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: getAuthHeaders(false),
    body: formData,
  });
  globalLoading(false);
  return response.json();
}

export {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
  uploadFile,
  getAuthHeaders,
  baseUrl,
};
