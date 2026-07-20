import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Building2, MapPin, MapPinned, FileText, Pencil, Trash2, Plus, Bed, Users, } from "lucide-react";
import { Button } from "@/components/ui/button";

function PropertyDetails(){
  const { id } = useParams();
  console.log("PropertyDetails ID:", id);
  const navigate = useNavigate();

  const [property,setProperty] = useState(null);
  const [loading,setLoading] = useState(true);
  const [roomsCount,setRoomsCount] = useState(0);
  const [bedsCount,setBedsCount] = useState(0);
  const [occupiedBeds,setOccupiedBeds] = useState(0);
  const [vacantBeds,setVacantBeds] = useState(0);
  
  useEffect(()=>{
    fetchProperty();
    fetchRooms();
    fetchBeds();
  },[]);
  
  const fetchProperty = async() => {
    try{
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data.property);
    }
    catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch property");
    }
    finally{
      setLoading(false);
    }
  };
  
  const fetchRooms = async() => { 
    try{
      const response = await api.get(`/rooms/property/${id}`);
      setRoomsCount(response.data.rooms.length);
    }
    catch(error){
      console.log(error.response?.data);
}
};
const fetchBeds = async() => {
  try{
    const roomsResponse = await api.get(`/rooms/property/${id}`);
    const rooms = roomsResponse.data.rooms;
    const bedsResponse = await api.get("/beds");
    const allBeds = bedsResponse.data.beds;
    const propertyBeds = allBeds.filter((bed) => {
      return rooms.some((room) => {
        return (
          bed.room._id === room._id || bed.room === room._id
        );
      });
    });
    
    setBedsCount(propertyBeds.length);
    const occupied = propertyBeds.filter((bed) => bed.status === "occupied").length;
    setOccupiedBeds(occupied);
    setVacantBeds(propertyBeds.length - occupied);
  }
  catch(error){
    console.log(error.response?.data);
  }
};
const handleDelete = async() => {
  const confirmDelete = window.confirm("Are you sure you want to delete this property?");
  if(!confirmDelete) return;
  try{ 
    await api.delete(`/properties/${id}`);
    toast.success("Property deleted successfully");
    navigate("/owner/properties");
  }
  catch(error){
    toast.error(error.response?.data?.message || "Delete failed");
  }
};
if(loading){
  return(
  <DashboardLayout>
    <div className="h-[80vh] flex items-center justify-center">
      <h2 className="text-xl text-zinc-400 animate-pulse">Loading Property...</h2>
      </div>
    </DashboardLayout>
    )
  }
  if(!property){
    return(
    <DashboardLayout>
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-red-500 text-xl">Property Not Found</h2>
      </div>
    </DashboardLayout>
    )
  }
  return(
  <DashboardLayout>
    <div className="space-y-8">
      <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} transition={{duration:0.5}}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <h1 className="text-4xl font-bold text-white">{property.name}</h1>
        <p className="mt-2 flex items-center gap-2 text-zinc-400">
          <MapPin size={18} className="text-emerald-400"/>{property.city}, {property.state}
          </p>
          </div>
          
        <div className="flex gap-4">
          <Button onClick = {() => navigate(`/owner/properties/edit/${property._id}`)}
          className="bg-blue-500 hover:bg-blue-400 !text-white">
            <Pencil size={18}/>
            Edit Property
            </Button>
            
          <Button onClick = {handleDelete} className="bg-red-500 hover:bg-red-400 !text-white">
            <Trash2 size={18}/>
            Delete
            </Button>
        </div>
      </motion.div>
      
      <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.2}}
      className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 shadow-xl">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
            <Building2 size={28}/>
            </div>
          <div>
            
            <h2 className="text-2xl font-bold text-white">Property Information</h2>
            <p className="text-zinc-500">Complete details of your property</p>
          </div>
          </div>
          
        <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-zinc-500 mb-2">Address</p>
          <div className="flex items-center gap-3 text-white">
            <MapPin size={18} className="text-emerald-400"/> 
            {property.address}
          </div>
      </div>
      
    <div>
      <p className="text-zinc-500 mb-2">City</p>
      <div className="flex items-center gap-3 text-white">
        <Building2 size={18} className="text-emerald-400"/>
        {property.city}
        </div>
        </div>
        
      <div>
        <p className="text-zinc-500 mb-2">State</p>
        <div className="flex items-center gap-3 text-white">
          <MapPinned size={18} className="text-emerald-400"/>{property.state}
          </div>
          </div>
          
      <div>
        
        <p className="text-zinc-500 mb-2">Pincode</p>
        <div className="text-white">{property.pincode}</div>
      </div>
      
      <div className="md:col-span-2">
        <p className="text-zinc-500 mb-2">Description</p>
        <div className="flex items-start gap-3 text-zinc-300">
          <FileText size={18} className="text-emerald-400 mt-1"/>
          {property.description || "No description added."}
          </div>
        </div>
      </div>
    </motion.div>
    <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.3}}
    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {
      [
        {
          title:"Total Rooms",
          value:roomsCount,
          icon:Building2,
          color:"text-emerald-400"
        },
        {
          title:"Total Beds",
          value:bedsCount,
          icon:Bed,
          color:"text-cyan-400"
        },
        {
          title:"Occupied Beds",
          value:occupiedBeds,
          icon:Users,
          color:"text-yellow-400"
        },
        {
          title:"Vacant Beds",
          value:vacantBeds,
          icon:Bed,
          color:"text-purple-400"
        }
      ].map((item,index) => (
      <motion.div key={index} whileHover={{y:-8, scale:1.03}} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 transition-all hover:border-emerald-500">
        <item.icon size={34} className={`${item.color} mb-5`}/>
        <p className="text-zinc-400">{item.title}</p>
        <h2 className="text-4xl font-bold text-white mt-2">{item.value}</h2>
        </motion.div>
        ))
        }
        
      </motion.div>
      
      <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.45}}
      className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-8">Quick Actions</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          <Button onClick = {() => navigate(`/owner/properties/${id}/rooms/create`)}
          className="h-14 bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            
            <Plus size={18}/>Add Room</Button>
            <Button onClick={() => navigate("/owner/tenants")} className="h-14 bg-blue-500 hover:bg-blue-400 !text-white font-bold">
              Manage Tenants
              </Button>
              <Button className="h-14 bg-yellow-500 hover:bg-yellow-400 !text-black font-bold">
                Rent
                </Button>
                
                <Button className="h-14 bg-purple-500 hover:bg-purple-400 !text-white font-bold">
                  Complaints
                  </Button>
                  
                </div>
              </motion.div>
              
            <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} transition={{delay:0.6}}
            className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
              <div className="flex items-center justify-between mb-8">
              
              <div>
                <h2 className="text-2xl font-bold text-white">Recent Rooms</h2>
                <p className="text-zinc-500 mt-1">Rooms available in this property</p>
                </div>
                <Button onClick = {() => navigate(`/owner/properties/${id}/rooms`)} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-semibold">
                  <Plus size={18}/>View Rooms</Button>
                </div>
              
              <div className="border border-dashed border-zinc-700 rounded-2xl py-16 px-6 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-[#10271D] flex items-center justify-center">
                  <Building2 size={38} className="text-emerald-400"/>
                  </div>
                  
                <h3 className="mt-6 text-2xl font-bold text-white">Rooms Section</h3>
                <p className="mt-3 text-zinc-400">Manage rooms and beds from here.</p>
                <Button onClick = {() => navigate(`/owner/properties/${id}/rooms/create`)} className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black font-semibold">
                  <Plus size={18}/>Add Room</Button>
                  </div>
                  </motion.div>
                </div>
            </DashboardLayout>
          );
        }

export default PropertyDetails;