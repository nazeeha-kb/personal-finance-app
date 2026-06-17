"use client"

import { useState } from "react"
import Input from "@/components/ui/Input"
import { EyeIcon } from "@phosphor-icons/react"
import Button from "@/components/ui/Button"
import Link from "next/link"
import { useRouter } from "next/navigation"
// Clerk
import { useSignIn, useClerk } from "@clerk/nextjs"

export default function SignInForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        formError: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState("")

    const { signIn } = useSignIn()
    const { setActive } = useClerk()
    const router = useRouter()

    if (!signIn) {
        // loader if present
        return (<div>Loading</div>);
    }

    // Submitting the form.

    const submitForm = async (e) => {
        e.preventDefault()

        // Validation
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setError({
            email: emailError,
            password: passwordError
        })

        if (emailError || passwordError) {
            return;
        }

        else {
            try {
                await signIn.create({
                    identifier: email,
                    password
                })

                if (signIn.status === "complete") {
                    await setActive({
                        session: signIn.createdSessionId
                    })

                    router.push("/overview")
                }
            }
            catch (err) {
                console.log(JSON.stringify(err, null, 2))
                setError({ formError: err.errors[0].message });
            }
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return "Email can not be empty"
        }
        else if (!emailRegex.test(email)) {
            return "Invalid Email format"
        }
    }
    const validatePassword = (password) => {
        if (!password) {
            return "password can not be empty"
        }
    }


    return (
        <article className="w-full max-w-xl p-8 rounded-xl bg-white mx-5">
            <form action="" className="flex flex-col gap-8" onSubmit={submitForm}>
                <h1 className="text-2xl font-bold">Sign In</h1>
                <div className="flex flex-col gap-4">
                    <Input type="email" id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
                    <Input type="password" id="password" label="Password" rightIcon={EyeIcon} iconWeight={"fill"} value={password} onChange={(e) => setPassword(e.target.value)} error={error.password} />
                </div>
                <Button type="submit" text="Sign in" variant="primary" className="w-full" />
                <p className="self-center text-grey-500 flex gap-1">
                    Need to Create an Account?
                    <Link href="/sign-up" className="text-grey-900 font-semibold underline">Sign Up</Link>
                </p>
            </form>
        </article>
    )
}