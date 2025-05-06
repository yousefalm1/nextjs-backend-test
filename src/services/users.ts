import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fetch all users
export function fetchUsers() {
  return prisma.user.findMany();
}

// Fetch one user by ID
export function fetchUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

// Create a user
export function createUser(data: { name: string; email: string }) {
  return prisma.user.create({ data });
}

// Update a user
export function updateUser(
  id: string,
  data: { name?: string; email?: string }
) {
  return prisma.user.update({ where: { id }, data });
}

// Delete a user
export function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
