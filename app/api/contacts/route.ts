import { NextRequest, NextResponse } from "next/server";

import LoopsClient from "loops";

const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);


/**
 * Create or Update a contact
 */
export async function POST(request: NextRequest) {
  // Contact properties can be sent as JSON along with the email address

  const res = await request.json();

  const email = res["email"];

  const data = await loops.createContact(email);

  // Other options for adding properties and updating a contact
  // const properties = { plan: 'Pro' }
  // const data = await loops.createContact(email, properties)
  // const data = await loops.updateContact(email, properties)

  return NextResponse.json({ data });
}

/**
 * Search for a contact by email
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query: string | null = searchParams.get("q");

  if (!query) throw "No email given";

  const data = await loops.findContact(query);

  return NextResponse.json({ data });
}

/**
 * Delete a contact
 */
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email: string | null = searchParams.get("email");

  if (!email) throw "No email given";

  const data = await loops.deleteContact({ email });

  return NextResponse.json({ data });
}