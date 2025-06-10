// import Group from "../models/group.model.js";
// import Message from "../models/message.model.js";
// import cloudinary from "../lib/cloudinary.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

// export const createGroup = async (req, res) => {
//   try {
//     const { name, description, members, groupPic } = req.body;
//     const adminId = req.user._id;

//     if (!name || !members || members.length < 2) {
//       return res.status(400).json({
//         error: "Group name and at least 2 other members are required",
//       });
//     }

//     // Add admin to members if not already included
//     const allMembers = [...new Set([adminId.toString(), ...members])];

//     // Limit to 4 members total
//     if (allMembers.length > 4) {
//       return res.status(400).json({
//         error: "Group cannot have more than 4 members",
//       });
//     }

//     let groupPicUrl = "";
//     if (groupPic) {
//       const uploadResponse = await cloudinary.uploader.upload(groupPic);
//       groupPicUrl = uploadResponse.secure_url;
//     }

//     const newGroup = new Group({
//       name,
//       description,
//       members: allMembers,
//       admin: adminId,
//       groupPic: groupPicUrl,
//     });

//     await newGroup.save();

//     // Populate members for response
//     await newGroup.populate("members", "fullName profilePic");

//     res.status(201).json(newGroup);
//   } catch (error) {
//     console.error("Error in createGroup controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getGroups = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const groups = await Group.find({
//       members: userId,
//     })
//       .populate("members", "fullName profilePic")
//       .populate("lastMessage")
//       .sort("-lastMessageTime");

//     res.status(200).json(groups);
//   } catch (error) {
//     console.error("Error in getGroups controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getGroupMessages = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const userId = req.user._id;

//     // Check if user is member of group
//     const group = await Group.findById(groupId);
//     if (!group || !group.members.includes(userId)) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     const messages = await Message.find({
//       groupId,
//     }).populate("senderId", "fullName profilePic");

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error in getGroupMessages controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendGroupMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { groupId } = req.params;
//     const senderId = req.user._id;

//     // Check if user is member of group
//     const group = await Group.findById(groupId);
//     if (!group || !group.members.includes(senderId.toString())) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       groupId,
//       text,
//       image: imageUrl,
//       isGroupMessage: true,
//     });

//     await newMessage.save();

//     // Update group's last message
//     group.lastMessage = newMessage._id;
//     group.lastMessageTime = new Date();
//     await group.save();

//     // Populate sender info
//     await newMessage.populate("senderId", "fullName profilePic");

//     // Send to all group members via socket
//     group.members.forEach((memberId) => {
//       if (memberId.toString() !== senderId.toString()) {
//         const memberSocketId = getReceiverSocketId(memberId.toString());
//         if (memberSocketId) {
//           io.to(memberSocketId).emit("newGroupMessage", {
//             message: newMessage,
//             groupId,
//           });
//         }
//       }
//     });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error in sendGroupMessage controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// import Group from "../models/group.model.js";
// import Message from "../models/message.model.js";
// import cloudinary from "../lib/cloudinary.js";
// import { getReceiverSocketId, io } from "../lib/socket.js";

// export const createGroup = async (req, res) => {
//   try {
//     const { name, description, members, groupPic } = req.body;
//     const adminId = req.user._id;

//     if (!name || !members || members.length < 1) {
//       return res.status(400).json({
//         error: "Group name and at least 1 member are required",
//       });
//     }

//     // Add admin to members if not already included
//     const allMembers = [...new Set([adminId.toString(), ...members])];

//     // Limit to 4 members total
//     if (allMembers.length > 4) {
//       return res.status(400).json({
//         error: "Group cannot have more than 4 members",
//       });
//     }

//     let groupPicUrl = "";
//     if (groupPic) {
//       const uploadResponse = await cloudinary.uploader.upload(groupPic);
//       groupPicUrl = uploadResponse.secure_url;
//     }

//     const newGroup = new Group({
//       name,
//       description,
//       members: allMembers,
//       admin: adminId,
//       groupPic: groupPicUrl,
//     });

//     await newGroup.save();

//     // Populate members for response
//     await newGroup.populate("members", "fullName profilePic");

//     res.status(201).json(newGroup);
//   } catch (error) {
//     console.error("Error in createGroup controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getGroups = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const groups = await Group.find({
//       members: userId,
//     })
//       .populate("members", "fullName profilePic")
//       .populate("lastMessage")
//       .sort("-lastMessageTime");

//     res.status(200).json(groups);
//   } catch (error) {
//     console.error("Error in getGroups controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getGroupMessages = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const userId = req.user._id;

