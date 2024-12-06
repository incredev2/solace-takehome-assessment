import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql, ilike, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const offset = (page - 1) * limit;

  const searchCondition = search
    ? or(
        ilike(advocates.firstName, `%${search}%`),
        ilike(advocates.lastName, `%${search}%`),
        ilike(advocates.city, `%${search}%`),
        ilike(advocates.degree, `%${search}%`),
        sql`${advocates.specialties}::text ILIKE ${`%${search}%`}` // Search in JSON payload
      )
    : undefined;

  // Get total count with search
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(advocates)
    .where(searchCondition);

  const total = Number(totalResult[0].count);

  // Get paginated data with search
  const data = await db
    .select()
    .from(advocates)
    .where(searchCondition)
    .limit(limit)
    .offset(offset)
    .orderBy(advocates.id);

  return Response.json({
    data,
    metadata: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: offset + limit < total,
      hasPrevPage: page > 1,
    },
  });
}
