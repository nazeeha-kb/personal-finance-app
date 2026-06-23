"use client"

import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import Link from "next/link"
import { useState } from "react"

import VerificationForm from "./VerificationForm"
// From Clerk
import { useSignUp } from "@clerk/nextjs"

export default function SignUpForm() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState({
        formError: "",
        name: "",
        email: "",
        password: ""
    })
    const [pendingVerification, setPendingVerification] = useState(false)
    const [showPassword, setShowPassword] = useState("")

    const { signUp } = useSignUp();

    if (!signUp) {
        // loader if present
        return (<div>Loading</div>);
    }


    // Submitting form.

    const submitForm = async (e) => {
        e.preventDefault()

        // Validation
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        setError({
            name: nameError,
            email: emailError,
            password: passwordError
        })

        if (nameError || emailError || passwordError) {
            return;
        }

        // Create and verification
        else {

            try {
                await signUp.create({
                    firstName: name,
                    emailAddress: email,
                    password
                })

                await signUp.verifications.sendEmailCode()
                setPendingVerification(true);
            } catch (error) {
                console.log(JSON.stringify(error, null, 2))
                setError({ formError: error.errors[0].message });
            }
        }

    }

    // Validation


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



    return (
        <article className="w-full max-w-xl p-8 rounded-xl bg-white mx-5">
            {!pendingVerification ? (
                <form action="" className="flex flex-col gap-8" onSubmit={submitForm}>
                    <h1 className="text-2xl font-bold">Sign In</h1>
                    <div className="flex flex-col gap-4">
                        <Input type="text" id="name" label="Name" value={name} onChange={(e) => setName(e.target.value)} error={error.name} />
                        <Input type="email" id="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={error.email} />
                        <Input type="password" id="password" label="Create Password" iconWeight="fill" helperText="Passwords must be at least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} error={error.password} />
                    </div>
                    {/* Clerk's CAPTCHA widget */}
                    <div id="clerk-captcha" />
                    <Button type="submit" text="Sign Up" variant="primary" className="w-full" />
                    <p className="self-center text-grey-500">Already have an account?
                        <Link href="/signin" className="pl-1 text-grey-900 font-semibold underline">Sign In</Link>
                    </p>
                </form>
            ) : (
                <VerificationForm error={error.formError} />
            )}
        </article>
    )
}