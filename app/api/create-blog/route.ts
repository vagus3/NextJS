import { NextResponse } from "next/server";

export async function POST(){
    console.log("Blog created successfully!");

    return NextResponse.json({ success: "Blog created successfully!" });
}
