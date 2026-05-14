import mongoose from "mongoose";

const pushNotificationsSchema = new.mongoose.Schema({
    recipient : mongoose.SchemaTypes.ObjectId,
    sender : mongoose.SchemaTypes.ObjectId,
    type : String,
    title: String,
    message: String,
    read: Boolean,
    createdAt: Date
});

const PushNotification = mongoose.model("PushNotification", pushNotificationsSchema);

export default PushNotification;
