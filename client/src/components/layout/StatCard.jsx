import { motion } from "framer-motion";

function StatCard({title,value,icon: Icon,color}){
    
    return(
    <motion.div whileHover={{y:-10, scale:1.04}} transition={{type:"spring", stiffness:250}}
    className="rounded-3xl bg-[#10271D] p-6 border border-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_45px_rgba(16,185,129,0.35)] transition-all duration-300">
        <div className="flex items-center justify-between">
            
            <div>
                <p className="text-zinc-400 text-sm">{title}</p>
                <h2 className="mt-3 text-4xl font-bold text-white">{value}</h2>
                </div>
                
                <div className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                style={{backgroundColor:color}}>
                    
                    <Icon size={32} className="text-black"/>
                    </div>
                    </div>
                    
                </motion.div>
                )
            }
            
    export default StatCard;