import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { User, ArrowLeft, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


function CreateTenant() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [beds, setBeds] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    fullName: "",
    phone: "",
    email: "",
    gender: "Male",
    bed: "",
    monthlyRent: "",
    securityDeposit: "",
    emergencyContact: "",
  });


  useEffect(() => {
    fetchUsers();
    fetchBeds();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      const tenantUsers = response.data.users.filter((user) => user.role === "tenant" || user.role === "user");
      setUsers(tenantUsers);
    } catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch users");
  }
};

const fetchBeds = async () => {
    try {
      const response = await api.get("/beds");
      const availableBeds = response.data.beds.filter((bed)=> bed.status === "available");
      setBeds(availableBeds);
    } catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch beds");
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
    setLoading(true);
    try{
      await api.post("/tenants",formData);
      toast.success("Tenant created successfully");
      navigate("/owner/tenants");
    }catch(error){
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to create tenant");
    }finally{
      setLoading(false);
    }
  };
  
  return(
  <DashboardLayout>
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">Add Tenant</h1>
          <p className="text-zinc-400 mt-2">Assign a tenant to an available bed</p>
          </div>
          
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft size={18}/>
          Back
          </Button>
        </motion.div>
        
      <motion.form onSubmit={handleSubmit} initial={{opacity:0, y:40}} animate={{opacity:1, y:0}}
      className="relative z-10 bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-zinc-300 block mb-2">Select User</label>
          <select name="user" value={formData.user} onChange={handleChange} className="relative z-50 w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
            <option value="">Select Tenant User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.fullName}</option>
              ))
              }
              </select>
            </div>
            
          <div>
            <label className="text-zinc-300 block mb-2">Select Bed</label>
            <select name="bed" value={formData.bed} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
              <option value="">Select Available Bed</option>
              
              {beds.map((bed) => ( 
                <option key={bed._id} value={bed._id}>
                  Room {bed.room?.roomNumber} • Bed {bed.bedNumber}
                  </option>
                ))
                }
                </select>
              </div>
              
            <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter full name"/>
            <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="9876543210"/>
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="tenant@gmail.com"/>
          <div>
            <label className="text-zinc-300 block mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
              
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              </select>
            </div>
            
          <InputField label="Monthly Rent" name="monthlyRent" type="number" value={formData.monthlyRent} onChange={handleChange} placeholder="6500"/>
          <InputField label="Security Deposit" name="securityDeposit" type="number" value={formData.securityDeposit} onChange={handleChange} placeholder="5000"/>
          <div className="md:col-span-2">
            <InputField label="Emergency Contact" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="9876543210"/>
            </div>
        </div>
        
      <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 text-black font-bold">
        <User size={18}/>
        {loading ? "Creating..." : "Create Tenant"}
        </Button>
      </motion.form>
    </div>
  </DashboardLayout>
  );

}
function InputField({ label, name, type="text", value, onChange, placeholder }){
  return(
  <div>
    <label className="text-zinc-300 block mb-2">{label}</label>
    <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className="bg-zinc-900 border-zinc-700 text-white"/>
    </div>
    );
}

export default CreateTenant;