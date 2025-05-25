import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // Keep as nodejs for Prisma compatibility
export const fetchCache = 'force-no-store'

// POST /api/fixtures - Add a new fixture
export async function POST(request) {
  try {
    const {
      sport,
      gender,
      team1,
      team2,
      team1Logo,
      team2Logo,
      team1Score = 0,
      team2Score = 0,
      date,
      time,
      venue,
      status = 'not_started',
    } = await request.json();

    // Validate required fields
    if (!sport || !gender || !team1 || !team2 || !date || !time || !venue) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the fixture
    const fixture = await prisma.fixture.create({
      data: {
        sport,
        gender,
        team1,
        team2,
        team1Logo: team1Logo || null,
        team2Logo: team2Logo || null,
        team1Score: Number(team1Score),
        team2Score: Number(team2Score),
        date: new Date(date),
        time,
        venue,
        status,
      },
    });

    return NextResponse.json(fixture, { status: 201 });
  } catch (error) {
    console.error('Error adding fixture:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/fixtures - Get all fixtures
export async function GET() {
  try {
    const fixtures = await prisma.fixture.findMany({
      orderBy: [
        { date: 'asc' },
        { time: 'asc' }
      ]
    });
    return NextResponse.json(fixtures);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch fixtures.' },
      { status: 500 }
    );
  }
}
