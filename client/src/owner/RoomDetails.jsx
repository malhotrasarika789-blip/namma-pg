import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, Bed, Users, Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


function RoomDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [room,setRoom] = useState(null);
  const [loading,setLoading] = useState(true);
  
  useEffect(() => {
    fetchRoom();
  },[]);

  const fetchRoom = async() => {
    try{
      const response = await api.get(`/rooms/${id}`);
      setRoom(response.data.room);
    }
    catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch room");
    }
    finally{
      setLoading(false);
    }
  };

  if(loading){
    return(
      <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-zinc-400 text-xl">
            Loading Room..
          </h2>
        </div>
      </DashboardLayout>
    )
  }
  
  if(!room){
    return(
    <DashboardLayout>
      <h2 className="text-red-500 text-xl">Room Not Found</h2>
      </DashboardLayout>
    )
  }

  return(
  <DashboardLayout>
    <div className="space-y-8">
      <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} transition={{duration:0.5}}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <h1 className="text-4xl font-bold text-white">Room {room.roomNumber}</h1>
        <p className="text-zinc-400 mt-2">Manage beds and details of this room</p>
      </div>
      
      <div className="flex gap-4">
        <Button onClick = {() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
          <ArrowLeft size={18}/>
          Back
          </Button>
          
          <Button onClick = {() => navigate(`/owner/rooms/${id}/beds/create`)} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <Plus size={18}/>
            Add Bed
            </Button>
          </div>
      </motion.div>
    <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
          <Bed size={28}/>
          </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Room Information</h2>
          <p className="text-zinc-500">Complete details of this room</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <p className="text-zinc-500 mb-2">Room Number</p>
          <h3 className="text-white text-xl font-semibold">{room.roomNumber}</h3>
        </div>
      <div>
        <p className="text-zinc-500 mb-2">Floor</p>
        <h3 className="text-white text-xl font-semibold">{room.floor}</h3>
      </div>
    <div>
      <p className="text-zinc-500 mb-2">Capacity</p>
      <div className="flex items-center gap-2 text-white text-xl font-semibold">
        <Users size={20}/>{room.capacity}</div>
      </div>
    </div>
  </motion.div>
  
  <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.4}}
  className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
    <div className="flex items-center justify-between mb-8">
      <div>
      
      <h2 className="text-2xl font-bold text-white">Beds</h2>
      <p className="text-zinc-500 mt-1">Manage beds available in this room</p>
      </div>
      <Button onClick = {() => navigate(`/owner/rooms/${id}/beds/create`)} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
        <Plus size={18}/>Add Bed</Button>
        </div>
        <div className="border border-dashed border-zinc-700 rounded-2xl py-16 text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-[#10271D] flex items-center justify-center">
            <Bed size={40} className="text-emerald-400"/>
            </div>
            
          <h3 className="mt-6 text-2xl font-bold text-white">No Beds Added</h3>
          <p className="mt-3 text-zinc-400">Add beds for this room</p>
          <Button onClick = {() => navigate(`/owner/rooms/${id}/beds/create`)} className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black"><Plus size={18}/>Add First Bed</Button>
          </div>
          </motion.div>
      </div>
    </DashboardLayout>
  );
}


export default RoomDetails;