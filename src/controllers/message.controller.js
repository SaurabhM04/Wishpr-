// import User from "../models/user.model.js";
// import Message from "../models/message.model.js";

// import cloudinary from "../lib/cloudinary.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

// export const getUsersForSidebar = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;

//     // Step 1: Get unique user IDs that the logged-in user has messages with
//     const messages = await Message.find({
//       $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
//     }).select("senderId receiverId");

//     // Step 2: Extract unique user IDs excluding the logged-in user
//     const userIdsSet = new Set();
//     messages.forEach((msg) => {
//       if (msg.senderId.toString() !== loggedInUserId.toString()) {
//         userIdsSet.add(msg.senderId.toString());
//       }
//       if (msg.receiverId.toString() !== loggedInUserId.toString()) {
//         userIdsSet.add(msg.receiverId.toString());
//       }
//     });

//     const userIds = [...userIdsSet]; // Convert to array

//     // Step 3: Get user details for these IDs
//     const filteredUsers = await User.find({ _id: { $in: userIds } }).select(
//       "-password"
//     );
//     console.log("filteredusder = ", filteredUsers);

//     const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
//       "-password"
//     );
//     console.log("allusers= ", allUsers);

//     // Always return an object with both arrays
//     res.status(200).json({
//       filteredUsers: filteredUsers || [],
//       allUsers: allUsers || [],
//     });
//   } catch (error) {
//     console.error("Error in getUsersForSidebar: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const myId = req.user._id;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receiverId: userToChatId },
//         { senderId: userToChatId, receiverId: myId },
//       ],
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let imageUrl;
//     if (image) {
//       // Upload base64 image to cloudinary
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//     });

//     await newMessage.save();

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// import User from "../models/user.model.js";
// import Message from "../models/message.model.js";
// import Group from "../models/group.model.js";
// import cloudinary from "../lib/cloudinary.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

// export const getUsersForSidebar = async (req, res) => {
//   try {
//     const loggedInUserId = req.user._id;

//     // Get individual users with messages
//     const messages = await Message.find({
//       $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
//       isGroupMessage: false,
//     }).select("senderId receiverId");

//     const userIdsSet = new Set();
//     messages.forEach((msg) => {
//       if (msg.senderId.toString() !== loggedInUserId.toString()) {
//         userIdsSet.add(msg.senderId.toString());
//       }
//       if (msg.receiverId.toString() !== loggedInUserId.toString()) {
//         userIdsSet.add(msg.receiverId.toString());
//       }
//     });

//     const userIds = [...userIdsSet];
//     const filteredUsers = await User.find({ _id: { $in: userIds } }).select(
//       "-password"
//     );

//     const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
//       "-password"
//     );

//     // Get groups where user is a member
//     const groups = await Group.find({
//       members: loggedInUserId,
//     }).populate("members", "fullName profilePic");

//     res.status(200).json({
//       filteredUsers: filteredUsers || [],
//       allUsers: allUsers || [],
//       groups: groups || [],
//     });
//   } catch (error) {
//     console.error("Error in getUsersForSidebar: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getMessages = async (req, res) => {
//   try {
//     const { id: userToChatId } = req.params;
//     const myId = req.user._id;

//     const messages = await Message.find({
//       $or: [
//         { senderId: myId, receiverId: userToChatId },
//         { senderId: userToChatId, receiverId: myId },
//       ],
//       isGroupMessage: false,
//     });

//     res.status(200).json(messages);
//   } catch (error) {
//     console.log("Error in getMessages controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//       isGroupMessage: false,
//     });

//     await newMessage.save();

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Group from "../models/group.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get all messages for the logged-in user (excluding group messages)
    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: { $exists: true } },
        { receiverId: loggedInUserId },
      ],
      groupId: { $exists: false }, // Make sure we only get direct messages
    }).select("senderId receiverId");

    // Extract unique user IDs
    const userIdsSet = new Set();
    messages.forEach((msg) => {
      if (
        msg.senderId &&
        msg.senderId.toString() !== loggedInUserId.toString()
      ) {
        userIdsSet.add(msg.senderId.toString());
      }
      if (
        msg.receiverId &&
        msg.receiverId.toString() !== loggedInUserId.toString()
      ) {
        userIdsSet.add(msg.receiverId.toString());
      }
    });

    const userIds = Array.from(userIdsSet);

    // Get user details for these IDs
    const filteredUsers = await User.find({
      _id: { $in: userIds },
    }).select("-password");

    // Get all users except logged in user
    const allUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    // Get groups where user is a member
    const groups = await Group.find({
      members: loggedInUserId,
    }).populate("members", "fullName profilePic");

    console.log("Filtered users with messages:", filteredUsers.length);
    console.log("All users:", allUsers.length);
    console.log("Groups:", groups.length);

    res.status(200).json({
      filteredUsers: filteredUsers || [],
      allUsers: allUsers || [],
      groups: groups || [],
    });
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
      groupId: { $exists: false }, // Make sure we're only getting direct messages
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
