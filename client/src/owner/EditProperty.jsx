import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, Building2, MapPin, FileText, Save, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);

      setFormData({
        name: response.data.property.name,
        address: response.data.property.address,
        city: response.data.property.city,
        state: response.data.property.state,
        pincode: response.data.property.pincode,
        description: response.data.property.description || "",
      });

    }

    catch (error) {
      toast.error(error.response?.data?.message || "Failed to load property");
      navigate("/owner/properties");
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
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
        try {
          await api.put(`/properties/${id}`,formData);
          toast.success("Property updated successfully 🎉");
          navigate(`/owner/properties/${id}`);
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
    finally {
      setLoading(false);
    }
  };

  return(
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{opacity: 0, y: -30,}} animate={{opacity: 1, y: 0,}}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              
              <h1 className="text-4xl font-bold text-white">Edit Property</h1>
              <p className="text-zinc-400 mt-2">Update your property details</p>
            </div>

            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              Back
            </Button>

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-zinc-300 mb-2 block">Property Name</label>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Property Name"/>
            </div>
            <div>

              <label className="text-zinc-300 mb-2 block">Address</label>
              <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address"/>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <div>

                <label className="text-zinc-300 mb-2 block">City</label>
                <Input name="city" value={formData.city} onChange={handleChange}/>
              </div>
                <div>
                  <label className="text-zinc-300 mb-2 block">State</label>
                  <Input name="state" value={formData.state} onChange={handleChange}/>
                </div>

              <div>
                <label className="text-zinc-300 mb-2 block">Pincode</label>
                <Input name="pincode" value={formData.pincode} onChange={handleChange}/>
              </div>
            </div>

            <div>

              <label className="text-zinc-300 mb-2 block">Description</label>
              <Textarea rows={5} name="description" value={formData.description} onChange={handleChange} placeholder="Write something about this property..."/>
            </div>
                    <div className="flex items-center justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="border-zinc-700 text-white hover:bg-zinc-800">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                <Save size={18} />
                {loading ? "Updating..." : "Update Property"}
              </Button>

            </div>

          </form>

        </motion.div>

      </div>

    </DashboardLayout>

  );

}

export default EditProperty;