import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import { Home, Bed, IndianRupee, MessageSquare, ArrowRight,} from "lucide-react";
import { Button } from "@/components/ui/button";

function TenantDashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        roomNumber: "-",
        bedNumber: "-",
        monthlyRent: 0,
        pendingRent: 0,
        complaints: 0,
        tenantName: "",
    });
    
    useEffect(() => {
        fetchDashboard();
    }, []);
    
    const fetchDashboard = async () => {
    try {
        console.log("Dashboard API calling");

        const response = await api.get("/tenants/dashboard");

        const data = response.data;
        const tenant = data.tenant;

        setStats({
            tenantName: tenant?.fullName || "",
            roomNumber: tenant?.bed?.room?.roomNumber || "-",
            bedNumber: tenant?.bed?.bedNumber || "-",
            monthlyRent: tenant?.monthlyRent || 0,
            pendingRent: 0,
            complaints: 0,
        });

    } catch (error) {

        console.log("ERROR:", error);
        console.log("BACKEND ERROR:", error.response?.data);

        toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
        setLoading(false);
    }
};
    
    if(loading) {
        return(
        <TenantLayout>
            
            <div className = "h-[80vh] flex items-center justify-center">
                <h2 className = "text-xl text-zinc-400 animate-pulse">
                    Loading Dashboard...
                    </h2>
                    </div>
                    </TenantLayout>
                    );
                }
                
                return(
                <TenantLayout>
                    <div className = "space-y-8">
                        <motion.div initial = {{opacity: 0, y: -30,}}
                        animate = {{opacity: 1, y: 0,}}
                        className = "flex justify-between items-center">
                            <div>
                                
                                <h1 className = "text-4xl font-bold text-white">
                                    Welcome,
                                    <span className = "text-emerald-400"> {" "}{stats.tenantName}</span>
                                    </h1>
                                    
                                    <p className = "text-zinc-400 mt-2">
                                        Here's an overview of your stay.
                                        </p>
                                        </div>
                                        </motion.div>
                                        
                                        <div className = "grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                                            <motion.div whileHover = {{ scale: 1.03 }} 
                                            className = "bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
                                                
                                                <Home size = {34} className="text-emerald-400 mb-5"/>
                                                
                                                <p className="text-zinc-400">
                                                    Room Number
                                                    </p>
                                                    
                                                    <h2 className="text-4xl font-bold text-white mt-2">
                                                        {stats.roomNumber}
                                                        </h2>
                                                        </motion.div>
                                                        
                                            <motion.div whileHover={{ scale: 1.03 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

    <Bed size={34} className="text-blue-400 mb-5"/>
    <p className="text-zinc-400">Bed Number</p>

    <h2 className="text-4xl font-bold text-white mt-2">{stats.bedNumber}</h2>

  </motion.div>

  <motion.div whileHover={{ scale: 1.03 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

    <IndianRupee size={34} className="text-green-400 mb-5"/>

    <p className="text-zinc-400">Monthly Rent</p>

    <h2 className="text-4xl font-bold text-white mt-2">₹{stats.monthlyRent}</h2>
  </motion.div>

  <motion.div whileHover={{ scale: 1.03 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">

    <MessageSquare size={34} className="text-yellow-400 mb-5"/>
    <p className="text-zinc-400">Pending Rent</p>
    <h2 className="text-4xl font-bold text-white mt-2">₹{stats.pendingRent}</h2>

  </motion.div>

</div>

<div className="grid lg:grid-cols-2 gap-8">

  <motion.div initial={{opacity:0, x:-30}} animate={{opacity:1,x:0}}
    className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">

    <MessageSquare size={40} className="text-red-400 mb-6"/>
    <h2 className="text-2xl font-bold text-white">Active Complaints </h2>
    <p className="text-6xl font-bold text-emerald-400 mt-4">{stats.complaints}</p>
    <p className="text-zinc-400 mt-3">Complaints currently under review.</p>
    </motion.div>

    <motion.div initial={{opacity:0, x:30}} animate={{opacity:1, x:0}}
    className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">
    <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
    <div className="space-y-4">

        <Button onClick={() => navigate("/tenant/room")} className="w-full justify-between bg-zinc-800 hover:bg-zinc-700 text-white">My Room
        <ArrowRight size={18}/>
        </Button>

        <Button onClick={() => navigate("/tenant/rents")}
        className="w-full justify-between bg-zinc-800 hover:bg-zinc-700 text-white">
        Rent History
        <ArrowRight size={18}/>
        </Button>
        <Button onClick={() => navigate("/tenant/complaints")} className="w-full justify-between bg-zinc-800 hover:bg-zinc-700 text-white">
        My Complaints
        <ArrowRight size={18}/>
        </Button>
        <Button onClick={() => navigate("/tenant/profile")} className=" w-full justify-between bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
        My Profile
        <ArrowRight size={18}/>

    </Button>
    </div>
    </motion.div>
    </div>
</div>
    </TenantLayout>
    );
}

export default TenantDashboard;