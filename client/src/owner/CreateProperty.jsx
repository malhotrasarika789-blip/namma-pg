import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateProperty(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
        name:"",
        address:"",
        city:"",
        state:"",
        pincode:"",
        description:""
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const response = await api.post("/properties/create",formData);
            toast.success(response.data.message || "Property Created Successfully");
            navigate("/owner/properties");
        }catch(error){
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        }
    };
    
    return(
    <DashboardLayout>
        <div className="max-w-3xl mx-auto space-y-8">
            <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}}>
                <h1 className="text-4xl font-bold text-white">Create Property</h1>
                <p className="text-zinc-400 mt-2">Add your PG property details</p>
                </motion.div>
                
                <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}}
                className="bg-[#10271D] border border-emerald-500/20 rounded-3xl p-8 shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                    <Input name="name" placeholder="Property Name" value={formData.name} onChange={handleChange}
                    className="bg-[#071A12] border-emerald-900 text-white placeholder:text-zinc-500"/>
                    <Input name="address" placeholder="Address" value={formData.address} onChange={handleChange} 
                    className="bg-[#071A12] border-emerald-900 text-white placeholder:text-zinc-500"/>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="bg-[#071A12] border-emerald-900 text-white placeholder:text-zinc-500"/>
                        <Input name="state" placeholder="State" value={formData.state} onChange={handleChange}
                        className="bg-[#071A12] border-emerald-900 text-white placeholder:text-zinc-500"/>
                    </div>
                    
            <Input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} 
            className="bg-[#071A12] border-emerald-900 text-white placeholder:text-zinc-500"/>
            
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}
            className="w-full h-32 rounded-xl bg-[#071A12] border border-emerald-900 p-4 text-white placeholder:text-zinc-500 outline-none"/>
            
            <Button disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                {loading ? "Creating..." : "Create Property"}
                
                </Button>
        </form>
    </motion.div>
</div>
</DashboardLayout>
)
}

export default CreateProperty;