import mongoose from "mongoose";

const SubscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    plan: {
      type: String,
      required: true,
      format: "enum",
      enum: ["free", "basic", "premium"],
      default: "free",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
