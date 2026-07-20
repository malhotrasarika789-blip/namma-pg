import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { Plus, Bed, Users, Pencil, Trash2, IndianRupee, } from "lucide-react";
import { Button } from "@/components/ui/button";

function Rooms() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.get(`/rooms/property/${id}`);
      setRooms(response.data.rooms);
    }

    catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch rooms");
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
    const confirmDelete = window.confirm("Delete this room?");
    if (!confirmDelete) return;
    try {
      await api.delete(`/rooms/${roomId}`);
      toast.success("Room deleted successfully");
      fetchRooms();
    }
    catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
    <DashboardLayout>
        <div className="h-[80vh] flex items-center justify-center">
          <h2 className="text-xl text-zinc-400 animate-pulse">Loading Rooms...</h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial={{opacity: 0, y: -30,}} animate={{opacity: 1, y: 0,}} transition={{duration: 0.5,}}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div>
            
            <h1 className="text-4xl font-bold text-white">Rooms</h1>
            <p className="mt-2 text-zinc-400">Manage all rooms of this property</p>
            </div>
            
            <Button onClick={() => navigate(`/owner/properties/${id}/rooms/create`)}
            className="bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
              <Plus size={18} />
              Add Room
              </Button>
            </motion.div>
            {rooms.length === 0 ? (

            <motion.div initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full min-h-[300px] bg-[#18181B] border border-zinc-800 rounded-3xl py-20 px-6 flex flex-col items-center justify-center text-center">

                <Bed size={55} className="mx-auto text-emerald-400 mb-5"/>
                <h2 className="text-2xl font-bold text-white">No Rooms Added</h2>

                <p className="mt-2 text-zinc-400">Add your first room for this property.</p>
                
                  <Button onClick={() => navigate(`/owner/properties/${id}/rooms/create`)}
                  className="mt-8 bg-emerald-500 hover:bg-emerald-400 !text-black">
                    <Plus size={18} />
                    Add Room
                    </Button>
                    </motion.div>
                    
                ) : (

    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">{rooms.map((room, index) => (
        <motion.div key={room._id} initial={{opacity: 0, y: 40,}} animate={{opacity: 1, y: 0,}}
        transition={{delay: index * 0.1,}} whileHover={{y: -8, scale: 1.02,}}
        className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all">
          
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Room {room.roomNumber}</h2>
          <Bed size={28} className="text-emerald-400"/>
    </div>
    <div className="mt-6 space-y-4">
      <div>
        <p className="text-zinc-400">Floor</p>
        <h3 className="text-white text-lg font-semibold">{room.floor}</h3>
      </div>
      <div>

        <p className="text-zinc-400">Capacity</p>
        <div className="flex items-center gap-2 text-white">
          <Users size={18} />
          {room.capacity}
        </div>
      </div>

    </div>

    <div className="mt-8 grid grid-cols-3 gap-3">
      <Button onClick={() => navigate(`/owner/rooms/${room._id}`)}
        className="bg-emerald-500 hover:bg-emerald-400 !text-black">
          View
      </Button>

      <Button onClick={() => navigate(`/owner/rooms/edit/${room._id}`)}
      className="bg-blue-500 hover:bg-blue-400 !text-white">
        <Pencil size={16} />
      </Button>

      <Button onClick={() => handleDelete(room._id)}
          className="bg-red-500 hover:bg-red-400 !text-white">
        <Trash2 size={16} />
      </Button>

    </div>
  </motion.div>
))}

    </div>
  )}
      </div>
    </DashboardLayout>
  );

}

export default Rooms;