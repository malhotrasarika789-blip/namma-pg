import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Home, IndianRupee, MessageSquare, User, LogOut, } from "lucide-react";

function TenantSidebar() {

  const navigate = useNavigate();
  const logout = () => {localStorage.removeItem("token");
    navigate("/login");
  };
  
  const menu = [
    {
      name: "Dashboard",
      path: "/tenant/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Room",
      path: "/tenant/room",
      icon: <Home size={20} />,
    },
    {
      name: "Rent History",
      path: "/tenant/rents",
      icon: <IndianRupee size={20} />,
    },
    {
      name: "Complaints",
      path: "/tenant/complaints",
      icon: <MessageSquare size={20} />,
    },
    {
      name: "Profile",
      path: "/tenant/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#10271D] border-r border-emerald-900 p-6">

      <h1 className="text-3xl font-bold text-white mb-10">
        Namma
        <span className="text-emerald-400"> PG</span>
      </h1>

      <div className="space-y-3">

        {menu.map((item) => (

          <NavLink key={item.name} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition
          ${isActive ? "bg-emerald-500 text-black" : "text-zinc-300 hover:bg-emerald-500/20"}`}>
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}

      </div>

      <button onClick={logout} className="absolute bottom-8 left-6 flex items-center gap-3 text-red-400">
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default TenantSidebar;