import * as model from "./model.js";
import express from "express";
import cors from "cors";
import * as config from "./config.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_CONNECT);
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send(model.getApiInstructions());
});
app.get("/employees", async (req, res) => {
    try {
        const employees = (await model.getEmployees());
        res.json(employees);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
app.post("/employee", async (req, res) => {
    try {
        const employee = req.body;
        const result = await model.addEmployee(employee);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send(e.message);
    }
});
app.delete("/employee/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await model.deleteEmployee(id);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
app.put("/employee/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const employee = req.body;
        const result = await model.editEmployee(id, employee);
        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send(e);
    }
});
app.listen(config.port, () => {
    console.log(`listening on port http://localhost:${config.port}`);
});
//# sourceMappingURL=server.js.map