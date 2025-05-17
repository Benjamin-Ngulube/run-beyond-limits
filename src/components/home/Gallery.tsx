import { useState } from "react";
import { Button } from "@/components/ui/button";

const galleryImages = [
	{
		id: 1,
		src: "https://images.unsplash.com/photo-1517931524326-bdd55a541177?q=80&w=1170&auto=format&fit=crop",
		alt: "Runners at the starting line",
		category: "event",
	},
	{
		id: 2,
		src: "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?q=80&w=1170&auto=format&fit=crop",
		alt: "Marathon through the city",
		category: "event",
	},
	{
		id: 3,
		src: "https://images.unsplash.com/photo-1630617764438-ab55ae6e94e0?q=80&w=987&auto=format&fit=crop",
		alt: "Runner crossing finish line",
		category: "event",
	},
	{
		id: 4,
		src: "https://images.unsplash.com/photo-1561031554-33b6d7116e5d?q=80&w=1074&auto=format&fit=crop",
		alt: "Marathon medal close-up",
		category: "medals",
	},
	{
		id: 5,
		src: "https://images.unsplash.com/photo-1595976501254-45c27fbf189c?q=80&w=987&auto=format&fit=crop",
		alt: "Group of runners training",
		category: "training",
	},
	{
		id: 6,
		src: "https://images.unsplash.com/photo-1605296830686-5d00d8d69b96?q=80&w=1170&auto=format&fit=crop",
		alt: "Marathon route scenic view",
		category: "route",
	},
];

const categories = [
	{ id: "all", name: "All" },
	{ id: "event", name: "Event" },
	{ id: "medals", name: "Medals" },
	{ id: "training", name: "Training" },
	{ id: "route", name: "Route" },
];

const Gallery = () => {
	const [activeCategory, setActiveCategory] = useState("all");
	const [selectedImage, setSelectedImage] = useState(null);

	const filteredImages =
		activeCategory === "all"
			? galleryImages
			: galleryImages.filter((img) => img.category === activeCategory);

	return (
		<section id="gallery" className="section-padding bg-white">
			<div className="container mx-auto">
				<div className="text-center mb-12">
					<h2 className="heading-lg text-marathon-darkBlue mb-4">
						Event Gallery
					</h2>
					<div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						Explore our collection of photos from previous events, training
						sessions, and the beautiful routes you'll experience during the
						marathon.
					</p>
				</div>

				{/* Category Filter */}
				<div className="flex flex-wrap justify-center gap-2 mb-8">
					{categories.map((category) => (
						<button
							key={category.id}
							onClick={() => setActiveCategory(category.id)}
							className={`px-5 py-2 rounded-full transition-colors ${
								activeCategory === category.id
									? "bg-marathon-blue text-white"
									: "bg-gray-100 text-gray-700 hover:bg-gray-200"
							}`}
						>
							{category.name}
						</button>
					))}
				</div>

				{/* Gallery Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredImages.map((image) => (
						<div
							key={image.id}
							className="overflow-hidden rounded-lg shadow-md cursor-pointer card-hover"
							onClick={() => setSelectedImage(image)}
						>
							<img
								src={image.src}
								alt={image.alt}
								className="w-full h-64 object-cover"
							/>
						</div>
					))}
				</div>

				{/* Image Modal */}
				{selectedImage && (
					<div
						className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
						onClick={() => setSelectedImage(null)}
					>
						<div
							className="bg-white rounded-lg overflow-hidden max-w-4xl max-h-[90vh] w-full"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="relative">
								<img
									src={selectedImage.src}
									alt={selectedImage.alt}
									className="w-full max-h-[70vh] object-contain"
								/>
								<button
									aria-label="Gallery navigation"
									className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
									onClick={() => setSelectedImage(null)}
								>
									<svg
										className="h-6 w-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										></path>
									</svg>
								</button>
							</div>
							<div className="p-4">
								<p className="text-lg font-medium">{selectedImage.alt}</p>
								<p className="text-gray-500 capitalize">
									{selectedImage.category}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Show More Button */}
				<div className="mt-10 text-center">
					<Button variant="outline" className="button-secondary">
						Show More Photos
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Gallery;
