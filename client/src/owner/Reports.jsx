import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Building2, Bed, Users, IndianRupee, MessageSquare, BarChart3, } from "lucide-react";

function Reports() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    properties: 0,
    rooms: 0,
    beds: 0,
    tenants: 0,
    occupiedBeds: 0,
    availableBeds: 0,
    totalRent: 0,
    paidRent: 0,
    pendingRent: 0,
    complaints: 0,
    openComplaints: 0,
    resolvedComplaints: 0,
  });
  
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [propertyRes,roomRes,bedRes,tenantRes,rentRes,complaintRes,] = await Promise.all([
        api.get("/properties/my-properties"),
        api.get("/rooms"),
        api.get("/beds"),
        api.get("/tenants"),
        api.get("/rents"),
        api.get("/complaints"),
      ]);

      const beds = bedRes.data.beds || [];
      const rents = rentRes.data.rents || [];
      const complaints = complaintRes.data.complaints || [];

      setStats({
        properties: propertyRes.data.properties.length,
        rooms: roomRes.data.rooms.length,
        beds: beds.length,
        tenants: tenantRes.data.tenants.length,
        occupiedBeds: beds.filter((bed) => bed.status === "occupied").length,
        availableBeds: beds.filter((bed) => bed.status === "available").length,
        totalRent: rents.reduce((sum, rent) => sum + rent.amount,0),
        paidRent: rents.filter((rent) => rent.status === "Paid").reduce((sum, rent) => sum + rent.amount,0),
        pendingRent: rents.filter((rent) => rent.status === "Pending") 
        .reduce((sum, rent) => sum + rent.amount,0),
        complaints: complaints.length,
        openComplaints: complaints.filter((complaint) => complaint.status === "Open").length,
        resolvedComplaints: complaints.filter((complaint) => complaint.status === "Resolved").length,
      });
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load reports");
      } finally {
        setLoading(false);
    }
  };

  if(loading){
    return(
    <DashboardLayout>
      <div className="h-[80vh] flex items-center justify-center">
        <h2 className="text-xl text-zinc-400 animate-pulse">
          Loading Reports...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return(
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30,}} animate={{opacity: 1, y: 0,}} className="flex items-center gap-4">
          <BarChart3 size={38} className="text-emerald-400"/>
          <div>
            <h1 className="text-4xl font-bold text-white">Reports</h1>
            <p className="text-zinc-400 mt-2">Overview of your PG operations</p>
          </div>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
            <Building2 size={32} className="text-emerald-400 mb-4"/>
            <h2 className="text-zinc-400">Properties</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.properties}</p>
            </div>
            
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <Bed size={32} className="text-blue-400 mb-4"/>
              <h2 className="text-zinc-400">Rooms</h2>
              <p className="text-4xl font-bold text-white mt-2">{stats.rooms}</p>
            </div>
            
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <Bed size={32} className="text-yellow-400 mb-4"/>
              <h2 className="text-zinc-400">Beds</h2>
              <p className="text-4xl font-bold text-white mt-2">{stats.beds}</p>
            </div>
            
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <Users size={32} className="text-purple-400 mb-4"/>
              <h2 className="text-zinc-400">Tenants</h2>
              <p className="text-4xl font-bold text-white mt-2">{stats.tenants}</p>
            </div>
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <Bed size={32} className="text-green-400 mb-4"/>
              <h2 className="text-zinc-400">Occupied Beds</h2>
              <p className="text-4xl font-bold text-white mt-2">{stats.occupiedBeds}</p>
              </div>
              
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <Bed size={32} className="text-cyan-400 mb-4"/>
              <h2 className="text-zinc-400">Available Beds</h2>
              <p className="text-4xl font-bold text-white mt-2">{stats.availableBeds}</p>
              </div>
              
              <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
                <IndianRupee size={32} className="text-emerald-400 mb-4"/>
                <h2 className="text-zinc-400">Total Rent</h2>
                <p className="text-4xl font-bold text-white mt-2">₹{stats.totalRent}</p>
              </div>
              
              <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
                <IndianRupee size={32} className="text-green-400 mb-4"/>
                <h2 className="text-zinc-400">Paid Rent</h2>
                <p className="text-4xl font-bold text-white mt-2">₹{stats.paidRent}</p>
              </div>
              
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <IndianRupee size={32} className="text-yellow-400 mb-4"/>
              <h2 className="text-zinc-400">Pending Rent</h2>
              <p className="text-4xl font-bold text-white mt-2">₹{stats.pendingRent}</p>
              </div>
              <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
                <MessageSquare size={32} className="text-red-400 mb-4"/>
                <h2 className="text-zinc-400">Total Complaints</h2>
                <p className="text-4xl font-bold text-white mt-2">{stats.complaints}</p>
              </div>
              
            <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
              <MessageSquare size={32} className="text-orange-400 mb-4"/>
              <h2 className="text-zinc-400">Open Complaints</h2>
              <p className="text-4xl font-bold text-white mt-2">{stats.openComplaints}</p>
            </div>
            
          <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6">
            <MessageSquare size={32} className="text-green-400 mb-4"/>
            <h2 className="text-zinc-400">Resolved Complaints</h2>
            <p className="text-4xl font-bold text-white mt-2">{stats.resolvedComplaints}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Reports;