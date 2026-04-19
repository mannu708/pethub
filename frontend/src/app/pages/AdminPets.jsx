import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreVertical,
  Filter,
  ArrowUpDown,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      // Fetch all pets by bypassing the default 'approved' filter if possible, 
      // or using a specific admin endpoint.
      const res = await api.get("/pets?limit=1000&approvalStatus=all"); 
      // Note: Backend getAllPets needs to handle 'all' or we need a specific 'admin' endpoint.
      // For now, I'll fetch 'pending' and 'approved' separately if needed, but I'll try 'all' first.
      setPets(res.data.data.pets);
    } catch (err) {
      toast.error("Failed to fetch pets list");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.patch(`/pets/${id}/status`, { status });
      toast.success(`Pet ${status} successfully`);
      setPets(prev => prev.map(p => p._id === id ? { ...p, approvalStatus: status } : p));
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const filteredPets = pets.filter(pet => {
    const matchesFilter = filter === "all" || pet.approvalStatus === filter;
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pets Management</h2>
          <p className="text-gray-500 text-sm mt-1">Manage, approve, and monitor all pet listings across India.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or breed..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64"
            />
          </div>
          <button className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-500 hover:text-orange-500 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl w-fit">
        {['all', 'pending', 'approved', 'rejected'].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
              filter === t 
                ? "bg-white dark:bg-gray-900 text-orange-500 shadow-sm" 
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Pet Info</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Type / Breed</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence mode="popLayout">
                {filteredPets.map((pet) => (
                  <motion.tr 
                    layout
                    key={pet._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={pet.image} alt="" className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100 dark:ring-gray-800" />
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white capitalize">{pet.name}</p>
                          <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                            <MapPin className="w-3 h-3" />
                            {pet.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{pet.category}</p>
                      <p className="text-xs text-gray-500">{pet.breed}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-gray-800 dark:text-white">₹{pet.price.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(pet.approvalStatus)}`}>
                        {pet.approvalStatus === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {pet.approvalStatus === 'rejected' && <XCircle className="w-3 h-3" />}
                        {pet.approvalStatus === 'pending' && <Clock className="w-3 h-3" />}
                        {pet.approvalStatus}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(pet.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {pet.approvalStatus === 'pending' ? (
                          <>
                            <button 
                              onClick={() => handleStatusUpdate(pet._id, 'approved')}
                              className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-md shadow-green-500/10"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleStatusUpdate(pet._id, 'rejected')}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-md shadow-red-500/10"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleStatusUpdate(pet._id, 'pending')}
                            className="text-xs text-gray-400 hover:text-orange-500 font-bold underline"
                          >
                            Reset to Pending
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredPets.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">No listings found matching this criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
