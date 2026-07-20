import { Search, Bell } from "lucide-react";
import { motion } from "framer-motion";

function Navbar(){
    return(
    <motion.header initial = {{ y: -30, opacity: 0 }}
    animate = {{y: 0, opacity: 1}} transition = {{duration:0.5}}
    className = "h-20 bg-[#071A12] border-b border-emerald-900 flex items-center justify-between px-8 sticky top-0 z-40">
        <div>
            <h2 className = "text-2xl font-bold text-white">
                Dashboard
                </h2>
                
                <p className = "text-sm text-zinc-400">
                    Manage your PG operations
                    </p>
                    
                    </div>
                    
                    <div className = "flex items-center gap-5">
                        
                        <motion.div whileHover = {{scale:1.03}}
                        
                        className = "flex items-center bg-[#10271D] border border-emerald-900 rounded-xl px-4 shadow-lg">
                            
                            <Search size = {18} className = "text-emerald-400"/>
                            
                            <input placeholder="Search..." className="bg-transparent outline-none px-3 py-2 text-white placeholder:text-zinc-500 w-40"/>
                            </motion.div>
                            
                            <motion.button whileHover = {{scale: 1.15, rotate: 10}}
                            className = "h-10 w-10 rounded-xl bg-[#10271D] border border-emerald-900 flex items-center justify-center text-emerald-400 shadow-lg">
                                
                                <Bell size = {20}/>
                                </motion.button>
                                
                                <motion.div whileHover = {{y:-4, scale:1.03}}
                                
                                className = "flex items-center gap-3 bg-[#10271D] border border-emerald-900 px-4 py-2 rounded-xl shadow-lg">
                                    <div className = "h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold">
                                        O
                                        </div>
                            <div>
                                
                                <p className="text-emerald-400 font-semibold">Owner</p>
                                <p className="text-xs text-zinc-400">Property Manager</p>
                                </div>
                                </motion.div>
                                
                                </div>
                                </motion.header>
                                )
                        }
                        
                        export default Navbar;