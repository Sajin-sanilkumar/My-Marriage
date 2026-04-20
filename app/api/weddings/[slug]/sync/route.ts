import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

type Params = { params: { slug: string } };

export async function POST(_req: NextRequest, { params }: Params) {
  try {
    const wedding = await prisma.wedding.findUnique({
      where: { slug: params.slug },
      include: {
        events: { orderBy: { sort_order: "asc" } },
        categories: { orderBy: { created_at: "asc" } },
        guests: { orderBy: { created_at: "asc" } },
      },
    });

    if (!wedding) {
      return NextResponse.json({ error: "Wedding not found" }, { status: 404 });
    }

    // ── Build the JSON structure for the frontend ───────────────────────
    
    const configJson = (wedding.config_json ?? {}) as Record<string, unknown>;
    const siteConfig = (wedding.site_config ?? {}) as Record<string, unknown>;
    const og = (configJson.og ?? {}) as Record<string, unknown>;

    const output = {
      id:               wedding.id,
      slug:             wedding.slug,
      bride_name:       wedding.bride_name,
      groom_name:       wedding.groom_name,
      bride_family:     wedding.bride_family,
      groom_family:     wedding.groom_family,
      wedding_date:     wedding.wedding_date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      greeting_default: wedding.greeting_default,
      
      // New fields from DB
      bride_about:      wedding.bride_about,
      groom_about:      wedding.groom_about,
      bride_hometown:   wedding.bride_hometown,
      groom_hometown:   wedding.groom_hometown,
      bride_profession: wedding.bride_profession,
      groom_profession: wedding.groom_profession,
      bride_hobbies:    wedding.bride_hobbies,
      groom_hobbies:    wedding.groom_hobbies,
      our_story:        wedding.our_story,

      site: {
        tab_title:        siteConfig.tab_title        ?? `${wedding.bride_name} & ${wedding.groom_name} — Wedding Invitation`,
        tab_description:  siteConfig.tab_description  ?? `You're invited to celebrate the wedding of ${wedding.bride_name} & ${wedding.groom_name}.`,
        loading_monogram: siteConfig.loading_monogram ?? `${wedding.bride_name[0]} & ${wedding.groom_name[0]}`,
        loading_tagline:  siteConfig.loading_tagline  ?? "Loading your invitation...",
      },
      
      og: {
        image:                 og.image                 ?? "/og-image.jpg",
        title_personal:        og.title_personal        ?? "You're invited, {name}! 💌",
        description_personal:  og.description_personal  ?? "Dear {name}, you are warmly invited to the wedding.",
        title_category:        og.title_category        ?? "You're invited! 💌",
        description_category:  og.description_category  ?? "You are warmly invited to celebrate with us.",
        title_universal:       og.title_universal       ?? `${wedding.bride_name} & ${wedding.groom_name} are getting married! 💌`,
        description_universal: og.description_universal ?? "Join us to celebrate the wedding.",
      },
      
      config_json: {
        hashtag:      configJson.hashtag      ?? `#${wedding.bride_name.replace(/\s+/g, '')}Weds${wedding.groom_name.replace(/\s+/g, '')}`,
        countdown_to: configJson.countdown_to ?? wedding.wedding_date.toISOString().slice(0, 16),
        primaryColor: configJson.primaryColor ?? "#C9A84C",
        showRsvpForm: configJson.showRsvpForm ?? true,
        coverPhoto:   configJson.coverPhoto   ?? null,
      },
      
      events: wedding.events.map((e) => ({
        id:            e.id,
        name:          e.name,
        date:          e.date.toISOString().split('T')[0],
        start_time:    e.start_time,
        end_time:      e.end_time ?? "",
        venue_name:    e.venue_name,
        venue_address: e.venue_address,
        venue_lat:     e.venue_lat,
        venue_lng:     e.venue_lng,
        maps_url:      e.venue_map_url ?? undefined, // Field name mapping for frontend!
      })),
      
      categories: wedding.categories.map((c) => ({
        id:       c.id,
        slug:     c.slug,
        name:     c.name,
        greeting: c.custom_greeting ?? undefined,
      })),
      
      guests: wedding.guests.map((g) => ({
        id:          g.id,
        slug:        g.slug,
        name:        g.name,
        category_id: g.category_id ?? undefined,
      })),
    };

    // ── Write to the frontend directory ────────────────────────────────
    
    const inviteProjectPath = path.join(process.cwd(), "..", "wedvite-invite");
    const jsonFilePath = path.join(inviteProjectPath, "data", "wedding.json");

    if (!fs.existsSync(inviteProjectPath)) {
       // Path might be different if in production or different env
       // Fail gracefully for now
       return NextResponse.json({ error: "Invite project directory not found at " + inviteProjectPath }, { status: 500 });
    }

    fs.writeFileSync(jsonFilePath, JSON.stringify(output, null, 2), "utf8");

    return NextResponse.json({ 
      success: true, 
      message: `Successfully synced data to ${wedding.slug}'s invitation site.`,
      path: jsonFilePath
    });

  } catch (error: any) {
    console.error(`[POST /api/weddings/${params.slug}/sync]`, error);
    return NextResponse.json({ error: "Internal server error: " + error.message }, { status: 500 });
  }
}
