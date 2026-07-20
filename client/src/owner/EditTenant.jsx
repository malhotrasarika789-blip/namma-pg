import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


function EditTenant(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    fullName:"",
    phone:"",
    email:"",
    gender:"Male",
    monthlyRent:"",
    securityDeposit:"",
    emergencyContact:""
  });

  useEffect(() => {
    fetchTenant();
  },[]);

  const fetchTenant = async() => {
    try{
      const response = await api.get(`/tenants/${id}`);
      const tenant = response.data.tenant;
      setFormData({
        fullName: tenant.fullName || "",
        phone: tenant.phone || "",
        email: tenant.email || "",
        gender: tenant.gender || "Male",
        monthlyRent: tenant.monthlyRent || "",
        securityDeposit: tenant.securityDeposit || "",
        emergencyContact: tenant.emergencyContact || ""
      });
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch tenant");
    }
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await api.put(`/tenants/${id}`, formData);
      toast.success("Tenant updated successfully");
      navigate("/owner/tenants");
    }catch(error){
      toast.error(error.response?.data?.message || "Update failed");
    }finally{
      setLoading(false);
    }
  };
  
  return(
  <DashboardLayout>
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} className="flex justify-between items-center mb-8">
      <div>
        
        <h1 className="text-4xl font-bold text-white">Edit Tenant</h1>
        <p className="text-zinc-400 mt-2">Update tenant information</p>
      </div>
      
      <Button variant="outline" onClick = {() => navigate(-1)}>
        <ArrowLeft size={18}/>
        Back
      </Button>
    </motion.div>
    
    <motion.form onSubmit={handleSubmit} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6"
    initial={{opacity:0, y:40}} animate={{opacity:1, y:0}}>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange}/>
        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange}/>
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange}/>
      <div>
        
        <label className="text-zinc-300 block mb-2">Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border-zinc-700 text-white px-3">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <InputField label="Monthly Rent" name="monthlyRent" type="number" value={formData.monthlyRent} onChange={handleChange}/>
      <InputField label="Security Deposit" name="securityDeposit" type="number" value={formData.securityDeposit} onChange={handleChange}/>
      <InputField label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange}/>
    </div>
    
    <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
      <Save size={18}/>
      { loading ? "Updating..." : "Update Tenant" }
    </Button>
  </motion.form>
  
  </div>
  </DashboardLayout>
);
}

function InputField({label, name, type="text", value, onChange}){
  return(
  <div>
    <label className="text-zinc-300 block mb-2">{label}</label>
    <Input type={type} name={name} value={value} onChange={onChange} className="bg-zinc-900 border-zinc-700 text-white"/>
  </div>
  );
}

export default EditTenant;