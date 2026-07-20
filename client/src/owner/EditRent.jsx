import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import api from "@/api/axios";
import { ArrowLeft, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditRent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    billingMonth: "",
    amount: "",
    dueDate: "",
    paymentStatus: "Pending",
  });


  useEffect(() => {
    fetchRent();
  }, []);

  const fetchRent = async () => {
    try {
      const response = await api.get(`/rents/${id}`);
      const rent = response.data.rent;
      setFormData({
        billingMonth: rent.billingMonth?.slice(0, 7),
        amount: rent.amount,
        dueDate: rent.dueDate?.slice(0, 10),
        paymentStatus: rent.paymentStatus,
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch rent");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/rents/${id}`, {
        billingMonth: formData.billingMonth,
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        paymentStatus: Number(formData.amount) > 0 ? "Paid" : "Pending",
      });
      
    toast.success("Rent updated successfully");
    navigate("/owner/rents");
  } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update rent");
    } finally {
      setLoading(false);
    }
  };


  return(
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Edit Rent</h1>
            <p className="text-zinc-400 mt-2">Update rent details</p>
          </div>

          <Button onClick={() => navigate(-1)} className="bg-zinc-800 hover:bg-zinc-700">
            <ArrowLeft size={18} />
            Back
          </Button>
        </div>
        
        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="bg-[#18181B] border border-zinc-800 rounded-3xl p-8 space-y-6">
          <div>
            <label className="text-zinc-300 block mb-2">Billing Month</label>
            <Input type="month" name="billingMonth" value={formData.billingMonth} onChange={handleChange} className="bg-zinc-900 border-zinc-700 text-white"/>
            </div>
            
          <div>
            <label className="text-zinc-300 block mb-2">Amount</label>
            <Input type="number" name="amount" value={formData.amount} onChange={handleChange} className="bg-zinc-900 border-zinc-700 text-white"/>
          </div>

          <div>
            <label className="text-zinc-300 block mb-2">Due Date</label>
            <Input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="bg-zinc-900 border-zinc-700 text-white"/>
          </div>

          <div>
            <label className="text-zinc-300 block mb-2">Status</label>
            <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="w-full h-11 rounded-md bg-zinc-900 border border-zinc-700 px-3 text-white">
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 bg-emerald-500 hover:bg-emerald-400 !text-black font-bold">
            <IndianRupee size={18} />
            {loading ? "Updating..." : "Update Rent"}
            </Button>
        </motion.form>
      </div>

    </DashboardLayout>
  );
}

export default EditRent;