import { useEffect, useState } from "react";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users, ShieldCheck, UserCog } from "lucide-react";

function AdminDashboard(){
  const [users,setUsers] = useState([]);
  
  useEffect(() => {
    fetchUsers();
  },[]);
  
  const fetchUsers = async() => {
    try{
      const res = await api.get("/users");
      setUsers(res.data.users);
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to fetch users");
    }
  };
  
  const makeOwner = async(id) => {
    try{
      await api.put(`/users/${id}/role`, {role:"owner"});
      toast.success("User upgraded to owner");
      fetchUsers();
    }catch(error){
      
      toast.error(error.response?.data?.message || "Failed to upgrade user");}
    };
    
    const totalUsers = users.length;
    
    const owners = users.filter(user => user.role === "owner").length;
    
    const tenants = users.filter(user => user.role === "tenant" || user.role === "user").length;
    
    return(
    <div className = "min-h-screen bg-[#071A12] text-white p-8">
      
      <h1 className = "text-4xl font-bold mb-2">
        Admin Dashboard
        </h1>
        
        <p className="text-zinc-400 mb-8">
          Manage users and upgrade owners
          </p>
          
          <div className = "grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className = "bg-[#18181B] border border-zinc-800 rounded-2xl p-6">
              <Users className="text-emerald-400 mb-3"/>
              <p className="text-zinc-400">Total Users</p>
              
              <h2 className="text-3xl font-bold">{totalUsers}</h2>
              </div>
              
              <div className = "bg-[#18181B] border border-zinc-800 rounded-2xl p-6">
                <UserCog className = "text-blue-400 mb-3"/>
                
                <p className = "text-zinc-400">Owners</p>
                
                <h2 className = "text-3xl font-bold">{owners}</h2>
                </div>
                
                <div className = "bg-[#18181B] border border-zinc-800 rounded-2xl p-6">
                  <ShieldCheck className="text-purple-400 mb-3"/>
                  <p className = "text-zinc-400">Tenants</p>
                  
                  <h2 className = "text-3xl font-bold">{tenants}</h2>
                  </div>
                  </div>
                  
                  <h2 className = "text-2xl font-bold mb-5">All Users</h2>
                  
                  <div className = "space-y-4">
                    {users.map((user) => (
                      <div key = {user._id} className = "bg-[#18181B] border border-zinc-800 rounded-xl p-5 flex justify-between items-center">
                        
                        <div>
                        <h3 className = "text-xl font-semibold">{user.fullName}</h3>                       
                        <p className="text-zinc-400">{user.email}</p>
                        <p className="text-emerald-400">Role: {user.role}</p>
                        
                        </div>
                        
                        { user.role === "user" && (
                          <Button onClick = {() => makeOwner(user._id)}
                          className = "bg-emerald-500 text-black hover:bg-emerald-400">
                            Make Owner
                            </Button>
                            )
                            }
                            
                            </div>
                            ))
                            }
                            
                      </div>
                      
            </div>
            )
          }
          
          export default AdminDashboard;