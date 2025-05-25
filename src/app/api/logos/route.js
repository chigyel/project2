// src/app/api/logos/route.js
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // Keep as nodejs for Prisma compatibility
export const fetchCache = 'force-no-store'

// GET /api/logos - Get all logos
export async function GET() {
  try {
    const logos = await prisma.logo.findMany();
    return NextResponse.json(logos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logos.' }, { status: 500 });
  }
}

// POST /api/logos - Add a new logo
export async function POST(request) {
  try {
    const { team, url } = await request.json();

    if (!team || !url) {
      return NextResponse.json({ error: 'Team and URL are required.' }, { status: 400 });
    }

    const exists = await prisma.logo.findUnique({ where: { team } });
    if (exists) {
      return NextResponse.json({ error: 'Team already exists.' }, { status: 409 });
    }

    const newLogo = await prisma.logo.create({
      data: { team, url }
    });

    return NextResponse.json(newLogo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating logo.' }, { status: 500 });
  }
}

// DELETE /api/logos - Delete a logo
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await prisma.logo.delete({
      where: { id: Number(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting logo.' }, { status: 500 });
  }
}
