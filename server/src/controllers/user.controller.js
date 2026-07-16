import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        const existingUser = await User.findOne({email});
    if(existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ fullName: fullName, email, password: hashedPassword, role });
    return res.status(201).json({
        message: "User registered Successfully"
    })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({
            id: existingUser._id,
            role: existingUser.role
        }, process.env.JWT_SECRET,
        {
            expiresIn: "10d"
        }
    )

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
            id: existingUser._id,
            fullName: existingUser.fullName,
            email: existingUser.email,
            role: existingUser.role
    }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
