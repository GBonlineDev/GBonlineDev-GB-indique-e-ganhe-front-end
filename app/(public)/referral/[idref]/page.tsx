'use client';

import type React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import ReferralForm from '@/components/referral-form/form';

export default function FormRegisterByLink() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const HandleSubmitted = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="relative z-10 h-[550px] w-full max-w-sm overflow-hidden rounded-3xl border border-blue-500/10 bg-black_base shadow-full_dark backdrop-blur-2xl">
      <div className="flex h-full flex-col justify-around space-y-6 p-6">
        {/* Header */}

        {isSubmitted ? (
          <div className="flex h-1/2 flex-col items-center justify-between space-y-4 py-8 text-center ">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
              <svg
                className="h-8 w-8 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-xl font-medium text-white">Enviado com sucesso!</h3>

            <p className="text-sm text-zinc-400">Obrigado por enviar seus dados.</p>

            <Image alt="" src={'../images/logo-blue.png'} width={80} height={80} />
          </div>
        ) : (
          <ReferralForm HandleSubmitted={HandleSubmitted} />
        )}

        {/* Footer */}

        <div className="border-t border-white/10 pt-4 text-center">
          <span className="text-xs text-zinc-500">
            © 2025 Grupo GB-Online. Direitos reservados.
          </span>
        </div>
      </div>
    </div>
  );
}
