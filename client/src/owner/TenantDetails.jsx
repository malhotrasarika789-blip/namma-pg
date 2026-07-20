import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, User, Phone, Mail, Bed, IndianRupee, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";


function TenantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenant();
  }, []);

  const fetchTenant = async () => {
    try {
      const response = await api.get(`/tenants/${id}`);
      setTenant(response.data.tenant);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch tenant details");
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return (
      <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">
            Loading Tenant Details...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  if(!tenant){
    return (
      <DashboardLayout>
        <div className="text-center text-white">
          Tenant not found
        </div>
      </DashboardLayout>
    );
  }

  return(
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial={{opacity:0, y:-30}} animate={{opacity:1, y:0}}
          className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">Tenant Details</h1>
            <p className="text-zinc-400 mt-2">Complete tenant information</p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={18}/>
            Back
            </Button>
        </motion.div>

        <motion.div initial={{opacity:0, y:40}} animate={{opacity:1, y:0}}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-4">
            <User size={50} className="text-emerald-400"/>
          <div>
            
            <h2 className="text-3xl font-bold text-white">{tenant.fullName}</h2>
              <p className="text-zinc-400">{tenant.gender}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Info icon={<Phone size={20}/>} title="Phone" value={tenant.phone}/>
            <Info icon={<Mail size={20}/>} title="Email" value={tenant.email}/>
            <Info icon={<Bed size={20}/>} title="Bed" value={`Room ${tenant.bed?.room?.roomNumber || "-"} • Bed ${tenant.bed?.bedNumber || "-"}`}/>
            <Info icon={<IndianRupee size={20}/>} title="Monthly Rent" value={`₹${tenant.monthlyRent}/month`}/>
            <Info icon={<Wallet size={20}/>} title="Security Deposit" value={`₹${tenant.securityDeposit}`}/>
            <Info icon={<ShieldCheck size={20}/>} title="Emergency Contact" value={tenant.emergencyContact}/>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

function Info({icon,title,value}) {

  return (
  <div className="bg-zinc-900 rounded-2xl p-5 flex gap-4 items-center">
    <div className="text-emerald-400">{icon}</div>
    <div>
      
      <p className="text-zinc-400 text-sm">{title}</p>
      <p className="text-white font-semibold">{value || "-"}</p>
    </div>

    </div>
  );
}

export default TenantDetails;