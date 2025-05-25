import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // Keep as nodejs for Prisma compatibility
export const fetchCache = 'force-no-store'

export async function PUT(request) {
  try {
    const { id, team1Score, team2Score, status } = await request.json();

    if (!id || team1Score == null || team2Score == null || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedFixture = await prisma.fixture.update({
      where: { id: Number(id) },
      data: {
        team1Score: Number(team1Score),
        team2Score: Number(team2Score),
        status,
      },
    });

    return NextResponse.json(updatedFixture, { status: 200 });
  } catch (error) {
    console.error('Error updating fixture:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
