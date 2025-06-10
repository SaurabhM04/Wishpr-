// import mongoose from "mongoose";

// const groupSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     members: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//       },
//     ],
//     admin: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     groupPic: {
//       type: String,
//       default: "",
//     },
//     lastMessage: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Message",
//     },
//     lastMessageTime: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const Group = mongoose.model("Group", groupSchema);

// export default Group;


// models/group.model.js
import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    isGroup: {
      type: Boolean,
      default: true,
    },
    groupName: {
      type: String,
      required: true,
    },
    groupDescription: {
      type: String,
      default: "",
    },
    groupPic: {
      type: String,
      default: "",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

export default Group;