import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import { IndianRupee, CalendarDays, CheckCircle, Clock, } from "lucide-react";

function RentHistory(){
  const [loading,setLoading] = useState(true);
  const [rents,setRents] = useState([]);
  
  useEffect(() => {
    fetchRents();
  },[]);
  
  const fetchRents = async() => {
    try{
      const response = await api.get("/tenants/rents");
      console.log("RENT HISTORY:", response.data);
      setRents(response.data.rents || []);
    }catch(error){
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch rent history");
    }
    finally{
      setLoading(false);
    }
  };
  
  if(loading){
    return(
    <TenantLayout>
      <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">
            Loading Rent History...
            </h2>
            </div>
            </TenantLayout>
            );
          }
          
          return(
          <TenantLayout>
            <div className = "space-y-8">
              <motion.div initial = {{opacity:0, y:-30}} animate = {{opacity:1, y:0}}>
                <h1 className = "text-4xl font-bold text-white">
                  Rent History
                  </h1>
                  
                  <p className="text-zinc-400 mt-2">View your previous rent payments</p>
        </motion.div>
        {rents.length === 0 ? ( <div className="bg-[#18181B] border border-zinc-800 rounded-3xl py-20 text-center">
          <IndianRupee size={60} className="mx-auto text-emerald-400 mb-6"/>
            <h2 className="text-2xl font-bold text-white"> No Rent History</h2>
            <p className="text-zinc-400 mt-3">No rent records available yet.</p>
          </div>
          ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rents.map((rent,index)=>(
            <motion.div key={rent._id} initial={{opacity:0, y:30}} animate={{opacity:1, y:0}}
              transition={{delay:index*0.1}}
              className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">{rent.billingMonth}</h2>
                  {rent.paymentStatus === "Paid" ? <CheckCircle size={22} className="text-green-400"/> : <Clock size={22} className="text-yellow-400"/>
                  }
                  
                  </div>

                <div className="mt-6 space-y-4 text-zinc-300">
                  <p className="flex items-center gap-3">
                    <IndianRupee size={18}/>
                    ₹{rent.amount}
                  </p>

                  <p className="flex items-center gap-3"> <CalendarDays size={18}/>
                  {rent.paymentDate ? new Date(rent.paymentDate).toLocaleDateString() : "Payment Pending"}
                  </p>

                  <p>Status:<span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${rent.paymentStatus === "Paid" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                      {rent.paymentStatus}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))
          }
          </div>
          )
          }
          
          </div>
          </TenantLayout>
          );
        }

export default RentHistory;