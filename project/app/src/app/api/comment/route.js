import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Comment from "@/models/Comment";

export async function POST(req) {
  await db.connect();
  const accessToken = req.headers.get("Authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);
  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    //create a new Comment instance
    const newComment = new Comment({
      postId: body.postId,
      authorId: body.authorId,
      text: body.text,
    });
    //save the comment
    await newComment.save();

    // Populate the authorId field
    await newComment.populate("authorId").execPopulate();
    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}

