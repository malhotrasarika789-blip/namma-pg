import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { IndianRupee, User, CalendarDays, Clock, CheckCircle, Plus, Eye, Pencil, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";

function Rents() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [rents, setRents] = useState([]);

  useEffect(() => {
    fetchRents();
  }, []);

  const fetchRents = async () => {
    try {
      const response = await api.get("/rents");
      setRents(response.data.rents);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch rents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this rent?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/rents/${id}`);
      toast.success("Rent deleted successfully");
      fetchRents();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }

  };

  if(loading) {
    return (
      <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">Loading Rents...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return(
  <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30,}} animate={{opacity: 1, y: 0,}} className="flex justify-between items-center">
          <div>
            
            <h1 className="text-4xl font-bold text-white">Rent Management</h1>
            <p className="text-zinc-400 mt-2">Manage tenant rent payments</p>
          </div>

          <Button onClick = {() => navigate("/owner/rents/create")} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <Plus size = {18} />
            Add Rent
          </Button>
        </motion.div>
        {rents.length === 0 ? ( <motion.div initial={{opacity: 0, scale: 0.9,}} animate={{opacity: 1, scale: 1,}}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl py-20 text-center">
          
          <IndianRupee size={60} className="mx-auto text-emerald-400 mb-6"/>
          <h2 className="text-2xl font-bold text-white">No Rent Records</h2>
          <p className="mt-3 text-zinc-400">Create your first rent record.</p>
          
        <Button onClick = {() => navigate("/owner/rents/create")} className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black">
          <Plus size={18} />
          Add Rent
          </Button>
          </motion.div>
          ) : ( 
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"> 
          {rents.map((rent, index) => (

          <motion.div key={rent._id} initial={{opacity: 0, y: 40,}} animate={{opacity: 1, y: 0,}}
          transition={{delay: index * 0.1,}} whileHover={{y: -8, scale: 1.02,}}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">{rent.tenant?.fullName}</h2>
              <IndianRupee size={30} className="text-emerald-400"/>

            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-zinc-300">
                <User size={18} />
                <span>{rent.tenant?.phone}</span>
                </div>
                
                <div className="flex items-center gap-3 text-zinc-300">
                  <CalendarDays size={18} />
                  <span>{rent.billingMonth}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-zinc-300">
                    <IndianRupee size={18} />
                    <span>₹{rent.amount}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-zinc-300">
                      { rent.paymentStatus === "Paid" ? <CheckCircle size={18} className="text-green-400"/> 
                      :
                      <Clock size={18} className="text-yellow-400"/>
                      }
                      
                      <span>{rent.paymentStatus}</span>
                      </div>
                      </div>
                      <div className="mt-8 grid grid-cols-3 gap-3">
                        
                      <Button onClick = {() => navigate(`/owner/rents/${rent._id}`)} className="bg-emerald-500 hover:bg-emerald-400 !text-black">
                        <Eye size={16} />
                        </Button>
                        
                        <Button onClick = {() => navigate(`/owner/rents/edit/${rent._id}`)} className="bg-blue-500 hover:bg-blue-400 !text-white">
                          <Pencil size={16} />
                          </Button>
                          
                        <Button onClick = {() => handleDelete(rent._id)} className="bg-red-500 hover:bg-red-400 !text-white">
                          <Trash2 size={16} />
                          </Button>
                          
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

export default Rents;