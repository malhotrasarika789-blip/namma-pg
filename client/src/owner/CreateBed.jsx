import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Bed, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateBed(){
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    room: roomId,
    bedNumber:""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.bedNumber.trim()){
      toast.error("Please enter bed number");
      return;
    }
    try{
      setLoading(true);
      await api.post("/beds",formData);
      toast.success("Bed created successfully");
      
      navigate(`/owner/rooms/${roomId}`);
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to create bed");
    }
    
    finally{
      setLoading(false);
    }
  };
  
  return(
  <DashboardLayout>
    <div className = "max-w-3xl mx-auto">
      <motion.div initial = {{ opacity: 0, y: -30 }} 
      animate = {{ opacity: 1, y: 0 }}
      transition = {{ duration:0.5 }}
      className = "flex items-center justify-between mb-8">
        <div>
          <h1 className = "text-4xl font-bold text-white"> Add Bed </h1>
          
          <p className="text-zinc-400 mt-2"> Create new bed for this room </p>
          </div>
          
          <Button onClick = {() => navigate(-1)} className = "bg-zinc-800 hover:bg-zinc-700 text-white">
            <ArrowLeft size = {18} /> Back </Button>
            </motion.div>
            
            <motion.form onSubmit = {handleSubmit} initial = {{opacity: 0, y: 40}}
            animate={{opacity: 1,y: 0}}
            className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
              
          <div>
            <label className="text-zinc-300 block mb-2">Bed Number</label>
            <Input name="bedNumber" value={formData.bedNumber} onChange={handleChange} placeholder="Bed-101"
            className="bg-zinc-900 border-zinc-700 text-white"/>
            
          </div>
          
        <div>
          <label className="text-zinc-300 block mb-2">Room ID</label>
          <Input value={roomId} disabled className="bg-zinc-900 border-zinc-700 text-zinc-400"/>
          </div>
          
          <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
            <Bed size={18}/>
            {loading ? "Creating..." : "Create Bed"}
          </Button>
        </motion.form>
        </div>
        
      </DashboardLayout>
    );
  }

export default CreateBed;