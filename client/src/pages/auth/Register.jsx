import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Register(){
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
        fullName:"",
        email:"",
        password:"",
    });
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.fullName || !formData.email || !formData.password){
            toast.error("Please fill all fields");
            return;
        }
        
    try{
        setLoading(true);
        const res = await api.post("/users/register", {...formData, role:"user"});
        toast.success(res.data.message || "Account created 🎉");
        navigate("/login");
    }catch(error){
        console.log("Register Error:", JSON.stringify(error.response?.data, null, 2));
        
        toast.error(error.response?.data?.message || "Registration failed");
    }finally{
        setLoading(false);
    }
};

return(
<div className="min-h-screen bg-[#071A12] flex items-center justify-center px-5">
    <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}} whileHover={{y:-5}} transition={{duration:0.6}}
    className="w-full max-w-md bg-[#10271D] border border-emerald-900 rounded-3xl p-8 shadow-2xl shadow-emerald-900/40">
        
        <div className="text-center mb-7">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-black text-2xl font-bold">N</span>
        </div>
        
        <h1 className="text-3xl font-bold mt-4 text-white">Create Account</h1>
        <p className="text-zinc-400 mt-2">Join Namma PG Platform</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="bg-[#071A12] border-emerald-900 text-white"/>
            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
                className="bg-[#071A12] border-emerald-900 text-white"/>
                
                <div className="relative">
                    <Input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={handleChange}
                    className="bg-[#071A12] border-emerald-900 text-white pr-12"/>
                    <button type="button" onClick = {() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                        
                        { showPassword ? <EyeOff size={20}/> : <Eye size={20}/> }
                        </button>
                    </div>
                    
                <Button type="submit" disabled={loading} className="w-full bg-emerald-500 !text-black font-bold hover:bg-emerald-400 hover:scale-105 transition">
                    { loading ? "Creating..." : "Create Account" }
                    </Button>
                </form>
        <p className="text-center text-zinc-400 mt-5">Already have account?
            <button type="button" onClick = {() => navigate("/login")} className="ml-2 text-emerald-400 font-semibold hover:text-emerald-300">
                Login
            </button>
        </p>
    </motion.div>
</div>
)

}

export default Register;