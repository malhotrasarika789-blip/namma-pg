import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import { ArrowLeft, MessageSquareWarning } from "lucide-react";
import { Button } from "@/components/ui/button";


function CreateComplaint(){
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    category:"",
    description:"",
    status:"Open"
  });

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      setLoading(true);

      console.log("COMPLAINT DATA:", formData);
      await api.post("/tenants/complaints",formData);
      toast.success("Complaint created successfully");
      navigate("/tenant/complaints");
    }catch(error){
      console.log("COMPLAINT ERROR:", error.response?.data);
      
      toast.error(error.response?.data?.message || "Failed to create complaint");
    }finally{
      setLoading(false);
    }
  };

  return(
    <TenantLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} className="flex items-center gap-4">
          <Button onClick={() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700">
            <ArrowLeft size={18}/>
          </Button>
          <div>

            <h1 className="text-4xl font-bold text-white">Create Complaint</h1>
            <p className="text-zinc-400 mt-2">Report your issue to owner</p>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <MessageSquareWarning size={32} className="text-emerald-400"/>
          <h2 className="text-2xl font-bold text-white">Complaint Details</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div>

        <label className="text-zinc-400 block mb-2">
          Category
        </label>

        <select name="category" value={formData.category} onChange={handleChange} required
        className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white">

        <option value="">Select Category</option>
        <option value="Wi-Fi">Wi-Fi</option>
        <option value="Water">Water</option>
        <option value="Electricity">Electricity</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Room Repair">Room Repair</option>
        <option value="Other">Other</option>
        </select>

        </div>

        <div>

        <label className="text-zinc-400 block mb-2">
          Description
        </label>

        <textarea name="description" value={formData.description}  onChange={handleChange} required placeholder="Explain your issue..." rows="5"
        className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-4 text-white outline-none"/>
        </div>

        <div>
        <label className="text-zinc-400 block mb-2">Status</label>
        <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white">

        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        </select>
        </div>


        <Button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 !text-black font-bold py-6">
          {loading ? "Creating..." : "Submit Complaint"}
        </Button>

        </form>
        </motion.div>
      </div>
    </TenantLayout>
  );
}

export default CreateComplaint;