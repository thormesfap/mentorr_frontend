const baseUrl = "http://localhost:8000";
const apiUrl = `${baseUrl}/api`;

function getAuthHeaders() {
  const headers: HeadersInit = new Headers();
  const token = sessionStorage.getItem("jwtToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
}

async function getRequest(endpoint: string) {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.json();
}

async function postRequest(endpoint: string, data: object) {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function patchRequest(endpoint: string, data: object) {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(endpoint: string) {
  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
  return response.json();
}

async function uploadFile(fieldName: string, file: File, endpoint: string) {
  const formData = new FormData();
  formData.append(fieldName, file);

  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });
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
