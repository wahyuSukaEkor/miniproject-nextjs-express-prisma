"use client";
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend, PointElement);

interface EventData {
  totalEvents: number;
  upcomingEvents: number;
  pastEvents: number;
}
interface RegistrationData {
  totalRegistrations: number;
  newRegistrations: number;
}
interface TransactionData {
  totalRevenue: number;
  monthlyRevenue: number[];
}

const EventDashboard: React.FC = () => {
  const eventData: EventData = {
    totalEvents: 25,
    upcomingEvents: 5,
    pastEvents: 20,
  };
  const registrationData: RegistrationData = {
    totalRegistrations: 1500,
    newRegistrations: 300,
  };
  const transactionData: TransactionData = {
    totalRevenue: 3000000,
    monthlyRevenue: [500000, 700000, 300000, 800000, 600000, 500000],
  };

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (IDR)',
        data: transactionData.monthlyRevenue,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  const registrationChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Registrations',
        data: [150, 200, 100, 300, 250, 400],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Event Management Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Events</h2>
          <p className="text-3xl font-bold text-blue-600">{eventData.totalEvents}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Upcoming Events</h2>
          <p className="text-3xl font-bold text-green-600">{eventData.upcomingEvents}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Past Events</h2>
          <p className="text-3xl font-bold text-red-600">{eventData.pastEvents}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Registrations</h2>
          <p className="text-3xl font-bold text-purple-600">{registrationData.totalRegistrations}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">New Registrations</h2>
          <p className="text-3xl font-bold text-indigo-600">{registrationData.newRegistrations}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Revenue (IDR)</h2>
          <p className="text-3xl font-bold text-yellow-600">IDR {transactionData.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Revenue</h2>
          <Bar data={revenueChartData} />
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Registrations</h2>
          <Line data={registrationChartData} />
        </div>
      </div>
    </div>
  );
};
export default EventDashboard;
