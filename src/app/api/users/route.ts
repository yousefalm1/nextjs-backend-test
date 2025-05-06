import { NextResponse } from 'next/server';
import { fetchUsers, createUser } from '@/services/users';
import { CreateUserSchema } from '@/utils/validators';

export async function GET() {
  const users = await fetchUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 422 });
  }
  const user = await createUser(parsed.data);
  return NextResponse.json(user, { status: 201 });
}
