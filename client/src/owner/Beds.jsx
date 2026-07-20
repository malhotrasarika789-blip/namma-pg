import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Bed, User, CheckCircle, XCircle } from "lucide-react";

function Beds(){
  const [beds,setBeds] = useState([]);
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
    fetchBeds();
  },[]);
  
  const fetchBeds = async() => {
    try{
      const response = await api.get("/beds");
      setBeds(response.data.beds);
    }catch(error){console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to fetch beds");
    }
    
    finally{
      setLoading(false);
    }
  };
  
  return(
  <DashboardLayout>
    <div className = "space-y-8">
      
      <motion.div initial = {{ opacity:0, y:-30 }}
      animate = {{ opacity:1, y:0 }}>
        
        <h1 className = "text-4xl font-bold text-white">
          Beds Management
          </h1>
          
          <p className = "text-zinc-400 mt-2">
            Manage all beds of your properties
            </p>
            </motion.div>
            { loading ? <div className = "h-[50vh] flex items-center justify-center">
              
              <h2 className = "text-zinc-400 text-xl animate-pulse">
                Loading Beds...
                </h2>
                </div> : beds.length === 0 ? 
                <div className = "bg-[#18181B] border border-zinc-800 rounded-3xl p-10 text-center">
                  <Bed size = {60} className = "mx-auto text-emerald-400"/>
                  
                  <h2 className = "text-2xl font-bold text-white mt-5">
                    No Beds Added
                    </h2>
                    <p className = "text-zinc-400 mt-2">
                      Create beds from room management
                      </p>
                      </div> :
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        
                        {beds.map((bed,index) => ( 
            <motion.div key={bed._id} initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay:index*0.1}}
            whileHover={{y:-8}} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500 transition">
              
              <div className="flex justify-between items-center">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                  <Bed size={30}/>
                </div>
          {bed.status === "available" ? <CheckCircle className="text-green-400"/> : <XCircle className="text-red-400"/>}
        </div>
        
        <h2 className="text-2xl font-bold text-white mt-6">Bed {bed.bedNumber}</h2>
        <p className="text-zinc-400 mt-2">Room:<span className="text-white">{bed.room?.roomNumber || "N/A"}</span>
        </p>
        
      <p className="text-zinc-400 mt-2">Status: <span className={`ml-2 font-semibold ${ bed.status === "available" ? "text-green-400" : "text-red-400"}`}>
        {bed.status}
        </span>
        </p>
        
        <div className="flex items-center gap-2 mt-4 text-zinc-400">
          <User size={18}/>
          {bed.tenant ? bed.tenant.name : "No Tenant"}
        </div>
        </motion.div>
      ))
    }
    
    </div>
    }
    
  </div>
  </DashboardLayout>
  )
}

export default Beds;