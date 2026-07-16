import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import roomRoutes from "./routes/room.routes.js";
import bedRoutes from "./routes/bed.routes.js";
import tenantRoutes from "./routes/tenant.routes.js";
import rentRoutes from "./routes/rent.routes.js";
import complaintRoutes from "./routes/complaint.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import errorHandler from "./middleware/error.middleware.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);
    next();
});

app.post("/test", (req, res) => {
    console.log("BODY:", req.body);
    return res.json({
        body: req.body,
    });
});

app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/beds", bedRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Namma PG API 🚀",
    });
});

app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

export default app;
