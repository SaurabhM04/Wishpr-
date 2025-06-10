// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import {
//   createGroup,
//   getGroups,
//   getGroupMessages,
//   sendGroupMessage,
// } from "../controllers/group.controller.js";

// const router = express.Router();

// router.post("/create", protectRoute, createGroup);
// router.get("/", protectRoute, getGroups);
// router.get("/:groupId/messages", protectRoute, getGroupMessages);
// router.post("/:groupId/send", protectRoute, sendGroupMessage);

// export default router;

// import express from "express";
// import { protectRoute } from "../middleware/auth.middleware.js";
// import {
//   createGroup,
//   getGroups,
//   getGroupMessages,
//   sendGroupMessage,
// } from "../controllers/group.controller.js";

// const router = express.Router();

// router.post("/create", protectRoute, createGroup);
// router.get("/", protectRoute, getGroups);
// router.get("/:groupId/messages", protectRoute, getGroupMessages);
// router.post("/:groupId/send", protectRoute, sendGroupMessage);

// export default router;

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createGroup,
  getGroups,
  getGroupInfo,
  addGroupMembers,
  removeGroupMember,
  getGroupMessages, // <-- add this
  sendGroupMessage, // <-- add this
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/", protectRoute, getGroups);
router.get("/:groupId", protectRoute, getGroupInfo);
router.post("/:groupId/members", protectRoute, addGroupMembers);
router.delete("/:groupId/members/:userId", protectRoute, removeGroupMember);

// ADD THESE TWO ROUTES:
router.get("/:groupId/messages", protectRoute, getGroupMessages);
router.post("/:groupId/send", protectRoute, sendGroupMessage);

export default router;
