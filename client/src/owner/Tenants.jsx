import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { User, Phone, Mail, Bed, IndianRupee, Plus, Pencil, Trash2, Eye, } from "lucide-react";
import { Button } from "@/components/ui/button";

function Tenants() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchTenants();
  }, []);
  
  const fetchTenants = async () => {
    try {
      console.log("Calling API: /tenants");
      const response = await api.get("/tenants");
      console.log("TENANTS RESPONSE:", response.data);
      setTenants(response.data.tenants);
    } catch (error) {
      console.log("TENANTS ERROR:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to fetch tenants");
    } finally {
      setLoading(false);
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this tenant?");
  if (!confirmDelete) return;
  
  try {
    await api.delete(`/tenants/${id}`);
    toast.success("Tenant deleted successfully");
    fetchTenants();
  } catch (error) {
    toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  
  if (loading) {
    return (
    <DashboardLayout>
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-xl text-zinc-400 animate-pulse">
          Loading Tenants...
          </h2>
          </div>
          </DashboardLayout>
          );
        }
        
        return (
        <DashboardLayout>
          <div className="space-y-8">        
            <motion.div initial = {{ opacity: 0, y: -30, }}
            animate={{ opacity: 1, y: 0, }}
            transition={{duration: 0.5,}}
            
            className = "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                
                <h1 className = "text-4xl font-bold text-white">
                  Tenants
                  </h1>
                  
                  <p className="mt-2 text-zinc-400">
                    Manage all tenants of your PG
                    </p>
                    
                    </div>
                    
                    <Button onClick = {() => navigate("/owner/tenants/create")}
                    className =  "bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
                      <Plus size = {18} />
                      Add Tenant
                      </Button>
                      </motion.div>
                      
                      { tenants.length === 0 ? ( <motion.div initial={{ opacity: 0, scale: 0.9, }}
                      animate = {{ opacity: 1, scale: 1, }}
                      className = "bg-[#18181B] border border-zinc-800 rounded-3xl py-20 text-center">
                        
                        <User size = {60} className="mx-auto text-emerald-400 mb-6"/>
                        <h2 className="text-2xl font-bold text-white">
                          No Tenants Found
                          </h2>
                          
                          <p className="mt-3 text-zinc-400">
                            Start by adding your first tenant.
                            </p>
                            
                            <Button onClick = {() => navigate("/owner/tenants/create")}           
                            className = "mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black">

                <Plus size={18} />
                Add Tenant
              </Button>
            </motion.div>
          ) : (

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                              {tenants.map((tenant, index) => (

                <motion.div key={tenant._id} initial={{opacity: 0, y: 40,}} animate={{opacity: 1, y: 0,}}
                  transition={{delay: index * 0.1,}} whileHover={{y: -8, scale: 1.02,}}
                  className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">

                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{tenant.fullName}</h2>
                    <User size={30} className="text-emerald-400"/>
                  </div>

                  <div className="mt-6 space-y-4">

                    <div className="flex items-center gap-3 text-zinc-300">
                      <Phone size={18} />
                      <span>{tenant.phone}</span>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-300">
                      <Mail size={18} />
                      <span>{tenant.email}</span>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-300">
  <Bed size={18} />
  <span>
    {tenant.bed?.room?.roomNumber ? `Room ${tenant.bed.room.roomNumber} • Bed ${tenant.bed?.bedNumber}` : "Room not assigned"}
  </span>
</div>

          <div className="flex items-center gap-3 text-zinc-300">
            <IndianRupee size={18} />
                <span>₹{tenant.monthlyRent}/month</span>
          </div>

        </div>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <Button onClick={() => navigate(`/owner/tenants/${tenant._id}`)}
          className="bg-emerald-500 hover:bg-emerald-400 !text-black">
            <Eye size={16} />
            </Button>
            
            <Button onClick={() => navigate(`/owner/tenants/edit/${tenant._id}`)} className="bg-blue-500 hover:bg-blue-400 !text-white">
              <Pencil size={16} />
              </Button>

                    <Button onClick={() => handleDelete(tenant._id)}
                      className="bg-red-500 hover:bg-red-400 !text-white">
                      <Trash2 size={16} />
                    </Button>

                  </div>
                </motion.div>
              ))}
          </div>
          )
        }
      </div>

    </DashboardLayout>
  );
}

export default Tenants;