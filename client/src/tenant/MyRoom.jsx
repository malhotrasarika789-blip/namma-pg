import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import { Home,Bed,Building2,MapPin,IndianRupee,Users,} from "lucide-react";

function MyRoom() {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState(null);
  
  useEffect(() => {
    fetchRoom();
  }, []);
  
  const fetchRoom = async () => {
    try {
      const response = await api.get("/tenants/room");
      console.log("ROOM DATA:", response.data);
      
      setRoom({...response.data.room, monthlyRent: response.data.monthlyRent});
    } catch (error) {
      
      toast.error(error.response?.data?.message || "Failed to fetch room");
    
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
    <TenantLayout>
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-xl text-zinc-400 animate-pulse">
              Loading Room...
        </h2>
        
        </div>
        </TenantLayout>
        );
      }
      
      if (!room) {
        return (
        <TenantLayout>
          <div className="text-center py-20">
            <h2 className="text-2xl text-red-400">
              Room not found
              </h2>
              </div>
              </TenantLayout>
              );
            }
            
            return (
            <TenantLayout>
              <div className="space-y-8">
              <motion.div initial={{opacity: 0, y: -30,}}
              animate={{opacity: 1, y: 0,}}
              className="flex items-center gap-4">

          <Home size={38} className="text-emerald-400"/>
          <div>
            
            <h1 className="text-4xl font-bold text-white">
              My Room
            </h1>
            
            <p className="text-zinc-400 mt-2">
              Your accommodation details
            </p>

          </div>
          </motion.div>
          
          <motion.div initial={{opacity: 0, y: 30,}}
          animate={{opacity: 1, y: 0,}}
          transition={{delay: 0.2,}}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              
              <Home size={32} className="text-emerald-400 mb-4"/>
              
              <p className="text-zinc-400">Room Number</p>
              <h2 className="text-3xl font-bold text-white mt-2">{room.room?.roomNumber}</h2>
  </div>
  <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
    <Bed size={32} className="text-blue-400 mb-4"/>
    
    <p className="text-zinc-400">Bed Number</p>
    <h2 className="text-3xl font-bold text-white mt-2">{room.bedNumber}</h2>
  </div>
  
  <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
    <Building2 size={32} className="text-purple-400 mb-4"/>
    <p className="text-zinc-400">Floor</p>
    
    <h2 className="text-3xl font-bold text-white mt-2">{room.room?.floor}</h2>
  </div>

  <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
    <Users size={32} className="text-yellow-400 mb-4"/>
    
    <p className="text-zinc-400">Capacity</p>
    
    <h2 className="text-3xl font-bold text-white mt-2">{room.room?.capacity}</h2>
  </div>
</motion.div>

<motion.div initial={{opacity:0, y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.3}} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
  
  <div className="flex items-center gap-3 mb-8">
    <Building2 size={30} className="text-emerald-400"/>
    
    <div>
      
      <h2 className="text-2xl font-bold text-white">Property Details</h2>
      <p className="text-zinc-500">Your assigned property</p>
      </div>
      
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          
          <p className="text-zinc-500 mb-2">Property Name</p>
          
          <h3 className="text-xl font-semibold text-white">{room.room?.property?.name}</h3>
          </div>
          <div>
            
            <p className="text-zinc-500 mb-2">Monthly Rent</p>
            
            <h3 className="flex items-center gap-2 text-xl font-semibold text-emerald-400">
            <IndianRupee size={18}/>
            ₹{room.monthlyRent}
            </h3>
            
            </div>
            <div className="md:col-span-2">
              
              <p className="text-zinc-500 mb-2">Address</p>
              
              <h3 className="flex items-center gap-2 text-white">
                <MapPin size={18}/>
                {room.room?.property?.address}
                </h3>
                </div>
                
                <div>
                  
                  <p className="text-zinc-500 mb-2">Bed Status</p>
                  
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${room.bed?.status === "occupied" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                  {room.status}
                  </span>
                  </div>
                  </div>
                  </motion.div>
            </div>
          </TenantLayout>
          );
        }

export default MyRoom;