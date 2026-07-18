import Tenant from "../models/tenant.model.js";
import Bed from "../models/bed.model.js";
import User from "../models/user.model.js";
import Rent from "../models/rent.model.js";
import Complaint from "../models/complaint.model.js";

export const createTenant = async (req, res) => {
    try {
        const {user,fullName,phone,email,gender,bed,monthlyRent,securityDeposit,emergencyContact} = req.body;
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        if(existingUser.role !== "tenant" && existingUser.role !== "user") {
        return res.status(400).json({
        message:"Selected user is not a tenant"
    });
}
        const alreadyAssigned = await Tenant.findOne({user});
        if(alreadyAssigned) {
            return res.status(400).json({
                message: "Tenant profile already exists"
            });
        }

        const bedData = await Bed.findById(bed);
        if (!bedData) {
            return res.status(404).json({
                message:"Bed not found"
            });
        }
        
        if(bedData.status === "occupied") {
            return res.status(400).json({
                message:"Bed is already occupied"
            });
        }

        const tenant = await Tenant.create({
            user,
            fullName,
            phone,
            email,
            gender,
            bed,
            monthlyRent,
            securityDeposit,
            emergencyContact
        });
        
        bedData.status = "occupied";
        bedData.tenant = tenant._id;
        await bedData.save();
        return res.status(201).json({
            message:"Tenant created successfully",
            tenant
        });
    
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getTenants = async(req,res) => {
    try{
        const tenants = await Tenant.find()
        .populate("user","fullName email role")
        .populate({path:"bed",populate:{path:"room"}
        });
        return res.status(200).json({
            message:"Tenants fetched successfully",
            tenants
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
            });
        }
    };

export const getTenantById = async(req,res) => {
    try{
        const {id} = req.params;
        const tenant = await Tenant.findById(id)
        .populate("user","fullName email role")
        .populate({path:"bed",populate:{path:"room"}
        });
        if(!tenant){
            return res.status(404).json({
                message:"Tenant not found"
            });
        }
        return res.status(200).json({
            message:"Tenant fetched successfully",
            tenant
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const updateTenant = async(req,res) => {
    try{
        const {id} = req.params;
        const tenant = await Tenant.findByIdAndUpdate(id,req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!tenant){
            return res.status(404).json({
                message:"Tenant not found"
            });
        }
        return res.status(200).json({
            message:"Tenant updated successfully",
            tenant
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const deleteTenant = async(req,res) => {
    try{
        const {id} = req.params;
        const tenant = await Tenant.findById(id);
        if(!tenant){
            return res.status(404).json({
                message:"Tenant not found"
            });
        }
        const bed = await Bed.findById(tenant.bed);
        if(bed){ 
            bed.status="available";
            bed.tenant=null;
            await bed.save();
        }
        await Tenant.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tenant deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getMyProfile = async(req,res) => {
    try{
        const tenant = await Tenant.findOne({user:req.user.id})
        .populate("user","fullName email role")
        .populate({
            path:"bed",
            populate:{
                path:"room",
                populate:{
                    path:"property"
                }
            }
        });
        if(!tenant){
            return res.status(404).json({
                message:"Tenant profile not found"
            });
        }

        return res.status(200).json({
            message:"Tenant profile fetched successfully",
            tenant
        });
    
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getTenantDashboard = async(req,res) => {
    try{

        console.log("LOGIN USER ID:", req.user.id);
        console.log("LOGIN ROLE:", req.user.role);
        const tenant = await Tenant.findOne({user:req.user.id})
        .populate({
            path:"bed",
            populate:{
                path:"room",
                populate:{
                    path:"property"
                }
            }
        });

        console.log("TENANT FOUND:", tenant);

        if(!tenant){
            return res.status(404).json({
                message:"Tenant not found"
            });
        }
        return res.status(200).json({
            message:"Dashboard fetched successfully",
            tenant
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getMyRoom = async(req,res) => {
    try{
        const tenant = await Tenant.findOne({
            user:req.user.id
        })
        .populate({
            path:"bed",
            populate:{
                path:"room",
                populate:{
                    path:"property"
                }
            }
        });

        if(!tenant){
            return res.status(404).json({
                message:"Room not assigned"
            });
        }
        return res.status(200).json({
            room: tenant.bed,
            monthlyRent: tenant.monthlyRent
});
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getMyRents = async(req,res) => {
    try{
        const tenant = await Tenant.findOne({user:req.user.id});
        const rents = await Rent.find({tenant:tenant._id}).sort({createdAt:-1});
        return res.status(200).json({
            message:"Rent history fetched successfully",
            rents
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getMyComplaints = async(req,res) => {
    try{
        const tenant = await Tenant.findOne({
            user:req.user.id
        });
        const complaints = await Complaint.find({
            tenant:tenant._id
        })
        .sort({createdAt:-1});
        return res.status(200).json({
            message:"Complaints fetched successfully",
            complaints
        });
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const createComplaint = async (req, res) => {
    try {
        const tenant = await Tenant.findOne({
            user: req.user.id
        });
        if (!tenant) {
            return res.status(404).json({
                message: "Tenant not found"
            });
        }
        const { category, description, status } = req.body;
        const complaint = await Complaint.create({
            tenant: tenant._id,
            category,
            description,
            status: status || "Open"
        });
        return res.status(201).json({
            message: "Complaint created successfully",
            complaint
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const getMyComplaintById = async (req, res) => {
    try {
        const tenant = await Tenant.findOne({
            user: req.user.id
        });

        if (!tenant) {
            return res.status(404).json({
                message: "Tenant not found"
            });
        }

        const complaint = await Complaint.findOne({
            _id: req.params.id,
            tenant: tenant._id
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        return res.status(200).json({
            message: "Complaint fetched successfully",
            complaint
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};