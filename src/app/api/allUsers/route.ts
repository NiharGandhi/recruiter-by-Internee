import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingUsers = await db.user.findMany();

        if (!existingUsers) {
            return new NextResponse("User Not Found", { status: 404 });
        }

        return NextResponse.json(existingUsers);
    } catch (error) {
        console.error("[USER RETRIEVAL]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
