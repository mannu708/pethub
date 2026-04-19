import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { Check, X, Eye, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminDashboard() {
  const [pendingPets, setPendingPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchPendingPets();
  }, []);

  const fetchPendingPets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/pets/pending");
      setPendingPets(res.data.data.pets);
    } catch (err) {
      toast.error("Failed to fetch pending listings");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      setProcessingId(id);
      await api.patch(`/pets/${id}/status`, { status });
      
      toast.success(`Listing ${status} successfully`);
      setPendingPets(prev => prev.filter(pet => pet._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Admin Approval Queue</h1>
          <p className="text-muted-foreground mt-2">Review and verify new pet listings for the community.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium flex items-center gap-2">
          <ShieldCheck className="w-5 h-5" />
          <span>Admin Access Verified</span>
        </div>
      </div>

      {pendingPets.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
          <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">No Pending Listings</h3>
          <p className="text-muted-foreground">You've cleared the queue! All listings are currently reviewed.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence>
            {pendingPets.map((pet) => (
              <motion.div
                key={pet._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-64 h-48 md:h-auto">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">{pet.name}</h3>
                          <span className="px-2 py-0.5 bg-muted text-xs font-semibold rounded-md uppercase tracking-wider text-muted-foreground">
                            {pet.category}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p><span className="font-semibold text-foreground">Breed:</span> {pet.breed}</p>
                          <p><span className="font-semibold text-foreground">Age:</span> {pet.age}</p>
                          <p><span className="font-semibold text-foreground">Location:</span> {pet.location}</p>
                          <p><span className="font-semibold text-foreground">Price:</span> ₹{pet.price.toLocaleString('en-IN')}</p>
                        </div>
                        <div className="mt-4 p-3 bg-muted/50 rounded-xl text-sm italic border-l-4 border-primary/30">
                          "{pet.description || "No description provided."}"
                        </div>
                      </div>

                      <div className="flex md:flex-col lg:flex-row items-center gap-3 self-end md:self-start">
                        <button
                          onClick={() => handleStatusUpdate(pet._id, 'approved')}
                          disabled={processingId === pet._id}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                          <Check className="w-5 h-5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(pet._id, 'rejected')}
                          disabled={processingId === pet._id}
                          className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                          <X className="w-5 h-5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
