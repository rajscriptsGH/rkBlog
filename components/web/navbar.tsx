"use client"

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
    const { isAuthenticated, isLoading } = useConvexAuth()
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center md:gap-40">
                <Link href="/">
                    <h1 className="text-3xl font-bold">rk<span className="text-orange-500">Blog</span></h1>
                </Link>

                <div className="flex items-center">
                    <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                {isLoading ? null : isAuthenticated ? (
                    <Button className="cursor-pointer" onClick={() => authClient.signOut({})}>Logout</Button>
                ) : (
                    <>
                        <Link className={buttonVariants({ variant: "outline" })} href="/auth/login">Login</Link>
                        <Link className={buttonVariants()} href="/auth/sign-up">Signup</Link>
                    </>
                )
                }
            </div>
        </nav >
    )
}