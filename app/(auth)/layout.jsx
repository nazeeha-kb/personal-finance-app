import Image from "next/image"
import Link from "next/link";

export default function AuthLayout({ children }) {
    return (
        <div className="flex bg-beige-100 h-screen">
            <div className="p-5 h-screen">
                <div className="h-full w-110 rounded-lg overflow-hidden bg-[url('/images/illustration-authentication.svg')] bg-cover bg-no-repeat bg-center p-10 flex flex-col justify-between">
                    <Link href="/"><Image src="/images/logo-large.svg" width={100} height={100} className="" alt="logo" /></Link>
                    <div className="text-white flex flex-col gap-5  w-xs">
                        <h1 className="text-2xl font-bold">Keep track of your money and save for your future</h1>
                        <p className="text-sm">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                    </div>
                </div>

            </div>
            <div>
                {children}
            </div>
        </div>
    )
}