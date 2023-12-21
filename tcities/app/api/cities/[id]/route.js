import connectDB from "@/libs/mongodb";
import City from "@/models/citySchema";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newIdx: idx, newNume: nume, newLat: lat, newLong: long, newFoto: foto, newNota: nota, newComm: comm } = await request.json();
    await connectDB();
    await City.findByIdAndUpdate(id, { idx, nume, lat, long, foto, nota, comm });
    return NextResponse.json({message: "Favorit City Updated"}, { status: 200});
}

export async function GET(request, { params }) {
    const { id } = params;
    await connectDB();
    const cities = await City.findOne({_id: id});
    return NextResponse.json({ cities }, { status: 200});
}
