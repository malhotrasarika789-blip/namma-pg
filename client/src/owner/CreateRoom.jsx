import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateRoom() {
const navigate = useNavigate();
  const { id: propertyId } = useParams();
  console.log("Property ID from URL:", propertyId);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: "",
    capacity: "",
    rent: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!propertyId) {
      toast.error("Property ID not found");
      console.log("Property ID is undefined");
      return;
    }

    if (!formData.roomNumber || !formData.floor || !formData.capacity || !formData.rent) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);

    const payload = {
      propertyId,
      roomNumber: formData.roomNumber,
      floor: formData.floor,
      capacity: Number(formData.capacity),
      rent: Number(formData.rent),
    };

console.log("Payload:", payload);
const response = await api.post("/rooms", payload);
console.log("ROOM CREATED:", response.data);
toast.success("Room created successfully");
navigate(`/owner/properties/${propertyId}/rooms`);
} catch (error) {
    console.log("FULL ERROR:", error);
    console.log("BACKEND ERROR:", error.response?.data);
    toast.error(error.response?.data?.message || "Failed to create room");
  } finally {
    setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-between mb-8">
          <div>
            
            <h1 className="text-4xl font-bold text-white">Add Room</h1>
            <p className="text-zinc-400 mt-2">Create a new room for this property</p>
          </div>

          <Button type="button" onClick={() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <ArrowLeft size={18}/>Back</Button>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div>
            
            <label className="text-zinc-300 mb-2 block">Room Number</label>
            <Input name="roomNumber" value={formData.roomNumber} onChange={handleChange} placeholder="101" className="bg-zinc-900 border-zinc-700 text-white"/>
          </div>
          <div>

            <label className="text-zinc-300 mb-2 block">Floor</label>
            <Input name="floor" value={formData.floor} onChange={handleChange} placeholder="Ground" className="bg-zinc-900 border-zinc-700 text-white"/>
          </div>
          <div>

            <label className="text-zinc-300 mb-2 block">Capacity</label>
            <Input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="4" className="bg-zinc-900 border-zinc-700 text-white"/>
          </div>

          <div>

            <label className="text-zinc-300 mb-2 block">Rent</label>
            <Input type="number" name="rent" value={formData.rent} onChange={handleChange} placeholder="5000" className="bg-zinc-900 border-zinc-700 text-white"/>
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 !text-black font-bold text-base">
              <Building2 size={18}/>
              {loading ? "Creating Room..." : "Create Room"}
              </Button>
          </div>
        </motion.form>
      </div>
    </DashboardLayout>

  );

}

export default CreateRoom;