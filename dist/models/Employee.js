import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    title: String,
    notes: String
}, { versionKey: false });
export const Employee = mongoose.model('employee', employeeSchema);
//# sourceMappingURL=Employee.js.map