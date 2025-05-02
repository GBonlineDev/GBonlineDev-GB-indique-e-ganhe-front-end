"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { GenerateLinkReferral } from "@/lib/handler/generate-link";

const formSchema = z.object({
  codcli: z.string().min(1, {
    message: "Código do cliente deve ter pelo menos 2 caracteres.",
  }).max(8, {
    message: "Código do cliente deve ter pelo menos 6 caracteres.",
  }).refine((data) => /^\d+$/.test(data), {
    message: "Código do cliente deve conter apenas números.",
  }),
});

export default function Referral() {
  const [referralLink, setReferralLink] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codcli: "",
    },
  });

  const { formState, setValue, setError } = form
  const { errors, isSubmitting } = formState;
  const codcli = form.watch("codcli");

  useEffect(() => {
    if (errors.codcli?.message) {
      setError("codcli", { })
    }
  }, [codcli, errors.codcli?.message])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 8) {
      value = value.slice(0, 8)
    }
    setValue("codcli", value)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await GenerateLinkReferral(data.codcli)
    if (response.error) {
      setError("codcli", { message: response.message })
    } else {
      setReferralLink(response.message)
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copiado para a área de transferência!");
  }

  return (
    <div className="w-full max-w-md space-y-8 p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Indique um Amigo</h1>
        <p className="text-muted-foreground mt-2">
          Preencha os dados do seu amigo para gerar o link de indicação
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="codcli"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código do Cliente</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite o código do cliente" 
                    {...field}
                    onChange={handleInputChange}
                    maxLength={8}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Gerar Link de Indicação
          </Button>
        </form>
      </Form>

      {referralLink && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input 
              value={referralLink} 
              readOnly 
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Clique no ícone para copiar o link
          </p>
        </div>
      )}
    </div>
  );
}
