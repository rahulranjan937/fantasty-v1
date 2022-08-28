import User from "../models/userModel.js";
import Subscription from "../models/subscriptionModel.js";

import { isMongoObjectId } from "../helper/isMongoObject.js";

const getSubscriptions = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Please login" });
  try {
    const subscriptions = await Subscription.findOne({ user: req.user.id });

    res.json(subscriptions);
    if (!subscriptions.plan)
      return res.status(404).json({ message: "Subscriptions not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSubscription = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Please login" });
  try {
    const user = await User.findOne(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userSubrciption = await Subscription.findOne({ user: req.user.id });
    if (userSubrciption)
      return res.status(400).json({ message: "User already subscribed" });

    const { plan } = req.body;
    const payload = {
      plan,
      user: req.user.id,
    };

    const subscription = await Subscription.create(payload);

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

export { getSubscriptions, createSubscription, updateSubscription };
