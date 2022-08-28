import User from "../models/userModel.js";
import Subscription from "../models/subscriptionModel.js";

import { isMongoObjectId } from "../helper/isMongoObject.js";

const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();

    if (!subscriptions)
      return res.status(404).json({ message: "Subscriptions not found" });

    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSubscription = async (req, res) => {
  try {
    if (!isMongoObjectId(req.params.id)) throw new Error("Invalid id");
    const subscription = await Subscription.findOne({ _id: req.params.id });
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSubscription = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Please login" });
  const { plan } = req.body;
  const user = await User.findById(req.user.id);
  console.log(user);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.subscriptions.length > 0) {
    return res.status(400).json({ message: "User already has a subscription" });
  }
  try {
    const payload = {
      plan,
      user: req.user.id,
    };

    const subscription = await Subscription.create(payload);
    user.subscriptions.push(subscription._id);
    await user.save();
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Please login" });
    if (!isMongoObjectId(req.params.id)) throw new Error("Invalid id");
    const subscription = await Subscription.findOne({ _id: req.params.id });
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { plan } = req.body;
    const payload = {
      plan,
    };

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      payload,
      {
        new: true,
      }
    );

    res.json(updatedSubscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Please login" });
    if (!isMongoObjectId(req.params.id)) throw new Error("Invalid id");
    const subscription = await Subscription.findOne({ _id: req.params.id });
    if (!subscription)
      return res.status(404).json({ message: "Subscription not found" });
    if (subscription.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Subscription.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getSubscriptions,
  getSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
