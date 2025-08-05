import { NextResponse } from 'next/server';
import articlesData from '../../help/articles.json';

export async function GET() {
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return NextResponse.json(articlesData);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to load articles' },
            { status: 500 }
        );
    }
} 