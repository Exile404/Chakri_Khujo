import User from "../models/user-model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted.");
};
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).send(user);
};

export const updateUser = async (req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 5);

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name:req.body.name,
      username:req.body.username,
      email:req.body.email,
      password: hash,
      country:req.body.country,
      phone: req.body.phone,
      desc: req.body.desc,
      // Update other fields as needed
    }, { new: true });

    res.status(200).send(updatedUser);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
};