//     // Check if user is member of group
//     const group = await Group.findById(groupId);
//     if (
//       !group ||
//       !group.members.map((m) => m.toString()).includes(userId.toString())
//     ) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     const messages = await Message.find({
//       groupId,
//     }).populate("senderId", "fullName profilePic");

//     res.status(200).json(messages);
//   } catch (error) {
//     console.error("Error in getGroupMessages controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendGroupMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { groupId } = req.params;
//     const senderId = req.user._id;

//     if (!text && !image) {
//       return res.status(400).json({ error: "Message content is required" });
//     }

//     // Check if user is member of group
//     const group = await Group.findById(groupId);
//     if (
//       !group ||
//       !group.members.map((m) => m.toString()).includes(senderId.toString())
//     ) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       groupId,
//       text,
//       image: imageUrl,
//     });

//     await newMessage.save();

//     // Update group's last message
//     group.lastMessage = newMessage._id;
//     group.lastMessageTime = new Date();
//     await group.save();

//     // Populate sender info
//     await newMessage.populate("senderId", "fullName profilePic");

//     // Send to all group members via socket
//     group.members.forEach((memberId) => {
//       if (memberId.toString() !== senderId.toString()) {
//         const memberSocketId = getReceiverSocketId(memberId.toString());
//         if (memberSocketId) {
//           io.to(memberSocketId).emit("newGroupMessage", {
//             message: newMessage,
//             groupId,
//           });
//         }
//       }
//     });

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error in sendGroupMessage controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

