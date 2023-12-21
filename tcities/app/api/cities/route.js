import connectDB from "@/libs/mongodb";
import City from "@/models/citySchema" ;
import { NextResponse } from "next/server";

export async function POST(request) {
    const { idx, nume, lat, long, foto, nota, comm } = await request.json();
    await connectDB();
    await City.create({ idx, nume, lat, long, foto, nota, comm}) ;
    return NextResponse.json({message: "Favorit City Created"}, {status: 201});
}

export async function GET() {
    await connectDB();
    const cities = await City.find() ;
    return NextResponse.json({cities});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await City.findByIdAndDelete(id);
    return NextResponse.json({message: "Favorit City Deleted"}, {status: 200});
} 

