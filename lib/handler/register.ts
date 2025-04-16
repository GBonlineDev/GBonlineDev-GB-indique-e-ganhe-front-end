'use server';

const API_ACCESS_KEY = process.env.API_ACCESS_KEY as string;
const API_BASE_URL_INDIQUE = process.env.API_BASE_URL_INDIQUE as string;

export async function RegisterReferralClicks(idRef: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL_INDIQUE}/referral/${idRef}/click`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_ACCESS_KEY,
    },
    credentials: 'include',
  });

  if (response.status === 200) {
    return {
      error: true,
      message: 'falha em executar',
    };
  }

  return {
    error: true,
    message: 'falha em executar',
  };
}
