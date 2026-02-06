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
import { signUpSchema } from "../schemas/auth";
import { Input } from "@/components/ui/input";
import z from "zod";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        }
    });

    function onSubmit(data: z.infer<typeof signUpSchema>) {
        startTransition(async () => {
            await authClient.signUp.email({
                email: data.email,
                name: data.name,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Account created successfully");
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
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-5">
                        <Controller name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="RK Razz" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                    )}
                                </Field>
                            )} />
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
                                <span>Sign up</span>
                            )}
                        </Button>
                    </FieldGroup>
                </form>
                <p className="text-center mt-2.5">Already have an account? <span className="text-red-600 ml-2 underline hover:text-blue-500"> <Link href="/auth/login">Signin</Link> </span></p>
            </CardContent>
        </Card>
    )
}