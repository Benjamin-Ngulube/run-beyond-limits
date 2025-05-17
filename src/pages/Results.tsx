
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";

// Sample data - in a real app, this would come from an API
const eventYears = [2024, 2023, 2022, 2021, 2020];

const eventCategories = [
  { id: "full", name: "Full Marathon" },
  { id: "half", name: "Half Marathon" },
  { id: "10k", name: "10K Race" },
  { id: "5k", name: "5K Fun Run" }
];

const sampleResults = [
  {
    id: 1,
    year: 2024,
    category: "full",
    participants: [
      { position: 1, name: "John Smith", bibNumber: "A123", finishTime: "2:43:27", country: "United States" },
      { position: 2, name: "Michael Chen", bibNumber: "A245", finishTime: "2:45:11", country: "Canada" },
      { position: 3, name: "David Kimani", bibNumber: "A108", finishTime: "2:46:05", country: "Kenya" },
      { position: 4, name: "Sarah Johnson", bibNumber: "A187", finishTime: "2:47:38", country: "United Kingdom" },
      { position: 5, name: "Emma Williams", bibNumber: "A294", finishTime: "2:49:12", country: "Australia" },
    ]
  },
  {
    id: 2,
    year: 2024,
    category: "half",
    participants: [
      { position: 1, name: "Lisa Rodriguez", bibNumber: "B112", finishTime: "1:12:35", country: "Spain" },
      { position: 2, name: "Robert Kim", bibNumber: "B156", finishTime: "1:13:22", country: "South Korea" },
      { position: 3, name: "Jennifer Wong", bibNumber: "B089", finishTime: "1:14:47", country: "Hong Kong" },
      { position: 4, name: "Carlos Mendez", bibNumber: "B204", finishTime: "1:15:33", country: "Mexico" },
      { position: 5, name: "Maria Silva", bibNumber: "B132", finishTime: "1:16:05", country: "Brazil" },
    ]
  },
  {
    id: 3,
    year: 2023,
    category: "full",
    participants: [
      { position: 1, name: "Daniel Clark", bibNumber: "A098", finishTime: "2:45:19", country: "United States" },
      { position: 2, name: "Simon Peters", bibNumber: "A182", finishTime: "2:46:52", country: "United Kingdom" },
      { position: 3, name: "Lucy Chen", bibNumber: "A175", finishTime: "2:48:11", country: "China" },
      { position: 4, name: "Alex Johnson", bibNumber: "A221", finishTime: "2:49:07", country: "Canada" },
      { position: 5, name: "Mohammed Al-Fayed", bibNumber: "A143", finishTime: "2:50:36", country: "Egypt" },
    ]
  }
];

const Results = () => {
  const [selectedYear, setSelectedYear] = useState(eventYears[0]);
  const [selectedCategory, setSelectedCategory] = useState(eventCategories[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Filter results based on selected year and category
    // In a real application, this would be an API call
    const filteredResults = sampleResults.find(
      result => result.year === selectedYear && result.category === selectedCategory
    );
    
    setResults(filteredResults?.participants || []);
  }, [selectedYear, selectedCategory]);

  const filteredResults = results.filter(
    result => 
      result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.bibNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-marathon-darkBlue mb-2">Event Results</h1>
            <p className="text-gray-600 mb-8">
              View the results from our previous marathon events and search for specific participants.
            </p>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Year Selection */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Year
                  </label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  >
                    {eventYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Selection */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  >
                    {eventCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Participants
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Name, bib number, or country"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="button-primary">
                  Download Results (CSV)
                </Button>
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-marathon-darkBlue">
                  {eventCategories.find(c => c.id === selectedCategory)?.name} Results - {selectedYear}
                </h2>
              </div>
              
              {filteredResults.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bib #
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Country
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Finish Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredResults.map((result) => (
                        <tr key={result.bibNumber} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {result.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.bibNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {result.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {result.country}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                            {result.finishTime}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-lg font-medium">No results found</p>
                  <p className="text-sm mt-2">
                    {searchTerm 
                      ? "Try different search terms or filters" 
                      : "Results for this category and year are not available yet"}
                  </p>
                </div>
              )}
            </div>

            {/* Previous Events */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-marathon-darkBlue mb-6">Previous Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...eventYears].slice(1).slice(0, 3).map((year) => (
                  <div 
                    key={year} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="bg-gradient-to-r from-marathon-darkBlue to-marathon-blue p-4 text-white">
                      <h3 className="text-xl font-bold">Marathon {year}</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        View comprehensive results from our {year} marathon event,
                        including all race categories.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedYear(year);
                          setSelectedCategory("full");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full border-marathon-blue text-marathon-blue hover:bg-marathon-blue/5"
                      >
                        View Results
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
