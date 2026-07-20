import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Building2, Bed, Users, Wallet, MessageSquareWarning, BarChart3, LogOut, Menu, X} from "lucide-react";


function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const menu = [
    {
      name: "Dashboard",
      path: "/owner/dashboard",
      icon: <LayoutDashboard size={20}/>
    },

    {
      name: "Properties",
      path: "/owner/properties",
      icon: <Building2 size={20}/>
    },

    {
      name: "Rooms",
      path: "/owner/rooms",
      icon: <Bed size={20}/>
    },

    { name:"Beds", path:"/owner/beds", icon:<Bed size={20}/>},
{
  name: "Tenants",
  path: "/owner/tenants",
  icon: <Users size={20}/>
},
    {
  name: "Rent",
  path: "/owner/rents",
  icon: <Wallet size={20}/>
},
    {
  name: "Complaints",
  path: "/owner/complaints",
  icon: <MessageSquareWarning size={20} />
},

    {
  name: "Reports",
  path: "/owner/reports",
  icon: <BarChart3 size={20}/>
}
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
  <motion.aside initial={{x:-100, opacity:0}} animate={{x:0, opacity:1, width: open ? 260 : 90}} transition={{duration:0.5}}
  className="fixed top-0 left-0 h-screen bg-[#10271D] border-r border-emerald-900 shadow-2xl p-5 z-50 overflow-hidden">

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center">

            <span className="text-black font-bold text-2xl">N</span>
          </div>

          {open && <div>

              <h1 className="text-xl font-bold">Namma <span className="text-emerald-400">
                PG
                </span>
              </h1>


              <p className="text-xs text-zinc-400">Operations</p>
              </div>
              }
              
              </div>

        <button onClick={()=>setOpen(!open)} className="text-emerald-400">

          {open ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>


      <div className="space-y-2">
        
        {
        menu.map((item,index) => (
          <NavLink key={index} to={item.path} className={({isActive}) => `flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${isActive ? "bg-emerald-500 text-black shadow-lg" : "text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-400"}`}>
            
            <motion.span whileHover={{scale:1.2}}>{item.icon}</motion.span>
            
            {open && <span className="font-medium">{item.name}</span>
            }
            
            </NavLink>
            ))
            }
            
            </div>
            
            <button onClick={logout} className="absolute bottom-8 left-5 flex items-center gap-3 text-zinc-400 hover:text-red-400">
              <LogOut size={20}/>
              
              {open && <span> Logout </span>}
              </button>
              </motion.aside>
              )
            }
            
      export default Sidebar;