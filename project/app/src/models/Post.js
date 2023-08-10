import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 4
  },
  desc: {
    type: String,
    required: true,
    min: 6
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Plants',
      'Trees',
      'Flowers',
      'Animals',
      'Fish',
      'Insects',
      'Phenomenons',
      'Stargazing'
    ]
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reactions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
}, { timestamps: true })

export default mongoose?.models?.Post || mongoose.model('Post', PostSchema);
