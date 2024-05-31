import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();

  const { email } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'PUT':
      try {
        const user = await User.findOneAndUpdate({ email }, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;
    case 'DELETE':
      try {
        await User.findOneAndDelete({ email });
        res.status(200).json({ message: 'User deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
