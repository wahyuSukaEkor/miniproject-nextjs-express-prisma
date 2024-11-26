"use client";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const EventDashboard: React.FC = () => {
  const data = {
    totalEvents: 25,
    upcomingEvents: 5,
    pastEvents: 20,
    totalRegistrations: 1500,
    totalRevenue: 3000000,
    monthlyRevenue: [500000, 700000, 300000, 800000, 600000, 500000],
  };

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (IDR)',
        data: data.monthlyRevenue,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Event Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2>Total Events</h2>
          <p>{data.totalEvents}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2>Registrations</h2>
          <p>{data.totalRegistrations}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h2>Total Revenue</h2>
          <p>IDR {data.totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="mb-4">Monthly Revenue</h2>
        <Bar data={revenueChartData} />
      </div>
    </div>
  );
};

export default EventDashboard;
