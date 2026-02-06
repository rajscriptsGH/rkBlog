"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../schemas/auth";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { spawn } from "child_process";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();

    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    function onSubmit(data: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged in successfully");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error(error.error.message);
                    },
                },
            });
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>login to create or read blogs</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-5">
                        <Controller name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="abc@gmail.com" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                    )}
                                </Field>
                            )} />
                        <Controller name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="******" type="password" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                    )}
                                </Field>
                            )} />
                        <Button disabled={isPending} className="cursor-pointer">
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (
                                <span>Login</span>
                            )}
                        </Button>
                    </FieldGroup>
                </form>
                <p className="text-center mt-2.5">Don't have an account? Create one<span className="text-red-600 ml-2 underline hover:text-blue-500"> <Link href="/auth/sign-up">Signup</Link> </span></p>
            </CardContent>
        </Card>
    )
}