import { getTransporter } from "../utils/mailer.js";


export const sendProjectInvitationEmail = async(toEmail, projectName, projectOwner) =>{
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: toEmail,
        subject: `Invitation to join project: ${projectName}`,
        text: `You have been invited to join the project "${projectName}" by "${projectOwner}". View more details on DevCollab.\n\n\nDevCollab Automated Mail.Please do not reply to this email.`
    };
try {

    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);
    console.log("Project joining request email sent successfully");
    return { message:"Project invitation email sent successfully", success: true };
  } catch (error) {
    console.error("Failed to send project invitation email", {
      toEmail,
      projectName,
      error: error.message,
    });

    return {
      success: false,
      error: error.message,
    };
  }
};


export const sendProjectRequestToJoinEmail = async(requestingUserId,  projectName, projectOwnerEmail) =>{
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: projectOwnerEmail,
        subject: `Request to join project: ${projectName}`,
        text:` "${requestingUserId}" has requested to join your project "${projectName}". Please review the request on DevCollab.\n\n\nDevCollab Automated Mail.Please do not reply to this email.`

    };

    try {
        const transporter = getTransporter();
        await transporter.sendMail(mailOptions);
        console.log("Project joining request email sent successfully");
        return {message: "Project joining request email sent successfully", success : true}
    } catch (error) {

        console.error("Failed to send project joining request email", {
            error:error.message
        });

        return {
            success: false,
            error: error.message
        };
        
    }
}

