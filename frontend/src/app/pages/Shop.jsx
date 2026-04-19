import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  UploadCloud,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { PetCard } from "../components/PetCard";
import { motion, AnimatePresence } from "motion/react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Shop() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchPets();
  }, [selectedCategory]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory !== "all" ? `?category=${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : "";
      const res = await api.get(`/pets${categoryParam}`);
      setPets(res.data.data.pets);
    } catch (err) {
      toast.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", label: "All Pets", emoji: "🐾" },
    { id: "dog", label: "Dogs", emoji: "🐕" },
    { id: "cat", label: "Cats", emoji: "🐈" },
    { id: "bird", label: "Birds", emoji: "🦜" },
    { id: "rabbit", label: "Rabbits", emoji: "🐰" },
    { id: "small", label: "Small Pets", emoji: "🐹" },
  ];

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddPet = async (newPetData) => {
    try {
      const res = await api.post("/pets", newPetData);
      setPets([res.data.data.pet, ...pets]);
      setIsModalOpen(false);
      toast.success("Pet listed successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add pet");
    }
  };

  return (
    <div className="h-full bg-background relative overflow-hidden">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-border shadow-sm">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Discover Your New{" "}
              <span className="text-primary italic">Best Friend</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Browse through our premium selection of pets waiting for a loving
              home, or add your own pet to the marketplace.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium text-lg shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-1"
            >
              <Plus className="w-6 h-6" />
              List a Pet
            </button>
          </motion.div>
        </div>
      </div>

      {/* Control Bar (Search + Filter) */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card dark:bg-gray-800 rounded-2xl shadow-xl shadow-black/5 p-4 md:p-6 border border-border"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-muted/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
              />
            </div>

            <button onClick={() => alert("Filters functionality coming soon!")} className="flex w-full md:w-auto items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium">
              <Filter className="w-5 h-5" />
              <span>Advanced Filters</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`snap-start flex items-center gap-3 px-6 py-3.5 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
                selectedCategory === category.id
                  ? "bg-foreground text-background shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border shadow-sm"
              }`}
            >
              <span className="text-xl">{category.emoji}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Found{" "}
            <span className="font-semibold text-foreground text-lg">
              {filteredPets.length}
            </span>{" "}
            amazing pets
          </p>
          <select className="px-4 py-2.5 bg-card border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium shadow-sm">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Age: Youngest First</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading amazing pets...</p>
          </div>
        ) : filteredPets.length > 0 ? (
          <motion.div
            layout
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence>
              {filteredPets.map((pet, index) => (
                <motion.div
                  key={pet._id || pet.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <PetCard {...pet} id={pet._id || pet.id} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 bg-card rounded-3xl border border-border mt-8"
          >
            <div className="text-7xl mb-6 opacity-80">🔍</div>
            <h3 className="text-3xl font-semibold text-foreground mb-3">
              No pets found
            </h3>
            <p className="text-lg text-muted-foreground">
              Try adjusting your filters or search query.
            </p>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <UploadPetModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddPet}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function UploadPetModal({ onClose, onSubmit }) {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    price: "",
    location: "",
    category: "Dog",
    description: "",
  });

  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = {
      ...formData,
      price: Number(formData.price),
      image:
        imagePreview ||
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxkb2d8ZW58MXx8fHwxMTE&ixlib=rb-4.1.0&q=80&w=1080",
    };
    onSubmit(newPet);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-card text-card-foreground">
          <h2 className="text-2xl font-bold">List a New Pet</h2>
          <button
            onClick={onClose}
            className="p-2 bg-muted hover:bg-muted-foreground/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="add-pet-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Zone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pet Photo
              </label>
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                } ${imagePreview ? "p-2" : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !imagePreview && fileInputRef.current.click()}
              >
                {imagePreview ? (
                  <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                        }}
                        className="bg-white/20 hover:bg-white/40 backdrop-blur-md p-3 rounded-full text-white"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="text-foreground font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      SVG, PNG, JPG or GIF (max. 5MB)
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) =>
                    e.target.files?.[0] && handleFile(e.target.files[0])
                  }
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pet Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. Luna"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                >
                  <option>Dog</option>
                  <option>Cat</option>
                  <option>Bird</option>
                  <option>Rabbit</option>
                  <option>Small</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Breed</label>
                <input
                  required
                  type="text"
                  value={formData.breed}
                  onChange={(e) =>
                    setFormData({ ...formData, breed: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. Golden Retriever"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <input
                  required
                  type="text"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. 2 months"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price (₹)</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. 50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                  required
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g. New York, NY"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-3.5 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none h-24"
                  placeholder="Tell us more about this pet..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border bg-muted/20 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 font-medium text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-pet-form"
            className="px-8 py-3 font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-md transition-colors flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Publish Listing
          </button>
        </div>
      </motion.div>
    </div>
  );
}
