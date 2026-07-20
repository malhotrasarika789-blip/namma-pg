import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, MessageSquareWarning, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    tenant: "",
    room: "",
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    fetchComplaint();
    fetchTenants();
    fetchRooms();
  }, []);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);
      const complaint = response.data.complaint;

      setFormData({
        tenant: complaint.tenant?._id || "",
        room: complaint.room?._id || "",
        title: complaint.title || "",
        description: complaint.description || "",
        priority: complaint.priority || "Medium",
        status: complaint.status || "Open",
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch complaint");
    }

  };

  const fetchTenants = async () => {
    try {
      const response = await api.get("/tenants");
      setTenants(response.data.tenants);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await api.get("/rooms");
      setRooms(response.data.rooms);
    } catch (error) {
      console.log(error);
    }

  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/complaints/${id}`,formData);
      toast.success("Complaint updated successfully");
      navigate("/owner/complaints");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
          <div>
            
            <h1 className="text-4xl font-bold text-white">Edit Complaint</h1>
            <p className="text-zinc-400 mt-2">Update complaint details</p>
          </div>

          <Button onClick={() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <ArrowLeft size={18} />
            Back
            </Button>
            
            </motion.div>
            
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              
              <label className="text-zinc-300 block mb-2">Select Tenant</label>
              <select name="tenant" value={formData.tenant} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
                <option value="">Select Tenant</option>
                
                {tenants.map((tenant) => (
                  <option key={tenant._id} value={tenant._id}>{tenant.fullName}</option>
                  ))}
                </select>
            </div>
            
          <div>
            <label className="text-zinc-300 block mb-2">Select Room</label>
            <select name="room" value={formData.room} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
              <option value="">Select Room</option>
              
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>Room {room.roomNumber}</option>
                ))}
                </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-zinc-300 block mb-2">Complaint Title</label>
                  
                  <Input name="title" value={formData.title} onChange={handleChange} placeholder="Complaint title" className="bg-zinc-900 border-zinc-700 text-white"/>
                  </div>
              
              <div className="md:col-span-2">
                <label className="text-zinc-300 block mb-2">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe the complaint..." className="w-full rounded-md bg-zinc-900 border border-zinc-700 px-3 py-3 text-white outline-none resize-none"/>
              </div>
              
              <div>
                <label className="text-zinc-300 block mb-2">Priority</label>
                <select name="priority" value={formData.priority} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
    
              </div>
              
              <div>
                <label className="text-zinc-300 block mb-2">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  </select>
                </div>
            </div>
        <div className="pt-4">
          <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <MessageSquareWarning size={18} />
            {loading ? "Updating Complaint..." : "Update Complaint"}
          </Button>
      </div>
      </motion.form>
      </div>
    </DashboardLayout>
  );
}

export default EditComplaint;