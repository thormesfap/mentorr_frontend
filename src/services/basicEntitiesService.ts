import { getRequest } from "./apiService.ts";

async function getEntity<T>(endpoint:string): Promise<{ success: boolean; data?: T[]; message?: string; }> {
  try {
    const response = await getRequest(endpoint);
    if (!response.message) {
      return { success: true, data: response.data.map(mapEntity<T>) };
    } else {
      return {
        success: false,
        message: response.message || "Busca falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function searchEntity<T>(endpoint: string, search: string): Promise<{ success: boolean; data?: T[]; message?: string; }> {
  try {
    const response = await getRequest(`${endpoint}?search=${search}`);
    if (!response.message) {
      return { success: true, data: response.data.map(mapEntity<T>) };
    } else {
      return {
        success: false,
        message: response.message || "Busca falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

function mapEntity<T>(data: {[key: string] : string}): T {
 
    return {
     id: data.id,
     nome: data.nome,
     created_at: data.created_at ? new Date(data.created_at) : undefined,
     updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
    } as T;
 } 
 


export { getEntity, searchEntity };
