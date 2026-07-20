import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import { MessageSquareWarning, Plus, Eye, CalendarDays, Clock, CheckCircle, } from "lucide-react";
import { Button } from "@/components/ui/button";

function MyComplaints() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/tenants/complaints");
      console.log("MY COMPLAINTS:", response.data);
      setComplaints(response.data.complaints || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <TenantLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">
            Loading Complaints...
          </h2>
        </div>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout>
      <div className="space-y-8">

        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">My Complaints</h1>
            <p className="text-zinc-400 mt-2">
              Track all your complaints
            </p>
          </div>

          <Button onClick={() => navigate("/tenant/complaints/create")} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <Plus size={18} />
            New Complaint
          </Button>
        </motion.div>

        {complaints.length === 0 ? (
          <div className="bg-[#18181B] border border-zinc-800 rounded-3xl py-20 text-center">
            <MessageSquareWarning size={60} className="mx-auto text-emerald-400 mb-6"/>
            <h2 className="text-2xl font-bold text-white">
              No Complaints Found
            </h2>
            <p className="text-zinc-400 mt-3">You haven't raised any complaint yet.</p>

            <Button onClick={() => navigate("/tenant/complaints/create")}
              className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
              <Plus size={18} />
              Raise Complaint
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {complaints.map((complaint, index) => (
              <motion.div key={complaint._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-white">{complaint.category}</h2>
                  {complaint.status === "Resolved" ? (
                    <CheckCircle size={22} className="text-green-400"/>
                  ) : (
                    <Clock size={22} className={complaint.status === "In Progress" ? "text-yellow-400" : "text-blue-400"}/>
                  )}

                </div>

                <p className="text-zinc-400 mt-4 line-clamp-3">{complaint.description}</p>
                <div className="mt-6 space-y-3 text-zinc-300">
                  <p className="flex items-center gap-3">
                    <CalendarDays size={18} />
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>

                        <p className="flex items-center gap-3">
                    <MessageSquareWarning size={18} />
                    Status:
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${complaint.status === "Resolved" ? "bg-green-500/20 text-green-400"
                          : complaint.status === "In Progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                      {complaint.status}
                    </span>
                  </p>
                </div>

                <Button onClick={() => navigate(`/tenant/complaints/${complaint._id}`)}
                  className="mt-6 w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                  <Eye size={18} />
                  View Complaint
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </TenantLayout>
  );
}

export default MyComplaints;