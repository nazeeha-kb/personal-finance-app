"use client"

import PageHeader from "@/components/ui/PageHeader"
import Button from "@/components/ui/Button"
import { PlusIcon } from "@phosphor-icons/react"

export default function BudgetsPage() {
  return (
    <div>
      <PageHeader title="Budgets"
        action={
          <Button variant="primary" text="Add New Budget" leftIcon={PlusIcon} />
        } />
    </div>
  )
}