import PageHeader from "@/components/ui/PageHeader"
import TransactionsTable from "@/components/transactions/TransactionsTable"

export default function TransactionsPage() {
    return (
        <div className="space-y-5">
            <PageHeader title="Transactions" />
            <TransactionsTable />
        </div>
    )
}