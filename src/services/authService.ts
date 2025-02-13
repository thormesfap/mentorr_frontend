import { redirect } from 'react-router-dom';
import { postRequest, getRequest, patchRequest, getAuthHeaders } from "./apiService.ts";




async function login(email:string, password:string) {
  try {
    const response = await postRequest("auth/login", { email, password });
    if (response.token) {
      sessionStorage.setItem("jwtToken", response.token);
      const userResponse = await me();
      if (userResponse.success) {
        sessionStorage.setItem("user", JSON.stringify(userResponse.data));
        return { success: true, token: response.token };
      } else {
        return {
          success: false,
          message: userResponse.message || "Falha ao buscar dados do usuário",
        };
      }
    } else {
      return { success: false, message: response.message || "Login Falhou" };
    }
  } catch (error ) {
    return { success: false, message: (error as Error).message };
  }
}

async function register(email:string, password:string, name:string) {
  try {
    const response = await postRequest("auth/register", {
      email,
      password,
      name,
    });
    if (response.id) {
      return { success: true, message: "Registro bem sucedido" };
    } else {
      return { success: false, message: response.message || "Registro Falhou" };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function me() {
  try {
    const response = await getRequest("auth/me");
    if (response.id) {
      return { success: true, data: response };
    } else {
      return {
        success: false,
        message: response.message || "Consulta de dados do usuário falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function profile(name = "", data_nascimento = "", telefone = "") {
  try {
    if (name == "" && data_nascimento == "" && telefone == "") {
      return {
        success: false,
        message: "Nenhum campo informado para atualização",
      };
    }
      const objeto: {[key: string]: string} = {};
    if (name != "") {
      objeto["name"] = name;
    }
    if (data_nascimento != "") {
      objeto["data_nascimento"] = data_nascimento;
    }
    if (telefone != "") {
      objeto["telefone"] = telefone;
    }

    const response = await patchRequest("auth/profile", objeto);
    if (response.id) {
      return { success: true, data: response };
    } else {
      return {
        success: false,
        message: response.message || "Atualização de dados do usuário falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function uploadProfilePicture(file: File) {
  const formData = new FormData();
  formData.append("foto_perfil", file);

  try {
    const response = await fetch(
      "http://localhost:8000/api/auth/profilePicture",
      {
        method: "patch",
        headers: {
          ...getAuthHeaders(),
        },
        body: formData,
      }
    );
    const result = await response.json();
    if (response.ok) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: result.message || "Falha ao atualizar a foto de perfil",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("jwtToken");
  redirect('/');
}

export { login, register, me, logout, profile, uploadProfilePicture };
