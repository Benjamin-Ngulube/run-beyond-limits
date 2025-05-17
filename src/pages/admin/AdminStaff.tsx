
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const AdminStaff = () => {
  const [searchText, setSearchText] = useState("");

  // Sample data - this would come from Supabase in a real implementation
  const staffMembers = [
    { id: 1, name: "David Mbewe", role: "Event Director", email: "david@marathon2025.com", phone: "+260 97X XXX XXX", department: "Management", status: "Active" },
    { id: 2, name: "Caroline Tembo", role: "Logistics Manager", email: "caroline@marathon2025.com", phone: "+260 96X XXX XXX", department: "Operations", status: "Active" },
    { id: 3, name: "Michael Banda", role: "Medical Coordinator", email: "michael@marathon2025.com", phone: "+260 97X XXX XXX", department: "Medical", status: "Active" },
    { id: 4, name: "Esther Mwanza", role: "Marketing Lead", email: "esther@marathon2025.com", phone: "+260 95X XXX XXX", department: "Marketing", status: "On Leave" },
    { id: 5, name: "Patrick Sikaonga", role: "Route Coordinator", email: "patrick@marathon2025.com", phone: "+260 96X XXX XXX", department: "Operations", status: "Active" },
    { id: 6, name: "Bridget Lungu", role: "Volunteer Coordinator", email: "bridget@marathon2025.com", phone: "+260 97X XXX XXX", department: "Operations", status: "Active" },
    { id: 7, name: "Emmanuel Chilufya", role: "Financial Officer", email: "emmanuel@marathon2025.com", phone: "+260 95X XXX XXX", department: "Finance", status: "Active" },
    { id: 8, name: "Nancy Katongo", role: "Registration Lead", email: "nancy@marathon2025.com", phone: "+260 96X XXX XXX", department: "Registration", status: "Inactive" },
  ];

  // Filter staff members based on search text
  const filteredStaff = staffMembers.filter((staff) => {
    return (
      staff.name.toLowerCase().includes(searchText.toLowerCase()) || 
      staff.role.toLowerCase().includes(searchText.toLowerCase()) || 
      staff.department.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Staff Management</h1>
        <p className="text-gray-600">Manage the marathon staff and volunteers.</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total Staff</h3>
            <p className="text-2xl font-bold text-gray-800">8</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Departments</h3>
            <p className="text-2xl font-bold text-gray-800">5</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Active</h3>
            <p className="text-2xl font-bold text-green-600">6</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Inactive/On Leave</h3>
            <p className="text-2xl font-bold text-orange-600">2</p>
          </div>
        </div>

        {/* Search and controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              type="search"
              placeholder="Search by name, role, or department"
              className="pl-10 w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          <div className="w-full sm:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Staff Member</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Staff Member</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">Name</label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="role" className="text-right">Role</label>
                    <Input id="role" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right">Email</label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="phone" className="text-right">Phone</label>
                    <Input id="phone" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="department" className="text-right">Department</label>
                    <Input id="department" className="col-span-3" />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button type="submit">Save Staff Member</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.id}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>{staff.department}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.phone}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      staff.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : staff.status === 'On Leave'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {staff.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Deactivate</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredStaff.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No staff members found matching your search criteria.
            </div>
          )}
        </div>

        {/* Department Distribution */}
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Department Distribution</h2>
          <div className="h-12 bg-gray-200 rounded-md overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '40%' }}>
              <div className="h-full flex items-center justify-center text-white text-sm font-medium">Operations (40%)</div>
            </div>
            <div className="h-full bg-green-500" style={{ width: '20%' }}>
              <div className="h-full flex items-center justify-center text-white text-sm font-medium">Management (20%)</div>
            </div>
            <div className="h-full bg-yellow-500" style={{ width: '15%' }}>
              <div className="h-full flex items-center justify-center text-white text-sm font-medium">Medical (15%)</div>
            </div>
            <div className="h-full bg-purple-500" style={{ width: '15%' }}>
              <div className="h-full flex items-center justify-center text-white text-sm font-medium">Finance (15%)</div>
            </div>
            <div className="h-full bg-pink-500" style={{ width: '10%' }}>
              <div className="h-full flex items-center justify-center text-white text-sm font-medium">Marketing (10%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;
