'use server';

const API_ACCESS_KEY = process.env.API_ACCESS_KEY as string;
const API_BASE_URL_INDIQUE = process.env.API_BASE_URL_INDIQUE as string;

interface ResponseRegisterReferralClicksProps {
  error: boolean;
  message: string;
}
export async function RegisterReferralClicks(
  idRef: string
): Promise<ResponseRegisterReferralClicksProps> {
  try {
    const response = await fetch(`${API_BASE_URL_INDIQUE}/referral/${idRef}/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_ACCESS_KEY,
      },
      credentials: 'include',
    });

    if (response.status !== 200) {
      return {
        error: true,
        message: 'Falha ao registrar clique',
      };
    }

    return {
      error: false,
      message: 'Clique registrado com sucesso',
    };
  } catch (error) {
    console.error('Erro ao registrar clique:', error);
    return {
      error: true,
      message: 'Erro ao processar a requisição',
    };
  }
}
