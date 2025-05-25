// src/app/api/teams/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs' // Keep as nodejs for Prisma compatibility
export const fetchCache = 'force-no-store'

const prisma = new PrismaClient();

export async function GET() {
  try {
    const logos = await prisma.logo.findMany({
      select: { team: true }, // Assuming your Prisma model has 'team' as the name
    });

    // Rename for frontend consistency
    const teams = logos.map(logo => ({ teamName: logo.team }));

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
