import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, IndianRupee, User, CalendarDays, Clock, CheckCircle, Pencil, } from "lucide-react";
import { Button } from "@/components/ui/button";

function RentDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [rent, setRent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRent();
  }, []);

  const fetchRent = async () => {
    try {
      const response = await api.get(`/rents/${id}`);
      setRent(response.data.rent);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch rent");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (

      <DashboardLayout>

        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">Loading Rent...</h2>
        </div>
      </DashboardLayout>
    );
  }

  if(!rent) {
    return (

      <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-red-500">Rent Record Not Found</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Rent Details
              </h1>
              
              <p className="text-zinc-400 mt-2">View tenant rent information</p>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
                  <ArrowLeft size={18} />
                  Back
                  </Button>
                  
                  <Button onClick={() => navigate(`/owner/rents/edit/${rent._id}`)} 
                  className="bg-blue-500 hover:bg-blue-400 text-white">
                  <Pencil size={18} />
                  Edit
                  </Button>
                  </div>
                  </motion.div>
                  <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.2}} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
                    
                    <div className="flex items-center gap-3 mb-8">
                      <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                        <IndianRupee size={28} />
                      </div>
                  <div>
                    
                    <h2 className="text-2xl font-bold text-white">Rent Information</h2>
                    <p className="text-zinc-500">Complete rent record details</p>
                  </div>
                  </div>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div>
                    <p className="text-zinc-500 mb-2">Tenant Name</p>
                    <div className="flex items-center gap-2 text-white text-xl font-semibold">
                      <User size={20} />
                      {rent.tenant?.fullName}
                      </div>
                      </div>
                      <div>
                        
                        <p className="text-zinc-500 mb-2">Phone Number</p>
                        <h3 className="text-white text-xl font-semibold">{rent.tenant?.phone}</h3>
                        
                    </div>
              <div>
                <p className="text-zinc-500 mb-2">Billing Month</p>
                <div className="flex items-center gap-2 text-white text-xl font-semibold">
                  <CalendarDays size={20} />
                  {rent.billingMonth}
                  </div>
                </div>
              <div>
                
              <p className="text-zinc-500 mb-2">Amount</p>
              <div className="flex items-center gap-2 text-emerald-400 text-xl font-bold">
                <IndianRupee size={20} />₹{rent.amount}
                </div>
              </div>
              <div>
                
                <p className="text-zinc-500 mb-2">Due Date</p>
            <div className="flex items-center gap-2 text-white text-xl font-semibold">
              <CalendarDays size={20} />
              {new Date(rent.dueDate).toLocaleDateString()}
              </div>
              </div>
            <div>
              <p className="text-zinc-500 mb-2">Status</p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${ rent.status === "paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
              {rent.status === "paid" ? (<CheckCircle size={18} />) : (<Clock size={18} />)}
              {rent.status}
              </div>
              </div>
              
            </div>
    </motion.div>
  </div>
</DashboardLayout>
);

}

export default RentDetails;