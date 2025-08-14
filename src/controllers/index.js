// import User from '../models/User';
// import Product from '../models/Product';

// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createUser = async (req, res) => {
//   const user = new User(req.body);
//   try {
//     const savedUser = await user.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// export const updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };