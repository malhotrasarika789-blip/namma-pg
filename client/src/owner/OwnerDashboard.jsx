import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Building2, Bed, Users, IndianRupee, CalendarDays, Clock } from "lucide-react";

function OwnerDashboard() {
  const [statsData, setStatsData] = useState({
    totalProperties: 0,
    totalRooms: 0,
    totalBeds: 0,
    occupiedBeds: 0,
    vacantBeds: 0,
    monthlyExpectedRent: 0
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    getDashboardData();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const getDashboardData = async () => {
    try {
      const response = await api.get("/dashboard/stats");
      setStatsData(response.data.stats);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const stats = [
    {
      title: "Total Properties",
      value: statsData.totalProperties,
      icon: <Building2 />,
      color: "bg-emerald-500"
    },

    {
      title: "Total Rooms",
      value: statsData.totalRooms,
      icon: <Bed />,
      color: "bg-blue-500"
    },

    {
      title: "Total Beds",
      value: statsData.totalBeds,
      icon: <Bed />,
      color: "bg-cyan-500"
    },

    {
      title: "Occupied Beds",
      value: statsData.occupiedBeds,
      icon: <Users />,
      color: "bg-purple-500"
    },

    {
      title: "Vacant Beds",
      value: statsData.vacantBeds,
      icon: <Bed />,
      color: "bg-green-500"
    },

    {
      title: "Monthly Revenue",
      value: `₹${statsData.monthlyExpectedRent}`,
      icon: <IndianRupee />,
      color: "bg-yellow-500"
    }

  ];

  const occupancy = statsData.totalBeds > 0 ? Math.round((statsData.occupiedBeds / statsData.totalBeds) * 100) : 0;

  return(

    <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
          <div className="flex flex-col xl:flex-row justify-between gap-6">
            <div>
              <h1 className="text-5xl font-bold text-white">
                Welcome Back 👋
              </h1>
              <p className="text-zinc-400 mt-3 text-lg">
                Monitor your properties, rooms, tenants and revenue from one dashboard.
              </p>

            </div>
            <div className="rounded-3xl bg-[#10271D] border border-emerald-500/20 px-6 py-5 shadow-[0_0_35px_rgba(16,185,129,0.15)]">
              <div className="flex items-center gap-3 text-zinc-300">
                <CalendarDays size={18} className="text-emerald-400"/>
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </div>

              <div className="flex items-center gap-3 mt-4 text-3xl font-bold text-white">
                <Clock size={22} className="text-emerald-400"/>
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <motion.div key={index} initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
            transition={{delay: index * 0.08}} whileHover={{y: -8, scale: 1.02}}
            className="bg-[#10271D] border border-emerald-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_45px_rgba(16,185,129,0.35)] transition-all">

                <div className="flex justify-between items-center">
                  <div>

                    <p className="text-zinc-400">{item.title}</p>
                    <h2 className="mt-4 text-4xl font-bold text-white">{item.value}</h2>
                  </div>

                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-black ${item.color}`}>
                    {item.icon}
                    </div>

                </div>
              </motion.div>
            ))
          }

        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          <motion.div initial={{opacity: 0, x: -40}} animate={{opacity: 1, x: 0}}
            className="bg-[#10271D] border border-emerald-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">

            <h2 className="text-2xl font-bold text-white">Occupancy Overview</h2>
            <p className="text-zinc-400 mt-2">Current bed occupancy</p>
            <div className="mt-8">
              <div className="flex justify-between mb-3">
                <span className="text-zinc-400">Occupied</span>
                <span className="text-emerald-400 font-bold">{occupancy}%</span>
              </div>

              <div className="w-full h-4 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div initial={{width: 0}} animate={{width: `${occupancy}%`}} transition={{duration: 1}}
                className="h-full rounded-full bg-emerald-500"/>
              </div>

              <div className="mt-5 flex justify-between">
                <div>
                  <p className="text-zinc-500">Occupied Beds</p>
                  <h3 className="text-3xl font-bold text-white mt-2">{statsData.occupiedBeds}</h3>
                </div>

                <div>
                  <p className="text-zinc-500">Vacant Beds</p>
                  <h3 className="text-3xl font-bold text-white mt-2">{statsData.vacantBeds}</h3>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, x: 40}}
            animate={{opacity: 1, x: 0}} className="bg-[#10271D] border border-emerald-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <h2 className="text-2xl font-bold text-white">Revenue Overview</h2>
              <p className="text-zinc-400 mt-2">Monthly expected collection</p>

            <div className="mt-10">
              <h1 className="text-5xl font-bold text-emerald-400">₹{statsData.monthlyExpectedRent}</h1>
              <p className="text-zinc-400 mt-3">Expected Monthly Revenue</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#071A12] p-5">
                <p className="text-zinc-400">Properties</p>
                <h3 className="text-3xl text-white font-bold mt-2">{statsData.totalProperties}</h3>
              </div>

              <div className="rounded-2xl bg-[#071A12] p-5">
                <p className="text-zinc-400">Rooms</p>
                <h3 className="text-3xl text-white font-bold mt-2">{statsData.totalRooms}</h3>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div initial={{opacity: 0, y: 40}} animate={{opacity: 1, y: 0}}
        transition={{delay: 0.3}} className="bg-[#10271D] border border-emerald-500/20 rounded-3xl p-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-2xl font-bold text-white">Platform Overview</h2>
              <p className="text-zinc-400 mt-2">Current status of your PG management system</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

            <motion.div whileHover={{ y: -6 }} className="rounded-2xl bg-[#071A12] p-5 border border-emerald-500/10">
              <h3 className="text-emerald-400 font-semibold">Properties</h3>
              <p className="text-zinc-400 mt-3">Manage all PG properties from one dashboard.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="rounded-2xl bg-[#071A12] p-5 border border-blue-500/10">
              <h3 className="text-blue-400 font-semibold">Rooms & Beds</h3>
              <p className="text-zinc-400 mt-3">Track occupied and vacant rooms with ease.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="rounded-2xl bg-[#071A12] p-5 border border-purple-500/10">
              <h3 className="text-purple-400 font-semibold">Tenants</h3>
              <p className="text-zinc-400 mt-3">View and manage tenant profiles and room assignments.</p>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="rounded-2xl bg-[#071A12] p-5 border border-yellow-500/10">
              <h3 className="text-yellow-400 font-semibold">Revenue</h3>
              <p className="text-zinc-400 mt-3">Monitor expected monthly rent collection.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default OwnerDashboard;