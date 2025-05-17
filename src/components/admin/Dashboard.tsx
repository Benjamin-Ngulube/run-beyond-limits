
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Registrations",
      value: 2648,
      change: "+12%",
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Completed Payments",
      value: 2134,
      change: "+8%",
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Pending Approvals",
      value: 514,
      change: "-2%",
      isPositive: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Staff Members",
      value: 42,
      change: "+3",
      isPositive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
    },
  ];

  const recentRegistrations = [
    { id: "REG-1234", name: "John Smith", package: "Premium Runner", date: "2025-05-14", status: "Paid" },
    { id: "REG-1235", name: "Emma Johnson", package: "Basic Runner", date: "2025-05-14", status: "Pending" },
    { id: "REG-1236", name: "Michael Chen", package: "Elite Experience", date: "2025-05-13", status: "Paid" },
    { id: "REG-1237", name: "Sarah Williams", package: "Premium Runner", date: "2025-05-13", status: "Pending" },
    { id: "REG-1238", name: "David Miller", package: "Basic Runner", date: "2025-05-12", status: "Paid" },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your marathon event.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-marathon-blue bg-opacity-10 text-marathon-blue">
                {stat.icon}
              </div>
              <div className={`text-sm font-medium ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
                {stat.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Registration Overview</h2>
            <div className="flex space-x-2">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 py-1 px-2 rounded hover:bg-gray-100">Weekly</button>
              <button className="text-sm font-medium text-marathon-blue bg-marathon-blue bg-opacity-10 py-1 px-2 rounded">Monthly</button>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 py-1 px-2 rounded hover:bg-gray-100">Yearly</button>
            </div>
          </div>
          <div className="h-64 flex items-end space-x-2">
            {/* Simple chart visualization as placeholder */}
            {[60, 45, 75, 50, 90, 65, 80, 55, 70, 85, 60, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-marathon-blue rounded-t-sm" style={{ height: `${height}%` }}></div>
                <div className="text-xs text-gray-500 mt-2">{`M${i + 1}`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Pending Tasks</h2>
          <div className="space-y-3">
            <TaskItem
              title="Verify payment screenshots"
              count={24}
              priority="high"
            />
            <TaskItem
              title="Send confirmation emails"
              count={15}
              priority="medium"
            />
            <TaskItem
              title="Update event schedule"
              count={1}
              priority="medium"
            />
            <TaskItem
              title="Review staff applications"
              count={8}
              priority="low"
            />
          </div>
          <button className="mt-4 w-full py-2 text-sm text-marathon-blue font-medium border border-marathon-blue rounded-md hover:bg-marathon-blue hover:text-white transition-colors">
            View All Tasks
          </button>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Recent Registrations</h2>
          <Link to="/admin/participants">
            <Button variant="outline" className="text-sm font-medium text-marathon-blue border-marathon-blue hover:bg-marathon-blue hover:text-white">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-xs font-medium text-gray-500 border-b">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Package</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentRegistrations.map((reg) => (
                <tr key={reg.id} className="text-sm text-gray-800">
                  <td className="px-4 py-3">{reg.id}</td>
                  <td className="px-4 py-3 font-medium">{reg.name}</td>
                  <td className="px-4 py-3">{reg.package}</td>
                  <td className="px-4 py-3">{reg.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reg.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-marathon-blue hover:text-marathon-darkBlue">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TaskItem = ({ title, count, priority }) => {
  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div className="flex items-center p-3 border rounded-md border-gray-100 hover:bg-gray-50">
      <div className="flex-1">
        <p className="font-medium text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{count} items pending</p>
      </div>
      <span
        className={`px-2 py-1 text-xs rounded-md font-medium ${priorityColors[priority]}`}
      >
        {priority}
      </span>
    </div>
  );
};

export default Dashboard;
