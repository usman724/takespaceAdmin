import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade') || 'All grades';
    const subject = searchParams.get('subject') || 'All subjects';
    const dateRange = searchParams.get('dateRange') || 'Last 30 days';

    const filePath = path.join(process.cwd(), 'app', 'teacher-analytics', 'data.json');
    const raw = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(raw);

    return NextResponse.json({
      ...json,
      filters: { grade, subject, dateRange },
    });
  } catch (error) {
    console.error('Teacher analytics API error:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}


