import mongoose from "mongoose";

// chek if the given value is a mongo object id

export const isMongoObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};
