
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      title: "Total Registrations",
      value: 2648,
      change: "+12%",
      isPositive: true
    },
    {
      title: "Completed Payments",
      value: 2134,
      change: "+8%",
      isPositive: true
    },
    {
      title: "Pending Approvals",
      value: 514,
      change: "-2%",
      isPositive: false
    },
    {
      title: "Staff Members",
      value: 42,
      change: "+3",
      isPositive: true
    },
  ];

  const recentRegistrations = [
    { id: "REG-1234", name: "John Mutale", package: "Premium Runner", date: "2025-05-14", status: "Paid" },
    { id: "REG-1235", name: "Emma Banda", package: "Basic Runner", date: "2025-05-14", status: "Pending" },
    { id: "REG-1236", name: "Michael Mwila", package: "Elite Experience", date: "2025-05-13", status: "Paid" },
    { id: "REG-1237", name: "Sarah Zimba", package: "Premium Runner", date: "2025-05-13", status: "Pending" },
    { id: "REG-1238", name: "David Phiri", package: "Basic Runner", date: "2025-05-12", status: "Paid" },
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Monitor and manage your marathon event.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className={`text-sm font-medium mb-2 ${stat.isPositive ? "text-green-500" : "text-red-500"}`}>
              {stat.change}
            </div>
            <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/admin/participants">
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Manage Participants
              </Button>
            </Link>
            <Link to="/admin/content">
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Update Website Content
              </Button>
            </Link>
            <Link to="/admin/results">
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Manage Results
              </Button>
            </Link>
            <Link to="/admin/staff">
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Manage Staff
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button className="w-full justify-start" variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                System Settings
              </Button>
            </Link>
          </div>
        </div>

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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
          <Button className="mt-4 w-full border border-marathon-blue text-marathon-blue bg-white hover:bg-marathon-blue hover:text-white transition-colors">
            View All Tasks
          </Button>
        </div>

        {/* Recent Registrations */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 lg:col-span-2">
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

      {/* System Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>System Health</CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Website</span>
                <span className="flex items-center text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Registration System</span>
                <span className="flex items-center text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="flex items-center text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-600 mr-2"></span>
                  Online
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Status</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="border-l-2 border-blue-500 pl-3 py-1">
                <p className="font-medium">Payment verified</p>
                <p className="text-gray-500">15 minutes ago</p>
              </div>
              <div className="border-l-2 border-green-500 pl-3 py-1">
                <p className="font-medium">New registration</p>
                <p className="text-gray-500">2 hours ago</p>
              </div>
              <div className="border-l-2 border-orange-500 pl-3 py-1">
                <p className="font-medium">Content updated</p>
                <p className="text-gray-500">5 hours ago</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Activity Log</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="border-l-2 border-purple-500 pl-3 py-1">
                <p className="font-medium">Staff meeting</p>
                <p className="text-gray-500">Tomorrow, 10:00 AM</p>
              </div>
              <div className="border-l-2 border-yellow-500 pl-3 py-1">
                <p className="font-medium">Route inspection</p>
                <p className="text-gray-500">May 20, 8:00 AM</p>
              </div>
              <div className="border-l-2 border-pink-500 pl-3 py-1">
                <p className="font-medium">Press conference</p>
                <p className="text-gray-500">May 22, 2:00 PM</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Calendar</Button>
          </CardFooter>
        </Card>
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
