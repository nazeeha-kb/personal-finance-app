"use client"

import Input from "@/components/ui/Input"
import { EyeIcon } from "@phosphor-icons/react"
import Button from "@/components/ui/Button"
import Link from "next/link"
import { useState } from "react"

export default function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({
        name: "",
        email: "",
        password: ""
    })

    const validateName = (name) => {
        const cleanName = name.trim();
        // spaces, hyphens and aphostrophies allowed.
        const nameRegex = /^[A-Za-z\s'-]+$/;

        if (!cleanName) {
            return "Name can not be empty"
        }
        else if (!nameRegex.test(cleanName)) {
            return "Name must contain only letters";
        }
    }
    const validateEmail = (email) => {
        const cleanEmail = email.trim()

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!cleanEmail) {
            return "Email can not be empty"
        }
        else if (!emailRegex.test(cleanEmail)) {
            return "Invalid Email format"
        }
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!password) {
            return "password can not be empty"
        }
        else if (!passwordRegex.test(password)) {
            return "Password format is invalid"
        }
    }

    const submitForm = (e) => {
        e.preventDefault()

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);
        const nameError = validateName(name);

        setError({
            name: nameError,
            email: emailError,
            password: passwordError
        })

        if (!emailError && !passwordError) {
            console.log("signed in")
        }
    }


    return (
        <article className="w-full max-w-xl p-8 rounded-xl bg-white mx-5">
            <form action="" className="flex flex-col gap-8" onSubmit={submitForm}>
                <h1 className="text-2xl font-bold">Sign In</h1>
                <div className="flex flex-col gap-4">
                    <Input type="text" id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} error={error.name} />
                    <Input type="email" id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
                    <Input type="password" id="password" label="Create Password" rightIcon={EyeIcon} iconWeight="fill" helperText="Passwords must be at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} error={error.password} />
                </div>
                <Button type="submit" text="Sign in" variant="primary" className="w-full" />
                <p className="self-center text-grey-500">Already have an account? <Link href="/signin" className="text-grey-900 font-semibold underline">Sign In</Link></p>
            </form>
        </article>
    )
}