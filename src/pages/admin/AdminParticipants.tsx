
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
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

const AdminParticipants = () => {
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewParticipant, setViewParticipant] = useState(null);
  const [confirmVerifyOpen, setConfirmVerifyOpen] = useState(false);
  const [confirmRejectOpen, setConfirmRejectOpen] = useState(false);
  const { toast } = useToast();

  // Sample data - this would come from Supabase in a real implementation
  const [participants, setParticipants] = useState([
    { id: "REG-1001", name: "John Mutale", email: "john.m@example.com", package: "Elite Runner", distance: "42K", payment: "Verified", date: "2025-04-01", tshirt: "L", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1002", name: "Chipo Banda", email: "chipo.b@example.com", package: "Basic Runner", distance: "21K", payment: "Pending", date: "2025-04-02", tshirt: "M", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1003", name: "Mulenga Phiri", email: "mulenga@example.com", package: "Premium Package", distance: "42K", payment: "Verified", date: "2025-04-03", tshirt: "XL", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1004", name: "Thandiwe Zulu", email: "thandiwe@example.com", package: "Basic Runner", distance: "10K", payment: "Failed", date: "2025-04-04", tshirt: "S", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1005", name: "Bwalya Mwamba", email: "bwalya@example.com", package: "Elite Runner", distance: "42K", payment: "Verified", date: "2025-04-05", tshirt: "M", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1006", name: "Chilufya Kaoma", email: "chilufya@example.com", package: "Premium Package", distance: "21K", payment: "Pending", date: "2025-04-06", tshirt: "L", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1007", name: "Lubinda Habeenzu", email: "lubinda@example.com", package: "Basic Runner", distance: "5K", payment: "Verified", date: "2025-04-07", tshirt: "M", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
    { id: "REG-1008", name: "Natasha Mwansa", email: "natasha@example.com", package: "Elite Runner", distance: "42K", payment: "Pending", date: "2025-04-08", tshirt: "S", paymentScreenshot: "https://via.placeholder.com/500x300?text=Payment+Screenshot" },
  ]);

  // Filter participants based on search text and filter status
  const filteredParticipants = participants.filter((participant) => {
    const matchesSearch = 
      participant.name.toLowerCase().includes(searchText.toLowerCase()) || 
      participant.email.toLowerCase().includes(searchText.toLowerCase()) || 
      participant.id.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || 
      participant.payment.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const handleVerifyPayment = () => {
    if (!viewParticipant) return;
    
    setParticipants(current => 
      current.map(p => 
        p.id === viewParticipant.id 
          ? {...p, payment: "Verified"} 
          : p
      )
    );
    
    setConfirmVerifyOpen(false);
    setViewParticipant(null);
    
    toast({
      title: "Payment Verified",
      description: `${viewParticipant.name}'s payment has been verified successfully.`,
    });
  };

  const handleRejectPayment = () => {
    if (!viewParticipant) return;
    
    setParticipants(current => 
      current.map(p => 
        p.id === viewParticipant.id 
          ? {...p, payment: "Failed"} 
          : p
      )
    );
    
    setConfirmRejectOpen(false);
    setViewParticipant(null);
    
    toast({
      title: "Payment Rejected",
      description: `${viewParticipant.name}'s payment has been marked as failed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Participant Management</h1>
        <p className="text-gray-600">View and manage all marathon participants.</p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              type="search"
              placeholder="Search by name, email, or ID"
              className="pl-10 w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Filter: {filterStatus === 'all' ? 'All' : filterStatus}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterStatus('all')}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('verified')}>Verified</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('pending')}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus('failed')}>Failed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline">Export Data</Button>
            <Button>Add Participant</Button>
          </div>
        </div>

        {/* Participants Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>T-Shirt</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParticipants.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell className="font-medium">{participant.id}</TableCell>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.package}</TableCell>
                  <TableCell>{participant.distance}</TableCell>
                  <TableCell>{participant.tshirt}</TableCell>
                  <TableCell>{participant.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      participant.payment === 'Verified' 
                        ? 'bg-green-100 text-green-800' 
                        : participant.payment === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {participant.payment}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => setViewParticipant(participant)}
                      >
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">Edit</button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredParticipants.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              No participants found matching your search criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredParticipants.length}</span> of <span className="font-medium">{participants.length}</span> participants
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>

      {/* Participant Details Dialog */}
      {viewParticipant && (
        <Dialog open={true} onOpenChange={() => setViewParticipant(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{viewParticipant.name} - {viewParticipant.id}</DialogTitle>
              <DialogDescription>
                Registration details and payment information
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                    <div className="grid grid-cols-2 mt-2">
                      <div className="text-sm">Name:</div>
                      <div className="text-sm font-medium">{viewParticipant.name}</div>
                      <div className="text-sm">Email:</div>
                      <div className="text-sm font-medium">{viewParticipant.email}</div>
                      <div className="text-sm">T-Shirt Size:</div>
                      <div className="text-sm font-medium">{viewParticipant.tshirt}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Registration Details</h3>
                    <div className="grid grid-cols-2 mt-2">
                      <div className="text-sm">ID:</div>
                      <div className="text-sm font-medium">{viewParticipant.id}</div>
                      <div className="text-sm">Date:</div>
                      <div className="text-sm font-medium">{viewParticipant.date}</div>
                      <div className="text-sm">Package:</div>
                      <div className="text-sm font-medium">{viewParticipant.package}</div>
                      <div className="text-sm">Distance:</div>
                      <div className="text-sm font-medium">{viewParticipant.distance}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h3>
                <div className="bg-gray-100 rounded p-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status:</span>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      viewParticipant.payment === 'Verified' 
                        ? 'bg-green-100 text-green-800' 
                        : viewParticipant.payment === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {viewParticipant.payment}
                    </span>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <h4 className="bg-gray-50 text-sm font-medium p-2 border-b">Payment Screenshot</h4>
                  <div className="p-2">
                    <img 
                      src={viewParticipant.paymentScreenshot} 
                      alt="Payment screenshot" 
                      className="w-full h-auto rounded" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between items-center">
              <div className="flex space-x-2">
                {viewParticipant.payment === "Pending" && (
                  <>
                    <Button 
                      onClick={() => setConfirmRejectOpen(true)} 
                      variant="outline"
                      className="bg-white text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject Payment
                    </Button>
                    <Button 
                      onClick={() => setConfirmVerifyOpen(true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Verify Payment
                    </Button>
                  </>
                )}
              </div>
              <Button variant="outline" onClick={() => setViewParticipant(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Verify Confirmation Dialog */}
      <Dialog open={confirmVerifyOpen} onOpenChange={setConfirmVerifyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to verify this payment? This will mark the registration as complete.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setConfirmVerifyOpen(false)}>Cancel</Button>
            <Button onClick={handleVerifyPayment} className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="mr-2 h-4 w-4" />
              Verify Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={confirmRejectOpen} onOpenChange={setConfirmRejectOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this payment? The participant will be notified.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setConfirmRejectOpen(false)}>Cancel</Button>
            <Button onClick={handleRejectPayment} variant="destructive">
              <X className="mr-2 h-4 w-4" />
              Reject Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminParticipants;
