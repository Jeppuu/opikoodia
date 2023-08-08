import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Post from "@/models/Post";

export async function PATCH(req, ctx) {
  await db.connect()

  const id = ctx.params.id
  const accessToken = req.headers.get('authorization')
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)


  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: 'unauthorized (wrong or expired token)' }), { status: 403 })
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { resolved: true }, { new: true })

    await updatedPost.save()

    return new Response(JSON.stringify(updatedPost), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error', error }), { status: 500 });
  }
}
