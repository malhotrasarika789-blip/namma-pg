import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login(){
  const navigate = useNavigate();
  
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!formData.email || !formData.password){
      toast.error("Please fill all fields");
      return;
    }
    
    try{
      setLoading(true);
      const response = await api.post("/users/login",formData);
      console.log("LOGIN RESPONSE:", response.data);
      console.log("USER ROLE:", response.data.user.role);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful 🎉");
      
      if(response.data.user.role === "admin"){
        navigate("/admin/dashboard");
      }else if(response.data.user.role === "owner"){
        navigate("/owner/dashboard");
      }else if(response.data.user.role === "tenant" || response.data.user.role === "user"){
        navigate("/tenant/dashboard");
      }
      else{
        toast.error("Invalid user role");
      }
    
    }catch(error){
      toast.error(error.response?.data?.message || "Login Failed");
    }
    finally{setLoading(false);}
  
  };
  return(
  <div className="min-h-screen bg-[#071A12] flex items-center justify-center px-5">
    <motion.div initial={{opacity:0, y:40, scale:0.9}} animate={{opacity:1, y:0, scale:1}} whileHover={{y:-5}}
    transition={{duration:0.6}} className="w-full max-w-md bg-[#10271D] border border-emerald-900 rounded-3xl p-8 shadow-2xl shadow-emerald-900/40">
      
      <div className="text-center mb-8">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
        <span className="text-black text-2xl font-bold">N</span>
        </div>
        <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-emerald-400 to-green-200 bg-clip-text text-transparent">Namma PG</h1>
        <p className="text-zinc-400 mt-2">Login to manage your PG operations</p>
        </div>
        
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange}
        className="h-11 bg-[#071A12] border-emerald-900 text-white"/>
        <div className="relative">
          
          <Input name="password" type={ showPassword ? "text" : "password" } placeholder="Password" value={formData.password}
          onChange={handleChange} className="h-11 bg-[#071A12] border-emerald-900 text-white pr-12"/>
          <button type="button" onClick = {() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
            { showPassword ? <EyeOff size={20}/> : <Eye size={20}/> }
          </button>
        </div>
        
        <Button type="submit" disabled={loading} className="w-full h-11 bg-emerald-500 !text-black font-bold rounded-xl hover:bg-emerald-400 hover:scale-105 transition">
          { loading ? "Logging in..." : "Login" }
          </Button>
        </form>
        
        <p className="text-center text-zinc-400 mt-6">Don't have an account? 
          <button onClick = {() => navigate("/register")} className="ml-2 text-emerald-400 font-semibold hover:text-emerald-300">
            Register
          </button>
        </p>
        
        </motion.div>
      </div>
    )
}

export default Login;