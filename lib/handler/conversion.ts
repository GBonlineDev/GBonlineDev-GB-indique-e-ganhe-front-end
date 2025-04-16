'use server';

import { SanitizedDataToConversionProps } from '@/libs/interfaces';

const API_ACCESS_KEY = process.env.API_ACCESS_KEY as string;
const API_BASE_URL_INDIQUE = process.env.API_BASE_URL_INDIQUE as string;

export async function ConversionReferral({
  sanitizedDataToConversion,
}: {
  sanitizedDataToConversion: SanitizedDataToConversionProps;
}): Promise<any> {
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

    const data = await response.json();

    if (!response.ok) {
      return {
        error: true,
        message: data.message || 'Falha ao processar a requisição',
        data: null,
      };
    }

    return {
      error: false,
      message: 'Sucesso',
      data: data,
    };
  } catch (error) {
    console.error('Erro na conversão:', error);
    return {
      error: true,
      message: 'Erro ao processar a requisição',
      data: null,
    };
  }
}
