import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Plus, MessageSquareWarning, Eye, Pencil, Trash2,} from "lucide-react";
import { Button } from "@/components/ui/button";

function Complaints() {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data.complaints);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }

  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this complaint?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/complaints/${id}`);
      toast.success("Complaint deleted successfully");
      fetchComplaints();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  if(loading) {
    return (
      <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">Loading Complaints...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return(
  <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30,}} animate={{opacity: 1, y: 0,}} className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Complaint Management</h1>
            <p className="text-zinc-400 mt-2">Manage tenant complaints</p>
            
          </div>
          
          <Button onClick = {() => navigate("/owner/complaints/create")} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <Plus size={18} />
            Add Complaint
            </Button>
          </motion.div>
        {complaints.length === 0 ? ( <motion.div initial={{opacity: 0, scale: 0.9,}} animate={{opacity: 1, scale: 1,}}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl py-20 text-center">
          
          <MessageSquareWarning size={60} className="mx-auto text-emerald-400 mb-6"/>
          <h2 className="text-2xl font-bold text-white">No Complaints Found</h2>
          <p className="mt-3 text-zinc-400">Create your first complaint.</p>
          <Button onClick = {() => navigate("/owner/complaints/create")} className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black">
            <Plus size={18} />Add Complaint</Button>
            </motion.div> ) : ( <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {complaints.map((complaint, index) => (
                <motion.div key={complaint._id} initial={{opacity: 0, y: 40,}} animate={{opacity: 1, y: 0,}}
                transition={{delay: index * 0.1,}} whileHover={{y: -8, scale: 1.02,}}
                className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">
                
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">{complaint.title || complaint.category}</h2>
                  <MessageSquareWarning size={26} className="text-emerald-400"/>
                  </div>
                  
                  <p className="mt-4 text-zinc-400 line-clamp-2">{complaint.description}</p>
                  <div className = "mt-6 space-y-4">
                    <div className="flex justify-between">
                      
                      <span className="text-zinc-500">Tenant</span>
                      <span className="text-white font-medium">{complaint.tenant?.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Room</span>
                        
                        <span className="text-white font-medium">{complaint.room?.roomNumber}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500">Priority</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${ complaint.priority === "High"
                            ? "bg-red-500/20 text-red-400"
                            : complaint.priority === "Medium"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                          }`}>{complaint.priority}</span>
                          
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-500">Status</span>
                          
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${complaint.status === "Resolved"
                          ? "bg-green-500/20 text-green-400"
                          : complaint.status === "In Progress"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"}`}>{complaint.status}</span>
                          </div>
                          
                          <div className="mt-8 grid grid-cols-3 gap-3">
                            <Button onClick = {() => navigate(`/owner/complaints/${complaint._id}`)}
                            className="bg-emerald-500 hover:bg-emerald-400 !text-black">
                              <Eye size={16} />
                              </Button>
                              
                              <Button onClick = {() => navigate(`/owner/complaints/edit/${complaint._id}`)}
                              className="bg-blue-500 hover:bg-blue-400 text-white">
                                <Pencil size={16} />
                                </Button>
                                
                                <Button onClick = {() => handleDelete(complaint._id)}
                                className="bg-red-500 hover:bg-red-400 text-white">
                                  <Trash2 size={16} />
                                  </Button>
                          </div>
                      </div>
                </motion.div>
            ))
            
        }
        
        </div>
      )
  }
  
  </div>
  </DashboardLayout>
  );
}

export default Complaints;