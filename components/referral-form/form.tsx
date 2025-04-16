// components/ReferralForm.tsx

'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConversionReferral } from '@/lib/handler/conversion';
import { RegisterReferralClicks } from '@/lib/handler/register';
import { SanitizedDataToConversionProps } from '@/libs/interfaces';

// Definindo o esquema de validação com Zod
const schema = z.object({
  nome: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .refine(
      val => {
        const names = val.trim().split(' ');
        return names.length >= 2;
      },
      {
        message: 'Por favor, insira pelo menos dois nomes.',
      }
    ),
  telefone: z
    .string()
    .min(14, 'Telefone inválido')
    .max(15, 'Telefone deve ter no máximo 15 caracteres'),
  documento: z
    .string()
    .max(18, 'Documento deve ter no máximo 18 caracteres')
    .refine(
      val => {
        const documentoNumeros = val.replace(/\D/g, '');
        return documentoNumeros.length === 11 || documentoNumeros.length === 14;
      },
      {
        message: 'CPF/CNPJ inválido',
      }
    ),
  email: z
    .string()
    .email('E-mail inválido')
    .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Formato de e-mail inválido',
    }),
});

export default function ReferralForm({ HandleSubmitted }: { HandleSubmitted: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { idref } = useParams() as { idref: string };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
      value = value.replace(/^(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    setValue('telefone', value);
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    setValue('documento', value);
  };

  React.useEffect(() => {
    RegisterReferralClicks(idref);
  }, [idref]);

  const onSubmit = async (data: any) => {
    try {
      const sanitizedDataToConversion: SanitizedDataToConversionProps = {
        ...data,
        nome: data.nome.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''),
        telefone: data.telefone,
        documento: data.documento,
        idref: idref,
      };

      await ConversionReferral({ sanitizedDataToConversion });
      HandleSubmitted();
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome" className="text-zinc-300">
          Nome
        </Label>
        <Input
          id="nome"
          {...register('nome')}
          placeholder="Digite seu nome completo"
          className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
        />
        {errors.nome && (
          <p className="mt-1 text-xs text-red-400">{errors.nome.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefone" className="text-zinc-300">
          Telefone
        </Label>
        <Input
          id="telefone"
          {...register('telefone')}
          placeholder="(00) 00000-0000"
          className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
          onChange={handlePhoneChange}
          maxLength={15}
        />
        {errors.telefone && (
          <p className="mt-1 text-xs text-red-400">{errors.telefone.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="documento" className="text-zinc-300">
          Documento (CPF/CNPJ)
        </Label>
        <Input
          id="documento"
          {...register('documento')}
          placeholder="000.000.000-00 ou 00.000.000/0000-00"
          className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
          onChange={handleDocumentChange}
          maxLength={18}
        />
        {errors.documento && (
          <p className="mt-1 text-xs text-red-400">{errors.documento.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">
          E-mail
        </Label>
        <Input
          id="email"
          {...register('email')}
          placeholder="Digite seu e-mail"
          className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message as string}</p>
        )}
      </div>

      <Button type="submit" className="mt-6 w-full bg-emerald-600 text-white hover:bg-emerald-700">
        Enviar
      </Button>
    </form>
  );
}
