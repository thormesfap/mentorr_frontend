import { postRequest } from "./apiService.ts";


async function createMentoria(valor: number, userId: number, mentorId: number, quantidadeSessoes: number) {
    try {
        const response = await postRequest("mentoria", {
            valor: valor,
            user_id: userId,
            mentor_id: mentorId,
            quantidade_sessoes: quantidadeSessoes,
            expectativa: ''
        });
        if (!response.message) {
            return {success: true, data: response}
        } else {
            return {success: false, message: response.message || 'Cadastro de mentoria falhou'}
        }
    } catch (error) {
        return { success:false, message: (error as Error).message}
    }
}

export {createMentoria}