import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Post from "@/models/Post";

export async function PUT(req, ctx) {
  await db.connect()

  const id = ctx.params.id
  const accessToken = req.headers.get('authorization')
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)


  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: 'unauthorized (wrong or expired token)' }), { status: 403 })
  }

  try {
    const post = await Post.findById(id)

    if (post.reactions.includes(decodedToken._id)) {
      //if a user has already reacted to this post
      post.reactions = post.reactions.filter((id) => id.toString() !== decodedToken._id.toString())
    } else {
      post.reactions.push(decodedToken._id)
    }

    await post.save()

    return new Response(JSON.stringify({ message: 'Successfully reacted to the post' }), { status: 200 })

  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 })
  }
}
