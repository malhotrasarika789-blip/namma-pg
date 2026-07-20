import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import {ArrowLeft, CalendarDays, MessageSquareWarning, CheckCircle, Clock} from "lucide-react";
import { Button } from "@/components/ui/button";

function ViewComplaint() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [complaint, setComplaint] = useState(null);
  
  useEffect(() => {
    fetchComplaint(); 
  }, []);
  
  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/tenants/complaints/${id}`);
      console.log("COMPLAINT:", response.data);
      setComplaint(response.data.complaint);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch complaint");
      navigate("/tenant/complaints");
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
    <TenantLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">
            Loading Complaint...
          </h2>
        </div>
      </TenantLayout>
    );
  }

  if (!complaint) {
    return (
      <TenantLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-red-400">
            Complaint not found
          </h2>
        </div>
      </TenantLayout>
    );
  }

  return (
    <TenantLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700">
            <ArrowLeft size={18} />
          </Button>

          <div>
            <h1 className="text-4xl font-bold text-white">Complaint Details</h1>

            <p className="text-zinc-400 mt-2">View your complaint details</p>

          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">{complaint.category}</h2>

            {complaint.status === "Resolved" ? (<CheckCircle size={28} className="text-green-400"/>) : (
              <Clock size={28} className={complaint.status === "In Progress" ? "text-yellow-400" : "text-blue-400"}/>)}

          </div>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-zinc-500 mb-2">Description</p>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <p className="text-white leading-7">{complaint.description}</p>
              </div>
            </div>

            <div>
              <p className="text-zinc-500 mb-2">Status</p>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${complaint.status === "Resolved" ? "bg-green-500/20 text-green-400"
                    : complaint.status === "In Progress"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`} >{complaint.status}</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <CalendarDays size={20} />
              <div>

                <p className="text-zinc-500 text-sm">Created On</p>
                <p className="text-white">{new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>

            </div>

            <div className="flex items-center gap-3 text-zinc-300">
              <MessageSquareWarning size={20} />
              <div>

                <p className="text-zinc-500 text-sm">Last Updated</p>
                <p className="text-white">{new Date(complaint.updatedAt).toLocaleDateString()}</p>
              </div>

            </div>

            <Button onClick={() => navigate("/tenant/complaints")} className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700">
              <ArrowLeft size={18} /> Back to Complaints </Button>
          </div>
        </motion.div>
      </div>
    </TenantLayout>
  );

}

export default ViewComplaint;