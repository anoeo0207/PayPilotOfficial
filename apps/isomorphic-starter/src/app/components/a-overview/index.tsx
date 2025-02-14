import ParticipantsList from "./recent_invoices-components/participants-list";
import Card from "./recent_invoices-components/card";
import WelcomeArea from "./recent_invoices-components/welcome-banner";
import Chart from "@/app/shared/dashboard/cash-in-bank";
import StorageSummary from "@/app/shared/file/dashboard/storage-summary";
import { fetchRevenue, getTotalMoney } from "@/app/lib/data";


export default async function Dashboard() {
    const revenueData = await fetchRevenue();

    return (
        <div className="@container">
            <div className="space-y-6">
                <WelcomeArea />
                <Card />
                <Chart data={revenueData}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ParticipantsList />
                    <StorageSummary />
                </div>
            </div>
        </div>
    );
}