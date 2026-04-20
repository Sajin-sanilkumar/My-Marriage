import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { slug: string; id: string } };

// PATCH /api/weddings/[slug]/events/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const wedding = await prisma.wedding.findUnique({
      where: { slug: params.slug },
      select: { id: true },
    });
    if (!wedding) return NextResponse.json({ error: "Wedding not found" }, { status: 404 });

    const body = await req.json();
    const { id: _id, wedding_id: _wid, created_at: _ca, ...updateData } = body;

    if (updateData.date) updateData.date = new Date(updateData.date);
    if (updateData.venue_lat != null) updateData.venue_lat = Number(updateData.venue_lat);
    if (updateData.venue_lng != null) updateData.venue_lng = Number(updateData.venue_lng);
    if (updateData.sort_order != null) updateData.sort_order = Number(updateData.sort_order);

    const event = await prisma.event.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(event);
  } catch (error: any) {
    if (error?.code === "P2025") return NextResponse.json({ error: "Event not found" }, { status: 404 });
    console.error(`[PATCH /api/weddings/${params.slug}/events/${params.id}]`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/weddings/[slug]/events/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const wedding = await prisma.wedding.findUnique({
      where: { slug: params.slug },
      select: { id: true },
    });
    if (!wedding) return NextResponse.json({ error: "Wedding not found" }, { status: 404 });

    await prisma.event.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error: any) {
    if (error?.code === "P2025") return NextResponse.json({ error: "Event not found" }, { status: 404 });
    console.error(`[DELETE /api/weddings/${params.slug}/events/${params.id}]`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
