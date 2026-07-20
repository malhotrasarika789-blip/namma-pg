import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import api from "@/api/axios";
import TenantLayout from "./components/TenantLayout";
import { User, Phone, Mail, Edit, Building2, DoorOpen, Bed, IndianRupee, CalendarDays, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/tenants/me");
      setProfile(response.data.tenant);
    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <TenantLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">
            Loading Profile...
          </h2>
        </div>
      </TenantLayout>
    );
  }

  return (

    <TenantLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">
              My Profile
            </h1>

            <p className="text-zinc-400 mt-2">Manage your personal information</p>
          </div>

          <Button onClick={() => navigate("/tenant/profile/edit")} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <Edit size={18} />
            Edit Profile
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8">

          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
              <User size={32} />
            </div>
            <div>

              <h2 className="text-2xl font-bold text-white">
                {profile?.fullName}
              </h2>

              <p className="text-zinc-400">
                Tenant Account
              </p>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>

              <p className="text-zinc-500 mb-2">Phone</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <Phone size={20} />
                {profile?.phone || "N/A"}

              </div>

            </div>

            <div>

              <p className="text-zinc-500 mb-2">Email</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <Mail size={20} />
                {profile?.email || "N/A"}
              </div>

            </div>
            <div>

              <p className="text-zinc-500 mb-2">
                Gender
              </p>

              <div className="flex items-center gap-3 text-white text-lg">
                <UserRound size={20} />
                {profile?.gender || "N/A"}
              </div>
            </div>
            <div>

              <p className="text-zinc-500 mb-2">
                Property
              </p>

              <div className="flex items-center gap-3 text-white text-lg">
                <Building2 size={20} />
                {profile?.bed?.room?.property?.name || "N/A"}
              </div>
            </div>
            <div>

              <p className="text-zinc-500 mb-2">Room</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <DoorOpen size={20} />
                {profile?.bed?.room?.roomNumber || "N/A"}
              </div>
            </div>
            <div>

              <p className="text-zinc-500 mb-2">Bed</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <Bed size={20} />
                {profile?.bed?.bedNumber || "N/A"}
              </div>
            </div>

            <div>

              <p className="text-zinc-500 mb-2">Monthly Rent</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <IndianRupee size={20} />
                ₹{profile?.monthlyRent || 0}
              </div>

            </div>

            <div>

              <p className="text-zinc-500 mb-2">Check In Date</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <CalendarDays size={20} />
                {profile?.checkInDate ? new Date(profile.checkInDate).toLocaleDateString() : "N/A"}
              </div>
            </div>

            <div>

              <p className="text-zinc-500 mb-2">Emergency Contact</p>
              <div className="flex items-center gap-3 text-white text-lg">
                <Phone size={20} />
                {profile?.emergencyContact || "N/A"}
              </div>
            </div>

            <div>

              <p className="text-zinc-500 mb-2">Status</p>
              <span className={`px-4 py-2 rounded-full font-semibold ${profile?.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                {profile?.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </motion.div>

      </div>

    </TenantLayout>

  );

}

export default Profile;