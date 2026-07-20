import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({children}){
    return(
    <div className = "min-h-screen bg-[#071A12] text-white">
        <Sidebar/>
        <div className = "ml-64 transition-all duration-300">
            <Navbar/>
            
            <main className = "p-8">
                {children}
                </main>
                
                </div>
                </div>
                )
            }
            
            export default DashboardLayout;