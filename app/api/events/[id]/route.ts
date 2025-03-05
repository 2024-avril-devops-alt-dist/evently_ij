import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 Récupérer un événement par ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: { photos: true },
    });
    if (!event) return NextResponse.json({ message: "Événement introuvable" }, { status: 404 });

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
  }
}

// 📌 Modifier un événement
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
  }
}

// 📌 Supprimer un événement
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.event.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Événement supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erreur serveur", error }, { status: 500 });
  }
}
