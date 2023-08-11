import db from "@/lib/db";
import User from "@/models/User";

export default async function POST(req) {
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
    //create a new profile instance
    const user = await User.findOneAndUpdate(
      { userId: body.authorId },
      { username: body.authorId.username },
      { bio, avatar },
      { new: true });
    //save the profile info
    await user.save();

    // Populate the authorId field
    await user.populate("authorId").execPopulate();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error }),
      { status: 500 }
    );
  }
}
