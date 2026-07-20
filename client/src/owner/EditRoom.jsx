import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


function EditRoom(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    roomNumber:"",
    floor:"",
    capacity:"",
    rent:""
  });
  
  useEffect(() => {
    fetchRoom();
  },[]);
  
  const fetchRoom = async() => {
    try{
      const response = await api.get(`/rooms/${id}`);
      const room = response.data.room;
      setFormData({
        roomNumber: room.roomNumber,
        floor: room.floor,
        capacity: room.capacity,
        rent: room.rent
      });
    }
    catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch room");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.roomNumber || !formData.floor || !formData.capacity || !formData.rent){
      toast.error("Please fill all fields");
      return;
    }
    try{
      setLoading(true);
      await api.put(`/rooms/${id}`,{
        roomNumber: formData.roomNumber,
        floor: formData.floor,
        capacity: Number(formData.capacity),
        rent: Number(formData.rent)
      });
      toast.success("Room updated successfully");
      navigate("/owner/rooms");
    }
    catch(error){
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update room");
    }
    finally{
      setLoading(false);
    }
  };
  
  return(
  <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{opacity:0, y:-30}}
        animate={{opacity:1, y:0}} className="flex justify-between items-center mb-8">
        <div>
          
          <h1 className="text-4xl font-bold text-white">Edit Room</h1>
            <p className="text-zinc-400 mt-2">Update room details</p>
          </div>
          <Button onClick = {() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <ArrowLeft size={18}/>
            Back
            </Button>
          </motion.div>
          <motion.form onSubmit={handleSubmit} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
            <Input name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="Room Number" className="bg-zinc-900 border-zinc-700 text-white"/>
            <Input name="floor" value={formData.floor} onChange={handleChange} placeholder="Floor" className="bg-zinc-900 border-zinc-700 text-white"/>
            <Input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" className="bg-zinc-900 border-zinc-700 text-white"/>
            <Input type="number" name="rent" value={formData.rent} onChange={handleChange} placeholder="Rent" className="bg-zinc-900 border-zinc-700 text-white"/>
            <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
              <Building2 size={18}/>
              { loading ? "Updating..." : "Update Room"}
              
            </Button>
        </motion.form>
      </div>
    </DashboardLayout>
  );
}


export default EditRoom;