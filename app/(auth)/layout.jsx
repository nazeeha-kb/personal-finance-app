import Image from "next/image"
import Link from "next/link";

export default function AuthLayout({ children }) {
    return (
        <div className="flex lg:flex-row flex-col bg-beige-100 h-screen w-screen">
            <section className="flex lg:justify-start justify-center lg:rounded-none rounded-b-xl lg:p-5 p-6 lg:h-screen lg:bg-transparent bg-grey-900">
                <article className="h-full w-110 rounded-lg overflow-hidden bg-[url('/images/illustration-authentication.svg')] bg-cover bg-no-repeat bg-center p-10 lg:flex hidden flex-col items-start justify-between">
                    <Link href="/"><Image src="/images/logo-large.svg" width={100} height={100} alt="logo" /></Link>
                    <div className="text-white flex flex-col gap-5 self-end">
                        <h1 className="text-2xl font-bold">Keep track of your money and save for your future</h1>
                        <p className="text-sm">Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</p>
                    </div>
                </article>
                <Link href="/"><Image src="/images/logo-large.svg" width={100} height={100} className="lg:hidden block" alt="logo" /></Link>
            </section>
            <section className="flex items-center justify-center w-full h-full">
                {children}
            </section>
        </div>
    )
}