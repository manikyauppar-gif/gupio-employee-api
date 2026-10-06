import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/employees - Create an employee
export const createEmployee = async (req, res, next) => {
  try {
    const existing = await prisma.employee.findUnique({
      where: { email: req.body.email },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const employee = await prisma.employee.create({ data: req.body });
    return res.status(201).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// GET /api/employees - List, search & filter
export const getEmployees = async (req, res, next) => {
  try {
    const { search, department } = req.query;
    const where = {};

    if (department) {
      where.department = { equals: String(department) };
    }

    if (search) {
      where.OR = [
        { name: { contains: String(search) } },
        { email: { contains: String(search) } },
      ];
    }

    const employees = await prisma.employee.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/employees/:id - Retrieve by ID
export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({ where: { id } });

    if (!employee) {
      return res.status(404).json({ success: false, message: `Employee with ID ${id} not found` });
    }

    return res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

// PUT /api/employees/:id - Update employee
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: `Employee with ID ${id} not found` });
    }

    if (req.body.email && req.body.email !== existing.email) {
      const emailTaken = await prisma.employee.findUnique({ where: { email: req.body.email } });
      if (emailTaken) {
        return res.status(409).json({ success: false, message: 'Email already exists' });
      }
    }

    const updated = await prisma.employee.update({
      where: { id },
      data: req.body,
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/employees/:id - Delete employee
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: `Employee with ID ${id} not found` });
    }

    await prisma.employee.delete({ where: { id } });
    return res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};