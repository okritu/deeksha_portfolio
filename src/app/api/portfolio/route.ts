import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/portfolioData.json");
    const data = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    return NextResponse.json({ error: "Failed to read portfolio data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // A basic check to ensure profile exists
    if (!body || !body.profile || !body.profile.name) {
      return NextResponse.json({ error: "Invalid portfolio data structure" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "src/data/portfolioData.json");
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, message: "Portfolio data successfully saved to database file" });
  } catch (error) {
    console.error("Error writing portfolio data:", error);
    return NextResponse.json({ error: "Failed to update portfolio data" }, { status: 500 });
  }
}
