import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";

export async function GET(req, res) {
  await db.connect();

  const { category } = req.query;
  console.log(category);
  try {
    const posts = await db.collection("posts").find({ category }).toArray()

    return new Response(JSON.stringify(posts), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).end()
  }
}

