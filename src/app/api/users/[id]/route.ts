import { NextResponse } from 'next/server';
import { fetchUserById, updateUser, deleteUser } from '@/services/users';
import { UpdateUserSchema } from '@/utils/validators';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const user = await fetchUserById(params.id);
  if (!user) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const parsed = UpdateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 422 });
  }
  const user = await updateUser(params.id, parsed.data);
  return NextResponse.json(user);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await deleteUser(params.id);
  return NextResponse.json({ success: true });
}
