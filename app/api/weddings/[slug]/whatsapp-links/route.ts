import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateWhatsAppShareURL,
  generateWhatsAppDirectURL,
  generateCategoryShareMessage,
  generatePersonalShareMessage,
} from "@/lib/whatsapp";

type Params = { params: { slug: string } };

// POST /api/weddings/[slug]/whatsapp-links
export async function POST(_req: NextRequest, { params }: Params) {
  try {
    const wedding = await prisma.wedding.findUnique({
      where: { slug: params.slug },
    });
    if (!wedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    const baseURL = (
      process.env.NEXT_PUBLIC_BASE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` :
       process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    ).replace(/\/$/, "");

    // ── Fetch categories and VIP guests in parallel ───────────────────────
    const [categories, vipGuests] = await Promise.all([
      prisma.category.findMany({
        where: { wedding_id: wedding.id },
        orderBy: { created_at: "asc" },
      }),
      prisma.guest.findMany({
        where: {
          wedding_id: wedding.id,
          is_vip: true,
          phone: { not: null },
        },
        include: {
          category: { select: { name: true } },
        },
        orderBy: { name: "asc" },
      }),
    ]);

    // ── Category share links ──────────────────────────────────────────────
    const categoryLinks = categories.map((cat) => {
      const catInviteURL = `${baseURL}/${cat.slug}`;
      const message = generateCategoryShareMessage(wedding, cat, catInviteURL);
      return {
        id:                   cat.id,
        name:                 cat.name,
        slug:                 cat.slug,
        invite_url:           catInviteURL,
        share_url:            generateWhatsAppShareURL(message),
        direct_copy_message:  message,
      };
    });

    // ── VIP guest direct-send links ───────────────────────────────────────
    const vipLinks = vipGuests
      .filter((g) => g.phone)
      .map((g) => {
        const guestInviteURL = `${baseURL}/${g.slug}`;
        const message = generatePersonalShareMessage(wedding, g, guestInviteURL);
        return {
          id:               g.id,
          name:             g.name,
          phone:            g.phone!,
          category:         g.category?.name ?? null,
          invite_url:       guestInviteURL,
          direct_send_url:  generateWhatsAppDirectURL(g.phone!, message),
          message_preview:  message,
        };
      });

    return NextResponse.json(
      { categories: categoryLinks, vip_guests: vipLinks },
      { headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch (error) {
    console.error(`[POST /api/weddings/${params.slug}/whatsapp-links]`, error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
