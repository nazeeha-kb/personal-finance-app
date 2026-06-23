"use client"

import PageHeader from "@/components/ui/PageHeader"
import Button from "@/components/ui/Button"
import { PlusIcon } from "@phosphor-icons/react"

export default function PotsPage() {
    return (
        <div>
            <PageHeader title="Pots"
                action={
                    <Button variant="primary" text="Add New Pot" leftIcon={PlusIcon} />
                } />
        </div>
    )
}