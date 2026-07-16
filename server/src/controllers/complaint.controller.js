import Complaint from "../models/complaint.model.js";
import Tenant from "../models/tenant.model.js";

export const createComplaint = async (req,res)=>{
    try {
        const { tenant, category, description, status } = req.body;
        const existingTenant = await Tenant.findById(tenant);

        if(!existingTenant){
            return res.status(404).json({
                message:"Tenant not found"
            });
        }
        const complaint = await Complaint.create({ tenant, category, description, status });
        return res.status(201).json({
            message:"Complaint created successfully",
            complaint
        });
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getComplaints = async(req,res)=>{
    try {
        const complaints = await Complaint.find()
        .populate("tenant");

        return res.status(200).json({
            message:"Complaints fetched successfully",
            complaints
        });
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const getComplaintById = async(req,res)=>{
    try {
        const {id}=req.params;
        const complaint = await Complaint.findById(id)
        .populate("tenant");

        if(!complaint){
            return res.status(404).json({
                message:"Complaint not found"
            });
        }

        return res.status(200).json({
            message:"Complaint fetched successfully",
            complaint
        });
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const updateComplaint = async(req,res)=>{
    try {
        const {id}=req.params;
        const complaint = await Complaint.findById(id);

        if(!complaint){
            return res.status(404).json({
                message:"Complaint not found"
            });
        }

        const updatedComplaint =
        await Complaint.findByIdAndUpdate(id, req.body,
            {
                new:true
            }
        );

        return res.status(200).json({
            message:"Complaint updated successfully",
            complaint:updatedComplaint
        });
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};

export const deleteComplaint = async(req,res)=>{
    try {
        const {id}=req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({
                message:"Complaint not found"
            });
        }
        await Complaint.findByIdAndDelete(id);
        
        return res.status(200).json({
            message:"Complaint deleted successfully"
        });


    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
};