import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function Landing(){
    const navigate = useNavigate();
    const features = [
        {
            icon:"🏠",
            title:"Property Management",
            desc:"Manage multiple PG properties from one powerful dashboard."
        },
        {
            icon:"🛏️",
            title:"Room & Bed Tracking",
            desc:"Track rooms, beds and occupancy status easily."
        },
        {
            icon:"👥",
            title:"Tenant Management",
            desc:"Onboard tenants and manage tenant details securely."
        },
        {
            icon:"💰",
            title:"Rent Management",
            desc:"Track rent collection, payments and pending dues."
        },
        {
            icon:"🔧",
            title:"Complaint Management",
            desc:"Handle maintenance issues like WiFi, water and electricity."
        },
        {
            icon:"📊",
            title:"Analytics Dashboard",
            desc:"Get complete insights about your PG operations."
        }
    ];
    
    return(
    <div className="min-h-screen bg-[#071A12] text-white overflow-hidden">
        <motion.nav initial={{opacity:0, y:-40}} animate={{opacity:1, y:0}} transition={{duration:0.7}}
        className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
                
                <motion.div whileHover={{rotate:360, scale:1.1}}
                transition={{duration:0.6}}
                className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    
                    <span className="text-black font-bold text-2xl">N</span>
                    </motion.div>
                    <h1 className="text-3xl font-bold">Namma
                        <span className="text-emerald-400">PG</span>
                        </h1>
                        </div>
                        <div className="hidden md:flex gap-8 text-zinc-400">
                            <a href="#features" className="hover:text-emerald-400 transition">Features</a>
                            <a href="#about" className="hover:text-emerald-400 transition">About</a>
                            <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
                            </div>
                            <div className="flex gap-3">
                                <Button onClick={()=>navigate("/login")} className="bg-transparent border border-white text-white font-semibold hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition">
                                    Login
                                    </Button>
                                    <Button onClick={()=>navigate("/register")} className="bg-emerald-500 text-black font-semibold hover:bg-emerald-400 hover:scale-105 transition">
                                        Get Started
                                        </Button>
                                        </div>
                                        </motion.nav>
                            <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-14 items-center">
                        <motion.div initial={{opacity:0, x:-60}} animate={{opacity:1, x:0}}
                        transition={{duration:0.8}} className="space-y-7">
                            <h2 className="text-5xl md:text-6xl font-bold leading-tight">Manage Your PG
                                <br/>
                                <span className="text-emerald-400">Smarter & Easier</span>
                                </h2>

<p className="text-lg text-zinc-400 max-w-xl">

Namma PG helps owners manage properties,
rooms, beds, tenants, rent and complaints 
from one single platform.
</p>
        <div className="flex gap-4">
            <Button onClick={() => navigate("/register")} className="bg-emerald-500 text-blackpx-8 :bg-emerald-400 hover:scale-105 transition">
                Start Managing
                </Button>
                
                <Button onClick={()=>navigate("/login")} variant="outline" className="border-zinc-700 hover:border-emerald-400 hover:text-emerald-400">
                    Login
                    </Button>
                    </div>
                    
                </motion.div>
            
            <motion.div animate={{y:[0,-15,0]}} transition={{duration:3, repeat:Infinity}}
            whileHover={{scale:1.05}} className="bg-[#10271D] border border-emerald-900 rounded-3xl p-8 shadow-2xl shadow-emerald-900/40">
                <div className="grid grid-cols-2 gap-5">
                    {
                    [
                        ["Total Rooms","25"],
                        ["Occupied Beds","68"],
                        ["Collected Rent","₹85K"],
                        ["Complaints","5"]
                    ].map((item,index)=>(
                    <motion.div key={index} whileHover={{scale:1.08, y:-5}} className="bg-[#163524] rounded-xlp-5 border border-emerald-900">
                        <p className="text-zinc-400">{item[0]}</p>
                        <h3 className="text-3xl font-bold text-emerald-400">{item[1]}</h3>
                        </motion.div>
                        ))
                    }
                </div>
            </motion.div>
            
        </section>
        <section id="features" className="max-w-7xl mx-auto px-8 py-20">
            <h2 className="text-4xl font-bold text-center mb-12">Everything You Need</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {features.map((item,index) => (
                    <motion.div key={index} whileHover={{y:-12, scale:1.03}}
                    transition={{type:"spring", stiffness:300}} className="bg-[#10271D] border border-emerald-900 rounded-2xl p-6">
                        <div className="text-4xl">{item.icon}</div>
                        
                    <h3 className="text-xl font-bold text-emerald-400 mt-4">{item.title}</h3>
                    <p className="text-zinc-400 mt-3">{item.desc}</p>
                    </motion.div>
                ))
            }
        </div>
        
    </section>
    <section id="about" className="text-center px-8 py-16">
        <h2 className="text-4xl font-bold">Built For Modern PG Owners</h2>
        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Digitize your PG operations and manage tenants,
            rent and complaints effortlessly.
            </p>
        </section>
        
    <motion.section id="contact" whileHover={{scale:1.02}} className="mx-8 mb-10 bg-[#10271D] border border-emerald-900 rounded-3xl p-10 text-center">
        <h2 className="text-3xl font-bold">Ready To Manage Your PG?</h2>
        
        <Button onClick={() => navigate("/register")} className="mt-6 bg-emerald-500 text-black hover:bg-emerald-400">
            Create Account
            </Button>
        </motion.section>
        
    <footer className="text-center py-8 text-zinc-500">
        © 2026 Namma PG. All rights reserved.
        </footer>
        </div>
        )
    }
    
export default Landing;