import Group from "../models/group.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
  try {
    const { name, participantIds } = req.body;
    const creatorId = req.user._id;

    // Validate participants
    if (
      !participantIds ||
      participantIds.length < 1 ||
      participantIds.length > 3
    ) {
      return res.status(400).json({
        error: "Group must have between 2-4 members (including you)",
      });
    }

    // Add creator to participants if not already included
    const allParticipants = [
      ...new Set([creatorId.toString(), ...participantIds]),
    ];

    if (allParticipants.length > 4) {
      return res.status(400).json({
        error: "Group cannot have more than 4 members",
      });
    }

    // Create group conversation
    const newGroup = new Group({
      participants: allParticipants,
      isGroup: true,
      groupName: name,
      groupAdmin: creatorId,
    });

    await newGroup.save();

    // Populate participants
    await newGroup.populate("participants", "username profilePic");

    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error in createGroup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const groups = await Group.find({
      participants: userId,
      isGroup: true,
    }).populate("participants", "username profilePic");

    res.status(200).json(groups);
  } catch (error) {
    console.error("Error in getGroups:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userIds } = req.body;
    const requesterId = req.user._id;

    // Find the group
    const group = await Group.findById(groupId);

    if (!group || !group.isGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if requester is in the group
    if (!group.participants.includes(requesterId)) {
      return res
        .status(403)
        .json({ error: "You are not a member of this group" });
    }

    // Check if requester is admin (optional - remove if any member can add)
    if (group.groupAdmin.toString() !== requesterId.toString()) {
      return res
        .status(403)
        .json({ error: "Only group admin can add members" });
    }

    // Filter out users already in the group
    const newMembers = userIds.filter(
      (userId) => !group.participants.some((p) => p.toString() === userId)
    );

    if (newMembers.length === 0) {
      return res
        .status(400)
        .json({ error: "All users are already in the group" });
    }

    // Check if adding new members exceeds limit
    if (group.participants.length + newMembers.length > 4) {
      return res.status(400).json({
        error: `Cannot add ${newMembers.length} members. Group limit is 4 members.`,
      });
    }

    // Add new members
    group.participants.push(...newMembers);
    await group.save();

    // Populate and return updated group
    await group.populate("participants", "username profilePic");

    // Emit socket event for real-time update
    const io = req.app.get("io");
    newMembers.forEach((memberId) => {
      io.to(memberId).emit("addedToGroup", group);
    });

    // Notify existing members about new additions
    group.participants.forEach((participantId) => {
      io.to(participantId.toString()).emit("groupUpdated", group);
    });

    res.status(200).json(group);
  } catch (error) {
    console.error("Error in addGroupMembers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeGroupMember = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const requesterId = req.user._id;

    // Find the group
    const group = await Group.findById(groupId);

    if (!group || !group.isGroup) {
      return res.status(404).json({ error: "Group not found" });
    }

    // Check if requester is in the group
    if (!group.participants.includes(requesterId)) {
      return res
        .status(403)
        .json({ error: "You are not a member of this group" });
    }

    // Check if user can remove (admin can remove anyone, members can only leave)
    const isAdmin = group.groupAdmin.toString() === requesterId.toString();
    const isSelfRemoval = userId === requesterId.toString();

    if (!isAdmin && !isSelfRemoval) {
      return res
        .status(403)
        .json({ error: "You can only remove yourself from the group" });
    }

    // Prevent removing admin unless they're leaving themselves
    if (userId === group.groupAdmin.toString() && !isSelfRemoval) {
      return res.status(400).json({ error: "Cannot remove group admin" });
    }

    // Check if group will have at least 2 members after removal
    if (group.participants.length <= 2) {
      return res
        .status(400)
        .json({ error: "Group must have at least 2 members" });
    }

    // Remove the member
    group.participants = group.participants.filter(
      (p) => p.toString() !== userId
    );

    // If admin is leaving, assign new admin to first remaining member
    if (userId === group.groupAdmin.toString()) {
      group.groupAdmin = group.participants[0];
    }

    await group.save();

    // Populate and return updated group
    await group.populate("participants", "username profilePic");

    // Emit socket events
    const io = req.app.get("io");
    io.to(userId).emit("removedFromGroup", { groupId: group._id });

    // Notify remaining members
    group.participants.forEach((participantId) => {
      io.to(participantId.toString()).emit("groupUpdated", group);
    });

    res.status(200).json(group);
  } catch (error) {
    console.error("Error in removeGroupMember:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupInfo = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await Group.findOne({
      _id: groupId,
      participants: userId,
      isGroup: true,
    }).populate("participants", "username profilePic");

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error in getGroupInfo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getGroupMessages = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     // Find group and check membership
//     const group = await Group.findById(groupId);
//     if (!group) return res.status(404).json({ error: "Group not found" });

//     // Optionally check if user is a participant
//     if (!group.participants.includes(req.user._id)) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     // Find messages for this group
//     const messages = await Message.find({ group: groupId }).populate(
//       "senderId",
//       "fullName profilePic"
//     );
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to load group messages" });
//   }
// };

// export const sendGroupMessage = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const { text, image } = req.body;
//     const userId = req.user._id;

//     const group = await Group.findById(groupId);
//     if (!group) return res.status(404).json({ error: "Group not found" });

//     // Optionally check if user is a participant
//     if (!group.participants.includes(userId)) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     const newMessage = new Message({
//       group: groupId,
//       senderId: userId,
//       text,
//       image,
//     });
//     await newMessage.save();

//     // Optionally push message to group.messages array
//     group.messages.push(newMessage._id);
//     await group.save();

//     res.status(201).json(newMessage);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to send group message" });
//   }
// };

// export const sendGroupMessage = async (req, res) => {
//   try {
//     const { groupId } = req.params;
//     const { text, image } = req.body;
//     const userId = req.user._id;

//     const group = await Group.findById(groupId);
//     if (!group) return res.status(404).json({ error: "Group not found" });

//     // Check if user is a participant (not members)
//     if (
//       !group.participants.map((id) => id.toString()).includes(userId.toString())
//     ) {
//       return res.status(403).json({ error: "Access denied" });
//     }

//     // Optionally handle image upload here if needed

//     const newMessage = new Message({
//       group: groupId, // Make sure your Message model has a 'group' field
//       senderId: userId,
//       text,
//       image,
//       isGroupMessage: true,
//     });
//     await newMessage.save();

//     // Add message to group's messages array
//     group.messages.push(newMessage._id);
//     await group.save();

//     // Optionally populate sender info
//     await newMessage.populate("senderId", "fullName profilePic");

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error in sendGroupMessage controller:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    const group = await Group.findById(groupId);
    if (
      !group ||
      !group.participants.map((id) => id.toString()).includes(userId.toString())
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    const messages = await Message.find({ groupId }).populate(
      "senderId",
      "fullName profilePic"
    );
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getGroupMessages controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { text, image } = req.body;
    const userId = req.user._id;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ error: "Group not found" });

    // Check if user is a participant
    if (
      !group.participants.map((id) => id.toString()).includes(userId.toString())
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    const newMessage = new Message({
      groupId, // <-- use groupId here
      senderId: userId,
      text,
      image,
      // isGroupMessage: true, // add if you want to distinguish group messages
    });
    await newMessage.save();

    // Optionally add to group's messages array
    group.messages.push(newMessage._id);
    await group.save();

    await newMessage.populate("senderId", "fullName profilePic");

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendGroupMessage controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
