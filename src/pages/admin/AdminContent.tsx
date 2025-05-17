
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

const AdminContent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sample sponsor data
  const sponsors = [
    { id: 1, name: "Zamtel", logo: "https://via.placeholder.com/150", level: "Platinum", website: "https://zamtel.zm" },
    { id: 2, name: "Zambeef", logo: "https://via.placeholder.com/150", level: "Gold", website: "https://zambeef.co.zm" },
    { id: 3, name: "Airtel Zambia", logo: "https://via.placeholder.com/150", level: "Gold", website: "https://airtel.co.zm" },
    { id: 4, name: "First National Bank", logo: "https://via.placeholder.com/150", level: "Silver", website: "https://fnbzambia.co.zm" },
    { id: 5, name: "ZESCO", logo: "https://via.placeholder.com/150", level: "Silver", website: "https://zesco.co.zm" },
    { id: 6, name: "Madison Insurance", logo: "https://via.placeholder.com/150", level: "Bronze", website: "https://madison.co.zm" },
  ];

  // Sample gallery images
  const galleryImages = [
    { id: 1, thumbnail: "https://via.placeholder.com/300x200?text=Marathon+2024", title: "2024 Marathon Start" },
    { id: 2, thumbnail: "https://via.placeholder.com/300x200?text=Runners", title: "Elite Runners" },
    { id: 3, thumbnail: "https://via.placeholder.com/300x200?text=Finish+Line", title: "Finish Line Celebration" },
    { id: 4, thumbnail: "https://via.placeholder.com/300x200?text=Medal+Ceremony", title: "Medal Ceremony" },
    { id: 5, thumbnail: "https://via.placeholder.com/300x200?text=Community+Run", title: "Community Run" },
    { id: 6, thumbnail: "https://via.placeholder.com/300x200?text=Children+Race", title: "Children's Race" },
  ];

  // Sample team members
  const teamMembers = [
    { id: 1, name: "Mulenga Kapwepwe", role: "Race Director", photo: "https://via.placeholder.com/200", bio: "Experienced marathon organizer with 10+ years in sports event management." },
    { id: 2, name: "Chisomo Banda", role: "Marketing Director", photo: "https://via.placeholder.com/200", bio: "Marketing specialist with experience in promoting national sporting events." },
    { id: 3, name: "Kunda Mwila", role: "Technical Director", photo: "https://via.placeholder.com/200", bio: "Former national athlete specializing in route design and safety." },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Content Management</h1>
        <p className="text-gray-600">Update website content, sponsors, gallery, and team information.</p>
      </header>

      <Tabs defaultValue="sponsors" className="bg-white rounded-lg shadow-sm border border-gray-100">
        <TabsList className="border-b w-full rounded-t-lg bg-gray-50 p-0">
          <div className="overflow-x-auto flex w-full">
            <TabsTrigger value="sponsors" className="flex-1 rounded-none rounded-tl-lg data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Sponsors</TabsTrigger>
            <TabsTrigger value="gallery" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Gallery</TabsTrigger>
            <TabsTrigger value="team" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Team</TabsTrigger>
            <TabsTrigger value="homepage" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">Homepage</TabsTrigger>
            <TabsTrigger value="about" className="flex-1 rounded-none rounded-tr-lg data-[state=active]:border-b-2 data-[state=active]:border-marathon-blue">About</TabsTrigger>
          </div>
        </TabsList>
        
        {/* Sponsors Tab */}
        <TabsContent value="sponsors" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sponsors</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New Sponsor</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Sponsor</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="sponsor-name" className="text-right text-sm">Name</label>
                    <Input id="sponsor-name" className="col-span-3" placeholder="Sponsor name" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="sponsor-website" className="text-right text-sm">Website</label>
                    <Input id="sponsor-website" className="col-span-3" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="sponsor-level" className="text-right text-sm">Level</label>
                    <select id="sponsor-level" className="col-span-3 bg-background border rounded-md h-10 px-3">
                      <option value="Platinum">Platinum</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="sponsor-logo" className="text-right text-sm">Logo</label>
                    <Input id="sponsor-logo" type="file" className="col-span-3" onChange={handleFileChange} />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button type="submit">Save Sponsor</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsors.map((sponsor) => (
              <Card key={sponsor.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{sponsor.name}</CardTitle>
                  <CardDescription>Level: {sponsor.level}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-4">
                  <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="h-32 object-contain" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Visit Website</a>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">Remove</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Gallery Tab */}
        <TabsContent value="gallery" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Photo Gallery</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Upload Photos</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload New Photos</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="gallery-title" className="text-sm">Photo Title/Description</label>
                    <Input id="gallery-title" placeholder="Enter a title for the photo" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="gallery-photo" className="text-sm">Select Photo</label>
                    <Input id="gallery-photo" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button type="submit">Upload Photo</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img src={image.thumbnail} alt={image.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{image.title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team" className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Team Member</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Team Member</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="team-name" className="text-sm">Full Name</label>
                    <Input id="team-name" placeholder="Enter name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="team-role" className="text-sm">Role/Position</label>
                    <Input id="team-role" placeholder="Enter role" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="team-bio" className="text-sm">Biography</label>
                    <Textarea id="team-bio" placeholder="Enter a short bio" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="team-photo" className="text-sm">Photo</label>
                    <Input id="team-photo" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button type="submit">Save Team Member</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <div className="aspect-square relative">
                  <img src={member.photo} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">Remove</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Homepage Tab */}
        <TabsContent value="homepage" className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Hero Section</h2>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="hero-title" className="text-sm">Hero Title</label>
                  <Input id="hero-title" defaultValue="Marathon 2025: Zambia's Biggest Marathon Event" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="hero-subtitle" className="text-sm">Hero Subtitle</label>
                  <Input id="hero-subtitle" defaultValue="Join thousands of runners on June 21, 2025" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="hero-image" className="text-sm">Hero Background Image</label>
                  <div className="flex items-center gap-2">
                    <Input id="hero-image" type="file" accept="image/*" onChange={handleFileChange} />
                    <img src="https://via.placeholder.com/100x50" alt="Current hero" className="h-12 w-24 object-cover rounded" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update Hero Section</Button>
                </div>
              </form>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Event Highlights</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="highlight1-title" className="text-sm">Highlight 1 Title</label>
                    <Input id="highlight1-title" defaultValue="42KM Full Marathon" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="highlight1-description" className="text-sm">Highlight 1 Description</label>
                    <Input id="highlight1-description" defaultValue="Challenge yourself with our IAAF certified route" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="highlight2-title" className="text-sm">Highlight 2 Title</label>
                    <Input id="highlight2-title" defaultValue="21KM Half Marathon" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="highlight2-description" className="text-sm">Highlight 2 Description</label>
                    <Input id="highlight2-description" defaultValue="Perfect for intermediate runners" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="highlight3-title" className="text-sm">Highlight 3 Title</label>
                    <Input id="highlight3-title" defaultValue="10KM Fun Run" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="highlight3-description" className="text-sm">Highlight 3 Description</label>
                    <Input id="highlight3-description" defaultValue="Enjoy the scenic route through Lusaka" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update Highlights</Button>
                </div>
              </form>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Marathon Date & Countdown</h2>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="event-date" className="text-sm">Event Date</label>
                  <Input id="event-date" type="date" defaultValue="2025-06-21" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="countdown-active" className="text-sm">Show Countdown</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="countdown-active" className="h-4 w-4" defaultChecked />
                    <label htmlFor="countdown-active">Enable countdown timer on homepage</label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update Event Date</Button>
                </div>
              </form>
            </div>
          </div>
        </TabsContent>
        
        {/* About Tab */}
        <TabsContent value="about" className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">About Content</h2>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="about-title" className="text-sm">About Title</label>
                  <Input id="about-title" defaultValue="About Marathon 2025" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="about-content" className="text-sm">About Content</label>
                  <Textarea 
                    id="about-content" 
                    className="min-h-[200px]" 
                    defaultValue="Marathon 2025 is Zambia's premier long-distance running event, bringing together athletes from across Africa and beyond. Started in 2010, our marathon has grown to become one of the most respected running events in the region, known for its challenging yet scenic route through the heart of Lusaka.

Our mission is to promote health, fitness, and community spirit through the joy of running. We welcome participants of all abilities, from elite athletes aiming for record times to casual runners taking on a personal challenge.

The marathon is proud to support local charities, with a portion of all registration fees going to support education initiatives across Zambia."
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="about-image" className="text-sm">About Image</label>
                  <div className="flex items-center gap-4">
                    <Input id="about-image" type="file" accept="image/*" onChange={handleFileChange} />
                    <img src="https://via.placeholder.com/100x100" alt="Current about" className="h-20 w-20 object-cover rounded" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update About Section</Button>
                </div>
              </form>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">Mission & Vision</h2>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="mission-statement" className="text-sm">Mission Statement</label>
                  <Textarea 
                    id="mission-statement" 
                    className="min-h-[100px]" 
                    defaultValue="To create a world-class marathon experience that showcases Zambia's beauty, promotes physical fitness, and brings communities together."
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="vision-statement" className="text-sm">Vision Statement</label>
                  <Textarea 
                    id="vision-statement" 
                    className="min-h-[100px]" 
                    defaultValue="To become Africa's premier marathon event, recognized globally for excellence in organization, participant experience, and positive community impact."
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Update Mission & Vision</Button>
                </div>
              </form>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContent;
