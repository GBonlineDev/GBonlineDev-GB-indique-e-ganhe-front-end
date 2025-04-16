'use server';

import { SanitizedDataToConversionProps } from '@/libs/interfaces';

const API_ACCESS_KEY = process.env.API_ACCESS_KEY as string;
const API_BASE_URL_INDIQUE = process.env.API_BASE_URL_INDIQUE as string;

interface ResponseConversionReferralProps {
  error: boolean;
  message: string;
}
export async function ConversionReferral({
  sanitizedDataToConversion,
}: {
  sanitizedDataToConversion: SanitizedDataToConversionProps;
}): Promise<ResponseConversionReferralProps> {
  try {
    const response = await fetch(
      `${API_BASE_URL_INDIQUE}/referral/${sanitizedDataToConversion.idref}/conversion`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_ACCESS_KEY,
        },
        credentials: 'include',
        body: JSON.stringify({
          name: sanitizedDataToConversion.nome,
          email: sanitizedDataToConversion.email,
          phone: sanitizedDataToConversion.telefone,
          cpfCnpj: sanitizedDataToConversion.documento,
        }),
      }
    );

    if (!response.ok) {
      return {
        error: true,
        message: 'Falha ao processar a requisição',
      };
    }

    return {
      error: false,
      message: 'Sucesso',
    };
  } catch (error) {
    console.error('Erro na conversão:', error);
    return {
      error: true,
      message: 'Erro ao processar a requisição',
    };
  }
}
