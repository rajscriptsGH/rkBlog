import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
    return (
        <nav className="w-full py-5 flex items-center justify-between">
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="text-3xl font-bold">rk<span className="text-orange-500">Blog</span></h1>
                </Link>

                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href="/">Home</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/blog">Blog</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href="/create">Create</Link>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link className={buttonVariants({ variant: "outline" })} href="/auth/login">Login</Link>
                <Link className={buttonVariants()} href="/auth/sign-up">Signup</Link>
            </div>
        </nav >
    )
}