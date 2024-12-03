import DashboardTemplate from "../_components/template";
import EventCard from "../_components/dashboard/event-card";
import TransactionCard from "../_components/dashboard/transaction-card";
import ChartCard from "../_components/dashboard/chart-card";
import TransactionChart from "../_components/dashboard/transaction-chart";
import TransactionDateRangePicker from "../_components/dashboard/transaction-date-picker";

const DashboardPage: React.FC = async () => {
  return (
    <DashboardTemplate>
      <div className="flex flex-1 flex-col items-center gap-6">
        <div className="grid w-full gap-4 lg:gap-6">
          <ChartCard title="Transactions" Filter={TransactionDateRangePicker}>
            <TransactionChart />
          </ChartCard>
        </div>

        <div className="grid w-full gap-4 md:gap-6 lg:grid-cols-2">
          <TransactionCard />
          <EventCard />
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default DashboardPage;
