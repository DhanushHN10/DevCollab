import Project from "../models/Project.js";
import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import {
  sendProjectInvitationEmail,
  sendProjectRequestToJoinEmail,
} from "../services/emailService.js";
import { sendNotification } from "../services/notificationServices.js";
import { addUserToWorkSpace } from "./workspaceController.js";

export const createProject = async (req, res) => {

  // Creating Project, followed by workspace followed by Group Chat should be in a single transaction. One fails, complete roll back.

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { title, description, techStack, tags } = req.body;

    const newProject = new Project({
      title,
      description,
      techStack,
      tags,
      createdBy: req.user._id,
      collaborators: [req.user._id],
    });
    await newProject.save({session});

    const workspace = new Workspace({
      project: newProject._id,
      members: [
        {
          user: req.user._id,
          role: "Owner",
          joinedAt: new Date(),
        },
      ],

      createdAt: new Date(),
    });

    await workspace.save({session});

   
    await createGroupConversation(workspace._id, req.user._id, session);
   

    await session.commitTransaction();
    

    res.status(201).json({
      message: "Project and it's Workspace Created",
      project: newProject,
      workspace: workspace,
    });

    
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  } finally {
    session.endSession();
  }

};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getMyCollaboratedProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      collaborators: req.user._id,
      createdBy: { $ne: req.user._id },
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export const searchProjects = async (req, res) => {
  try {
    const { q, tags, techStack } = req.query;

    const query = {
      isAcceptingDevs: true,
      createdBy: { $ne: req.user._id },
    };

    const orCondtn = [];

    if (q && q.trim()) {
      orCondtn.push(
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      );
    }

    if (tags) {
      const tagArr = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
      if (tagArr.length > 0) {
        query.tags = { $in: tagArr };
      }
    }

    if (techStack) {
      const techArr = techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      if (techArr.length > 0) {
        query.techStack = { $in: techArr };
      }
    }

    if (orCondtn.length > 0) {
      query.$or = orCondtn;
    }

    const projects = await Project.find(query).limit(50);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const searchDevs = async (req, res) => {
  try {
    const { q, skills, interests, availability } = req.query;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const excludeuserIdToInvites = [
      ...project.collaborators,
      ...project.pendingInvites,
      ...project.joinRequests,
      // project.createdBy
    ];

    const query = {
      _id: { $nin: excludeuserIdToInvites },
    };

    if (q && q.trim() !== "") {
      const regex = new RegExp(q, "i");
      query.$or = [{ name: regex }, { username: regex }];
    }

    // if (skills) {
    //   const skillArray = skills.split(',').map(s => s.trim());
    //   query.skills = { $in: skillArray };
    // }

    // if (interests) {
    //   const interestArray = interests.split(',').map(i => i.trim());
    //   query.interests = { $in: interestArray };
    // }
    if (skills && skills.trim() !== "") {
      const skillArray = skills.split(",").map((s) => s.trim());
      query.skills = { $in: skillArray };
    }

    if (interests && interests.trim() !== "") {
      const interestArray = interests.split(",").map((i) => i.trim());
      query.interests = { $in: interestArray };
    }

    if (
      availability &&
      availability !== "Any" &&
      availability !== "undefined"
    ) {
      query.availability = availability;
    }

    const users = await User.find(query).select(
      "_id name username skills interests availability links",
    );
    // add avatar later
    res.json({ users });
  } catch (error) {
    console.error("Search users failed:", error);
    console.log(`Error: ${error}`);
    res.status(500).json({ error: "Server error" });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    const projectId = req.params.projectId;

    const project = await Project.findById(projectId).select("title");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const workspace = await Workspace.findOne({ project: projectId }).populate(
      "members.user",
      "name username email avatar",
    );

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    const isMember = workspace.members.some((m) =>
      m.user._id.equals(req.user._id),
    );
    if (!isMember) {
      return res
        .status(403)
        .json({ message: "You are not a member of this workspace" });
    }

    res.json({
      project: {
        id: project._id,
        title: project.title,
        description: project.description,
      },

      members: workspace.members.map((m) => ({
        id: m.user._id,
        name: m.user.name,
        username: m.user.username,
        email: m.user.email,
        avatar: m.user.avatar,
        role: m.role,
        joinedAt: m.joinedAt,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const inviteToProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userIdToInvite = req.params.userIdToInvite;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:
          "You aren't authorised to send invites. Only the owner can send invites.",
      });
    }

    if (project.collaborators.includes(userIdToInvite)) {
      return res.status(400).json({
        message: "User is already a collaborator",
      });
    }

    if (project.pendingInvites.includes(userIdToInvite)) {
      return res.status(400).json({
        message: "User has already been invited to this project",
      });
    }

    if (project.joinRequests.includes(userIdToInvite)) {
      return res.status(400).json({
        message: "User has already requested to join this project",
      });
    }

    project.pendingInvites.push(userIdToInvite);
    await project.save();

    await project.populate("createdBy", "username email");

    const invitedUser = await User.findById(userIdToInvite).select("email");

    if (!invitedUser) {
      return res.status(404).json({
        message: "User to invite not found",
      });
    }

    const io = req.app.get("io");
    await sendNotification(io, userIdToInvite, {
      sender: req.user._id,
      type: "project_invite",
      title: "New project invite",
      message: `${req.user.username} invited you to ${project.title}`,
    });

    await sendProjectInvitationEmail(
      invitedUser.email,
      project.title,
      project.createdBy.username,
    );
    res.status(200).json({
      message: "Invite sent successfully",
      projectId: project._id,
      userIdToInvite: userIdToInvite,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const requestToJoin = async (req, res) => {
  const { projectId } = req.params;

  try {
    const project = await Project.findById(projectId).populate(
      "createdBy",
      "email username name",
    );
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const userIdToInvite = req.user._id;

    if (
      project.joinRequests.includes(userIdToInvite) ||
      project.collaborators.includes(userIdToInvite) ||
      project.pendingInvites.includes(userIdToInvite)
    ) {
      return res.status(400).json({
        message:
          "You have already requested to join this project or are already a collaborator or have been invited",
      });
    }

    project.joinRequests.push(userIdToInvite);
    await project.save();

    const projectOwnerEmail = project.createdBy.email;
    const io = req.app.get("io");

    await sendNotification(io, project.createdBy._id, {
      sender: req.user._id,
      type: "join_request",
      title: "New join request",
      message: `${req.user.username} wants to join ${project.title}`,
    });

    await sendProjectRequestToJoinEmail(
      userIdToInvite,
      project.title,
      projectOwnerEmail,
    );

    res.status(200).json({
      message: "Request successfully sent",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Intternal server Error",
    });
  }
};

export const getCollabStatus = async (req, res) => {
  const { projectId } = req.params;
  const userIdToInvite = req.user._id;

  const project = await Project.findById(projectId)
    .populate("pendingInvites", "name username email avatar")
    .populate("joinRequests", "name username email avatar")
    .select(" pendingInvites joinRequests");

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (project.createdBy.toString() !== userIdToInvite.toString()) {
    return res
      .status(403)
      .json({ message: "Only the project owner can view this info" });
  }

  res.json({
    invitesSent: project.pendingInvites,
    joinRequestsReceived: project.joinRequests,
  });
};

export const unsendInvite = async (req, res) => {
  const { projectId, unsendInvitedUserId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  if (project.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Only the Project Owner can unsend invites",
    });
  }
  const wasInvited = project.pendingInvites.some(
    (id) => id.toString() === unsendInvitedUserId.toString(),
  );
  if (!wasInvited) {
    return res.status(400).json({
      message: "User was not in pending invites",
    });
  }

  project.pendingInvites = project.pendingInvites.filter(
    (id) => id.toString() !== unsendInvitedUserId.toString(),
  );

  await project.save();

  res.status(200).json({
    message: "Invite removed",
  });
};

export const cancelJoinRequest = async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) return res.status(404).json({ message: "Project not found" });
  const prevLength = project.joinRequests.length;

  project.joinRequests = project.joinRequests.filter(
    (id) => id.toString() !== req.user._id.toString(),
  );
  if (project.joinRequests.length === prevLength) {
    return res
      .status(400)
      .json({ message: "Join request not found or already cancelled" });
  }

  await project.save();

  res.status(200).json({ message: "Join request cancelled" });
};

export const acceptJoinRequest = async (req, res) => {
  const { projectId, acceptRequestedUserId } = req.params;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Only owner can accept requests" });

    if (!project.joinRequests.includes(acceptRequestedUserId))
      return res.status(400).json({ message: "No such request found" });

    project.joinRequests = project.joinRequests.filter(
      (id) => id.toString() !== acceptRequestedUserId,
    );

    project.collaborators.push(acceptRequestedUserId);
    await project.save();
    await addUserToWorkSpace(projectId, acceptRequestedUserId);
    await sendNotification(req.app.get("io"), acceptRequestedUserId, {
      sender: req.user._id,
      type: "join_request_accepted",
      title: "Join request accepted",
      message: `Your request to join ${project.title} was accepted`,
    });

    res.json({
      message: "User added as collaborator and updated the workspace",
    });
  } catch (error) {
    console.error("Failed To accept User: ", error);
    console.log(error);
  }
};

export const rejectJoinRequest = async (req, res) => {
  const { projectId, userIdToInvite } = req.params;
  const project = await Project.findById(projectId);

  if (!project) return res.status(404).json({ message: "Project not found" });
  if (project.createdBy.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Only owner can reject requests" });

  project.joinRequests = project.joinRequests.filter(
    (id) => id.toString() !== userIdToInvite,
  );

  await project.save();
  await sendNotification(req.app.get("io"), userIdToInvite, {
    sender: req.user._id,
    type: "join_request_rejected",
    title: "Join request rejected",
    message: `Your request to join ${project.title} was not accepted`,
  });
  res.json({ message: "Join request rejected" });
};

export const acceptProjectInvite = async (req, res) => {
  const { projectId } = req.params;
  const userIdToInvite = req.user._id;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });

  if (!project.pendingInvites.includes(userIdToInvite))
    return res.status(400).json({ message: "No invite found" });

  console.log("Invites array:", project.pendingInvites);

  project.pendingInvites = project.pendingInvites.filter(
    (id) => id.toString() !== userIdToInvite.toString(),
  );
  const alreadyCollaborator = project.collaborators.some(
    (member) =>
      member.user && member.user.toString() === userIdToInvite.toString(),
  );

  // just to avoid duplicate collaborators if it happens

  if (!alreadyCollaborator) {
    project.collaborators.push(userIdToInvite);
  }

  // project.collaborators.push(userIdToInvite);
  await project.save();

  await addUserToWorkSpace(projectId, userIdToInvite);
  await sendNotification(req.app.get("io"), project.createdBy, {
    sender: req.user._id,
    type: "project_invite_accepted",
    title: "Project invite accepted",
    message: `${req.user.username} accepted your invite for - ${project.title}`,
  });
  res.json({ message: "Invite accepted, added to project" });
};

export const rejectProjectInvite = async (req, res) => {
  const { projectId } = req.params;
  const userIdToInvite = req.user._id;

  const project = await Project.findById(projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });

  project.pendingInvites = project.pendingInvites.filter(
    (id) => id.toString() !== userIdToInvite.toString(),
  );

  await project.save();
  await sendNotification(req.app.get("io"), project.createdBy, {
    sender: req.user._id,
    type: "project_invite_rejected",
    title: "Project invite rejected",
    message: `${req.user.username} did not accept your invite for - ${project.title}`,
  });
  res.json({ message: "Invite rejected" });
};

export const getInvitesReceived = async (req, res) => {
  try {
    const projects = await Project.find({ pendingInvites: req.user._id })
      .populate("createdBy", "name username email")
      .select("_id title createdBy tags techStack");

    console.log(projects);

    const invites = projects.map((project) => ({
      ...project._doc,
      _id: project._id,
    }));

    res.json({ invites });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to fetch invites received",
        details: err.message,
      });
  }
};

