import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OwnerDashboard from "./owner/OwnerDashboard";
import Properties from "./owner/Properties";
import PropertyDetails from "./owner/PropertyDetails";
import CreateProperty from "./owner/CreateProperty";
import EditProperty from "./owner/EditProperty";
import CreateRoom from "./owner/CreateRoom";
import Room from "./owner/Room";
import RoomDetails from "./owner/RoomDetails";
import Beds from "./owner/Beds";
import CreateBed from "./owner/CreateBed";
import Tenants from "./owner/Tenants";
import CreateTenant from "./owner/CreateTenant";
import TenantDetails from "./owner/TenantDetails";
import EditTenant from "./owner/EditTenant";
import EditRoom from "./owner/EditRoom";
import Rents from "./owner/Rents";
import CreateRent from "./owner/CreateRent";
import EditRent from "./owner/EditRent";
import RentDetails from "./owner/RentDetails";
import Complaints from "./owner/Complaints";
import CreateComplaint from "./owner/CreateComplaint";
import ComplaintDetails from "./owner/ComplaintDetails";
import EditComplaint from "./owner/EditComplaint";
import Reports from "./owner/Reports";
import TenantDashboard from "./tenant/TenantDashboard";
import MyRoom from "./tenant/MyRoom";
import RentHistory from "./tenant/RentHistory";
import MyComplaints from "./tenant/MyComplaints";
import Profile from "./tenant/Profile";
import TenantCreateComplaint from "./tenant/CreateComplaint";
import ViewComplaint from "./tenant/ViewComplaint";
import AdminDashboard from "./admin/AdminDashboard";


function App(){
    return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/owner/dashboard" element={<OwnerDashboard/>}/>
        <Route path="/owner/properties" element={<Properties/>}/>
        <Route path="/owner/properties/:id" element={<PropertyDetails/>}/>
        <Route path="/owner/properties/create" element={<CreateProperty/>}/>
        <Route path="/owner/properties/edit/:id" element={<EditProperty />}/>
        <Route path="/owner/properties/:id/rooms/create" element={<CreateRoom />}/>
        <Route path="/owner/rooms" element={<Room/>}/>
        <Route path="/owner/properties/:id/rooms" element={<Room />}/>
        <Route path="/owner/rooms/:id" element={<RoomDetails />}/>
        <Route path="/owner/beds" element={<Beds/>}/>
        <Route path="/owner/rooms/:roomId/beds/create" element={<CreateBed/>}/>
        <Route path="/owner/tenants" element={<Tenants />} />
        <Route path="/owner/tenants/create" element={<CreateTenant />} />
        <Route path="/owner/tenants/:id" element={<TenantDetails />} />
        <Route path="/owner/tenants/edit/:id" element={<EditTenant />} />
        <Route path="/owner/rooms/edit/:id" element={<EditRoom />} />
        <Route path="/owner/rents" element={<Rents/>}/>
        <Route path="/owner/rents/create" element={<CreateRent />}/>
        <Route path="/owner/rents/edit/:id" element={<EditRent />}/>
        <Route path="/owner/rents/:id" element={<RentDetails />}/>
        <Route path="/owner/complaints" element={<Complaints />} />
        <Route path="/owner/complaints/create" element={<CreateComplaint />}/>
        <Route path="/owner/complaints/:id" element={<ComplaintDetails />} />
        <Route path="/owner/complaints/edit/:id" element={<EditComplaint />}/>
        <Route path="/owner/reports" element={<Reports />}/>
        <Route path="/tenant/dashboard" element={<TenantDashboard />}/>
        <Route path="/tenant/room" element={<MyRoom />} />
        <Route path="/tenant/rents" element={<RentHistory />} />
        <Route path="/tenant/complaints" element={<MyComplaints />} />
        <Route path="/tenant/profile" element={<Profile />} />
        <Route path="/tenant/complaints/create" element={<TenantCreateComplaint />}/>
        <Route path="/tenant/complaints/:id" element={<ViewComplaint />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>

        </Routes>
        </BrowserRouter>
        )
    }
    export default App;