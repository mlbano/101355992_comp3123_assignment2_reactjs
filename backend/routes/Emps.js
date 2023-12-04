const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

//Get all employees
router.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
});

//New employee
router.post("/employees", async (req, res) => {
    try {
        const { first_name, last_name, email, gender, salary } = req.body;

        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            gender,
            salary,
        });

        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: "Employee created", employee: savedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
});

//Get employee by ID
router.get("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee does not exist" });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
});

//Update employee by ID
router.put("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid;
    try {
        const { first_name, last_name, email, gender, salary } = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            { first_name, last_name, email, gender, salary },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee does not exist" });
        }

        res.status(200).json({ message: "Employee updated", employee: updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
});

//Delete employee by ID
router.delete("/employees/:eid", async (req, res) => {
    const employeeId = req.params.eid;
    try {
        const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            res.status(404).json({ message: "Employee does not exist" });
        }
        res.status(204).json({ message: "Deleted employee" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }
});

module.exports = router;