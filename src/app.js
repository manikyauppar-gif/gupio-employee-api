import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from './controllers/employeeController.js';
import {
  employeeCreateSchema,
  employeeUpdateSchema,
  validateBody,
} from './middleware/validator.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// RESTful Employee Endpoints
app.post('/api/employees', validateBody(employeeCreateSchema), createEmployee);
app.get('/api/employees', getEmployees);
app.get('/api/employees/:id', getEmployeeById);
app.put('/api/employees/:id', validateBody(employeeUpdateSchema), updateEmployee);
app.delete('/api/employees/:id', deleteEmployee);

// 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});