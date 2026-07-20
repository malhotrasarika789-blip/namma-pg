import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, MessageSquare, User, Bed, AlertTriangle, CheckCircle, } from "lucide-react";
import { Button } from "@/components/ui/button";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchComplaint();
  }, []);
  
  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);
      setComplaint(response.data.complaint);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch complaint");
    } finally {
      setLoading(false);
    }
  };
  
  if(loading) {
    return (
    <DashboardLayout>
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-xl text-zinc-400 animate-pulse">
          Loading Complaint...
          </h2>
          </div>
        </DashboardLayout>
      );
    }
    
    if(!complaint) {
      return (
      <DashboardLayout>
        <h2 className="text-red-500 text-xl">
          Complaint Not Found
          </h2>
        </DashboardLayout>
      );
    }
    
    return(
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30,}} animate={{opacity: 1, y: 0,}}
        className="flex justify-between items-center">
          <div>

            <h1 className="text-4xl font-bold text-white">Complaint Details</h1>
            <p className="text-zinc-400 mt-2">View complaint information</p>
          </div>

          <Button onClick = {() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <ArrowLeft size={18} />
            Back
          </Button>
          </motion.div>
          
        <motion.div initial={{opacity: 0, y: 40,}} animate={{opacity: 1, y: 0,}} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <MessageSquare size={30} className="text-black"/>
            </div>
        <div>
          
          <h2 className="text-3xl font-bold text-white">{complaint.title}</h2>
          <p className="text-zinc-400 mt-1">Complaint Information</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
      <div>
        
        <p className="text-zinc-500 mb-2">Tenant</p>
        <div className="flex items-center gap-3 text-white">
          <User size={20} />
          <span>{complaint.tenant?.fullName}</span>
        </div>
      </div>
    <div>
      
      <p className="text-zinc-500 mb-2">Room</p>
      <div className="flex items-center gap-3 text-white">
        <Bed size={20} />
        <span>Room {complaint.room?.roomNumber}</span>
      </div>
    </div>
    
    <div className="md:col-span-2">
      <p className="text-zinc-500 mb-2">Description</p>
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-zinc-300 leading-7">
        {complaint.description}
      </div>
    </div>  
    <div>
      
      <p className="text-zinc-500 mb-2">Priority</p>
      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${complaint.priority === "High"
          ? "bg-red-500/20 text-red-400"
          : complaint.priority === "Medium"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-green-500/20 text-green-400"}`}>
            
          <AlertTriangle size={16} className="mr-2" />
          {complaint.priority}
          </span>
        </div>
        
      <div>
        
        <p className="text-zinc-500 mb-2">Status</p>
        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${complaint.status === "Resolved"
          ? "bg-green-500/20 text-green-400"
          : complaint.status === "In Progress"
          ? "bg-yellow-500/20 text-yellow-400"
          : "bg-red-500/20 text-red-400"}`}>
          
          <CheckCircle size={16} className="mr-2" />{complaint.status}
          </span>
        </div>

  <div className="md:col-span-2">
    <p className="text-zinc-500 mb-2">Created At</p>
    <p className="text-white text-lg">{new Date(complaint.createdAt).toLocaleDateString()}
    
    </p>
  </div>
  </div>
  <div className="flex justify-end gap-4 mt-10">
    
    <Button onClick = {() =>navigate(`/owner/complaints/edit/${complaint._id}`)} className="bg-blue-500 hover:bg-blue-400 text-white">Edit Complaint</Button>
  <Button onClick = {() => navigate(-1)} className="bg-zinc-700 hover:bg-zinc-600 text-white">Back</Button>
  
  </div>
      </motion.div>
      </div>
    </DashboardLayout>
    );
  
  }

export default ComplaintDetails;