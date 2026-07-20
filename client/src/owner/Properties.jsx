import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Plus, Building2, MapPin, } from "lucide-react";
import { Button } from "@/components/ui/button";

function Properties() {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get("/properties/my-properties");
      setProperties(response.data.properties);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return(
    <DashboardLayout>
      <div className="space-y-8">

        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Properties</h1>
            <p className="mt-2 text-zinc-400">Manage your PG properties</p>
          </div>

          <Button onClick={() => navigate("/owner/properties/create")} className="bg-emerald-500 hover:bg-emerald-400 !text-black font-semibold rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.35)]">
            <Plus size={18} />
            Add Property
          </Button>

        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <p className="text-zinc-400 text-lg">
              Loading properties...
            </p>
          </div>
        ) : properties.length === 0 ? (

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#18181B] border border-zinc-800 rounded-3xl p-12 text-center">
            <div className="flex justify-center mb-6">

              <div className="h-24 w-24 rounded-full bg-[#10271D] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <Building2 size={45} className="text-emerald-400"/>

              </div>

            </div>

            <h2 className="text-2xl font-bold text-white">
              No Properties Found
            </h2>

            <p className="mt-3 text-zinc-400">
              Add your first PG property to start managing rooms,
              beds and tenants.
            </p>

            <Button onClick={() => navigate("/owner/properties/create")} className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black font-semibold rounded-xl">
              <Plus size={18} />
              Add Property
            </Button>

          </motion.div>

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property, index) => (

              <motion.div key={property._id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{y: -10, scale: 1.03,}}
              className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 transition-all duration-300 hover:border-emerald-500 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-black">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{property.name}</h2>
                    <p className="text-zinc-500 text-sm">PG Property</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <MapPin size={18} className="text-emerald-400"/>
                    <span>{property.city}, {property.state}</span>
                  </div>

                  <p className="text-sm text-zinc-400">{property.address}</p>

                </div>

                <Button onClick = {() => navigate(`/owner/properties/${property._id}`)}
                className="mt-8 w-full bg-emerald-500 hover:bg-emerald-400 !text-black font-semibold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                  View Details
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </DashboardLayout>

  );
}

export default Properties;