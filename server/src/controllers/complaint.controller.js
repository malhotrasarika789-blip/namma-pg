import Complaint from "../models/complaint.model.js";
import Tenant from "../models/tenant.model.js";

export const createComplaint = async (req, res) => {
    try {
        console.log("BACKEND BODY:", req.body);
        const { title, description, priority, status, room } = req.body;
        const tenant = await Tenant.findOne({user: req.user.id});

        if (!tenant) {
            return res.status(404).json({
                message: "Tenant not found"
            });
        }
        console.log("FINAL DATA BEFORE CREATE:", {
            tenant: tenant._id,
            room,
            title,
            description,
            priority,
            status
        });

        const complaint = await Complaint.create({
            tenant: tenant._id,
            room,
            title,
            description,
            priority: priority || "Medium",
            status: status || "Open"
        });

        return res.status(201).json({
            message: "Complaint created successfully",
            complaint
        });

    } catch (error) {

        console.log("COMPLAINT BACKEND ERROR:", error);

        return res.status(500).json({
            message: error.message
        });

    }
};

export const getComplaints = async(req,res) => {
    try {
        const complaints = await Complaint.find().populate("tenant");
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

export const getComplaintById = async(req,res) => {
    try {
        const {id} = req.params;
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

export const updateComplaint = async(req,res) => {
    try {
        const {id} = req.params;
        const complaint = await Complaint.findById(id);
        if(!complaint){
            return res.status(404).json({
                message:"Complaint not found"
            });
        }
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            req.body,
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




export const deleteComplaint = async(req,res) => {
    try {
        const {id} = req.params;
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