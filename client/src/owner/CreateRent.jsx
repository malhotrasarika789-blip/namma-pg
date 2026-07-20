import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


function CreateRent(){
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [tenants,setTenants] = useState([]);
  const [formData,setFormData] = useState({
    tenant:"",
    billingMonth:"",
    amount:"",
    dueDate:"",
    status:"pending"
  });
  
  useEffect(() => {
    fetchTenants();
  },[]);
  
  const fetchTenants = async() => {
    try{
      const response = await api.get("/tenants");
      setTenants(response.data.tenants || []);
    }catch(error){
      console.log(JSON.stringify(error.response?.data, null, 2)
    );
    toast.error(error.response?.data?.message || "Failed to create rent");
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
  if(!formData.tenant || !formData.billingMonth || !formData.amount || !formData.dueDate){
    toast.error("Please fill all fields");
    return;
  }
  
  try{
    setLoading(true);
    await api.post("/rents",{
      tenant: formData.tenant,
      billingMonth: formData.billingMonth,
      amount: Number(formData.amount),
      dueDate: formData.dueDate,
      status: formData.status
    });
    
    toast.success("Rent created successfully");
    navigate("/owner/rents");
  }catch(error){
    console.log(error.response?.data);
    toast.error(error.response?.data?.message ||  "Failed to create rent");
  }finally{
    setLoading(false);
  }
};

return(
<DashboardLayout>
  <div className="max-w-3xl mx-auto">
    <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}}
    className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Create Rent</h1>
        <p className="text-zinc-400 mt-2">Generate tenant rent record</p>
        </div>
        
        <Button onClick={() => navigate(-1)} className="bg-zinc-800 text-white">
          <ArrowLeft size={18}/>Back</Button>
          </motion.div>
          
          <motion.form onSubmit={handleSubmit} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
            <div>
              <label className="text-zinc-300 block mb-2">Select Tenant</label>
              <select name="tenant" value={formData.tenant} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
                
                <option value="">Select Tenant</option>
                {tenants.map((tenant) => (
                  <option key={tenant._id} value={tenant._id}>
                    {tenant.fullName}
                    </option>
                    ))
                    }
                    
                </select>
                </div>
              <Input type="month" name="billingMonth" value={formData.billingMonth} onChange={handleChange} 
              className="bg-zinc-900 border-zinc-700 text-white"/>
              <Input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="5000" 
              className="bg-zinc-900 border-zinc-700 text-white"/>
              <Input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} 
              className="bg-zinc-900 border-zinc-700 text-white"/>
              
              <select name="status" value={formData.status} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                </select>
                
                <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 !text-blackfont-bold">
                  <IndianRupee size={18}/>
                  
                  {loading ? "Creating..." : "Create Rent"}
                  </Button>
                  
              </motion.form>
              
            </div>
            
          </DashboardLayout>
        );
      }

export default CreateRent;