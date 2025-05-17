
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminResults = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedDistance, setSelectedDistance] = useState("all");
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0]);
    }
  };

  // Sample results data
  const results = [
    { position: 1, bibNumber: "A2024", name: "Samuel Muteti", country: "Kenya", category: "Elite Men", time: "2:08:32", distance: "42K", year: "2024" },
    { position: 2, bibNumber: "A2031", name: "Daniel Mbewe", country: "Zambia", category: "Elite Men", time: "2:10:15", distance: "42K", year: "2024" },
    { position: 3, bibNumber: "A2018", name: "Robert Kimani", country: "Kenya", category: "Elite Men", time: "2:11:47", distance: "42K", year: "2024" },
    { position: 1, bibNumber: "B1023", name: "Florence Ngeno", country: "Kenya", category: "Elite Women", time: "2:24:56", distance: "42K", year: "2024" },
    { position: 2, bibNumber: "B1044", name: "Thandiwe Zulu", country: "Zambia", category: "Elite Women", time: "2:26:18", distance: "42K", year: "2024" },
    { position: 3, bibNumber: "B1037", name: "Grace Mwila", country: "Zambia", category: "Elite Women", time: "2:27:35", distance: "42K", year: "2024" },
    { position: 1, bibNumber: "C5011", name: "Kennedy Zimba", country: "Zambia", category: "Open Men", time: "1:05:23", distance: "21K", year: "2024" },
    { position: 2, bibNumber: "C5024", name: "Moses Banda", country: "Zambia", category: "Open Men", time: "1:06:12", distance: "21K", year: "2024" },
    { position: 1, bibNumber: "D3045", name: "Charity Mulenga", country: "Zambia", category: "Open Women", time: "1:12:44", distance: "21K", year: "2024" },
    { position: 1, bibNumber: "E7023", name: "John Phiri", country: "Zambia", category: "Open Men", time: "0:31:22", distance: "10K", year: "2024" },
    { position: 1, bibNumber: "F8019", name: "Elizabeth Tembo", country: "Zambia", category: "Open Women", time: "0:34:56", distance: "10K", year: "2024" },
  ];

  // Sample yearly stats
  const yearlyStats = [
    { year: "2024", participants: 2834, countries: 15, eliteRunners: 34, finishers: 2756 },
    { year: "2023", participants: 2650, countries: 13, eliteRunners: 30, finishers: 2581 },
    { year: "2022", participants: 2105, countries: 11, eliteRunners: 28, finishers: 2033 },
    { year: "2021", participants: 1500, countries: 8, eliteRunners: 20, finishers: 1456 },
  ];

  // Sample records
  const records = [
    { category: "Men's Marathon", name: "Samuel Muteti", country: "Kenya", time: "2:08:32", year: "2024" },
    { category: "Women's Marathon", name: "Florence Ngeno", country: "Kenya", time: "2:24:56", year: "2024" },
    { category: "Men's Half Marathon", name: "Kennedy Zimba", country: "Zambia", time: "1:05:23", year: "2024" },
    { category: "Women's Half Marathon", name: "Charity Mulenga", country: "Zambia", time: "1:12:44", year: "2024" },
    { category: "Men's 10K", name: "John Phiri", country: "Zambia", time: "0:31:22", year: "2024" },
    { category: "Women's 10K", name: "Elizabeth Tembo", country: "Zambia", time: "0:34:56", year: "2024" },
  ];

  // Filter results based on search, year, and distance
  const filteredResults = results.filter((result) => {
    const matchesSearch = 
      result.name.toLowerCase().includes(searchText.toLowerCase()) || 
      result.country.toLowerCase().includes(searchText.toLowerCase()) || 
      result.bibNumber.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesYear = selectedYear === "all" || result.year === selectedYear;
    const matchesDistance = selectedDistance === "all" || result.distance === selectedDistance;
    
    return matchesSearch && matchesYear && matchesDistance;
  });

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Results Management</h1>
        <p className="text-gray-600">Manage and publish marathon results.</p>
      </header>

      <Tabs defaultValue="results" className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TabsList className="border-b w-full rounded-t-lg bg-gray-50 p-0">
          <TabsTrigger value="results" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Results</TabsTrigger>
          <TabsTrigger value="records" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Records</TabsTrigger>
          <TabsTrigger value="statistics" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Statistics</TabsTrigger>
        </TabsList>
        
        {/* Results Tab */}
        <TabsContent value="results" className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Year: {selectedYear}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedYear("all")}>All Years</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedYear("2024")}>2024</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedYear("2023")}>2023</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedYear("2022")}>2022</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedYear("2021")}>2021</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Distance: {selectedDistance === 'all' ? 'All' : selectedDistance}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSelectedDistance("all")}>All Distances</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDistance("42K")}>42K Marathon</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDistance("21K")}>21K Half Marathon</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDistance("10K")}>10K Run</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedDistance("5K")}>5K Fun Run</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex space-x-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Input
                  type="search"
                  placeholder="Search results..."
                  className="pl-10 w-full"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Upload Results</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Results File</DialogTitle>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="results-year" className="text-sm">Year</label>
                      <select id="results-year" className="bg-background border rounded-md h-10 px-3">
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="results-distance" className="text-sm">Race Distance</label>
                      <select id="results-distance" className="bg-background border rounded-md h-10 px-3">
                        <option value="42K">42K Marathon</option>
                        <option value="21K">21K Half Marathon</option>
                        <option value="10K">10K Run</option>
                        <option value="5K">5K Fun Run</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="results-file" className="text-sm">Results CSV File</label>
                      <Input id="results-file" type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
                    </div>
                    <p className="text-xs text-gray-500">
                      The CSV file should include: Position, Bib Number, Name, Country, Category, and Time.
                    </p>
                    <div className="flex justify-end mt-4">
                      <Button type="submit">Upload and Process</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Position</TableHead>
                  <TableHead>Bib #</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((result, index) => (
                  <TableRow key={`${result.bibNumber}-${index}`}>
                    <TableCell className="font-medium">{result.position}</TableCell>
                    <TableCell>{result.bibNumber}</TableCell>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.country}</TableCell>
                    <TableCell>{result.category}</TableCell>
                    <TableCell>{result.distance}</TableCell>
                    <TableCell className="font-mono">{result.time}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredResults.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                No results found matching your search criteria.
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Records Tab */}
        <TabsContent value="records" className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Course Records</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {records.map((record, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{record.category}</CardTitle>
                    <CardDescription>Record set in {record.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Athlete:</span>
                        <span className="font-medium">{record.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Country:</span>
                        <span>{record.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-mono font-bold">{record.time}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" size="sm">Edit Record</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Add New Record</h2>
            <form className="bg-gray-50 p-4 border rounded-md space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="record-category" className="text-sm">Category</label>
                  <select id="record-category" className="bg-background border rounded-md h-10 px-3">
                    <option value="">Select a category</option>
                    <option value="Men's Marathon">Men's Marathon</option>
                    <option value="Women's Marathon">Women's Marathon</option>
                    <option value="Men's Half Marathon">Men's Half Marathon</option>
                    <option value="Women's Half Marathon">Women's Half Marathon</option>
                    <option value="Men's 10K">Men's 10K</option>
                    <option value="Women's 10K">Women's 10K</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="record-year" className="text-sm">Year</label>
                  <Input id="record-year" type="number" min="2010" max="2025" placeholder="Year record was set" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="record-name" className="text-sm">Athlete Name</label>
                  <Input id="record-name" placeholder="Full name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="record-country" className="text-sm">Country</label>
                  <Input id="record-country" placeholder="Country" />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="record-time" className="text-sm">Time (HH:MM:SS)</label>
                <Input id="record-time" placeholder="e.g. 2:08:32" />
              </div>
              <div className="flex justify-end">
                <Button>Save Record</Button>
              </div>
            </form>
          </div>
        </TabsContent>
        
        {/* Statistics Tab */}
        <TabsContent value="statistics" className="p-6">
          <h2 className="text-lg font-semibold mb-4">Yearly Statistics</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead>Countries Represented</TableHead>
                  <TableHead>Elite Runners</TableHead>
                  <TableHead>Finishers</TableHead>
                  <TableHead>Completion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlyStats.map((stat) => (
                  <TableRow key={stat.year}>
                    <TableCell className="font-medium">{stat.year}</TableCell>
                    <TableCell>{stat.participants.toLocaleString()}</TableCell>
                    <TableCell>{stat.countries}</TableCell>
                    <TableCell>{stat.eliteRunners}</TableCell>
                    <TableCell>{stat.finishers.toLocaleString()}</TableCell>
                    <TableCell>
                      {((stat.finishers / stat.participants) * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Participant Growth</CardTitle>
                <CardDescription>Year-over-year growth in marathon participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {/* Placeholder for chart */}
                  <div className="h-full flex items-end space-x-4">
                    {yearlyStats.slice().reverse().map((stat, i) => (
                      <div key={stat.year} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-marathon-blue rounded-t-sm" 
                          style={{ height: `${(stat.participants / 3000) * 100}%` }}>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{stat.year}</div>
                        <div className="text-xs font-medium">{stat.participants}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>International Participation</CardTitle>
                <CardDescription>Countries represented in the marathon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  {/* Placeholder for chart */}
                  <div className="h-full flex items-end space-x-4">
                    {yearlyStats.slice().reverse().map((stat, i) => (
                      <div key={stat.year} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-marathon-orange rounded-t-sm" 
                          style={{ height: `${(stat.countries / 20) * 100}%` }}>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{stat.year}</div>
                        <div className="text-xs font-medium">{stat.countries} countries</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Button className="mt-6">Generate Reports</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminResults;