export const getJoinRequestsSent = async (req, res) => {
  try {
    const projects = await Project.find({ joinRequests: req.user._id })
      .select("_id title description createdBy tags techStack")
      .populate("createdBy", "name username email");

    const requests = projects.map((project) => ({
      ...project._doc,
      projectId: project._id.toString(),
    }));

    res.json({ requests });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch your requests", details: err.message });
  }
};

export const getProjectDetails = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userIdToInvite = req.user._id;

    const project = await Project.findById(projectId)
      .populate("createdBy", "name username")
      .populate("collaborators", "name username avatar")
      .populate("pendingInvites", "name username avatar email")
      .populate("joinRequests", "name username avatar email")
      .lean();

    // have added .lean() to return just plain js objects instead of mongoose documents as we are not going to modify the requested details from this api..

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const isOwner =
      project.createdBy._id.toString() === req.user._id.toString();
    const isMember = project.collaborators.some(
      (collaborators) =>
        collaborators._id.toString() === userIdToInvite.toString(),
    );

    if (isMember) {
      if (isOwner) {
        res.json({
          project: {
            _id: project._id,
            title: project.title,
            description: project.description,
            tags: project.tags,
            techStack: project.techStack,
            createdBy: project.createdBy,
            collaborators: project.collaborators,
            pendingInvites: project.pendingInvites,
            joinRequests: project.joinRequests,
            createdAt: project.createdAt,
          },
          isOwner,
        });
      } else {
        res.json({
          project: {
            _id: project._id,
            title: project.title,
            description: project.description,
            tags: project.tags,
            techStack: project.techStack,
            createdBy: project.createdBy,
            collaborators: project.collaborators,
            // pendingInvites: project.pendingInvites,
            // joinRequests: project.joinRequests,
            createdAt: project.createdAt,
          },
          isOwner,
        });
      }
    } else {
      res.json({
        project: {
          // _id: project._id,
          title: project.title,
          description: project.description,
          tags: project.tags,
          techStack: project.techStack,
          createdBy: project.createdBy,
          // collaborators: project.collaborators,
          // pendingInvites: project.pendingInvites,
          // joinRequests: project.joinRequests,
          createdAt: project.createdAt,
        },
        isOwner,
      });
    }
  } catch (err) {
    console.error("Error fetching project details:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
