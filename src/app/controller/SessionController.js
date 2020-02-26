import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email },
        });
        if (!user)
            return res.status(401).json({ error: 'Wrong User/Password' });

        if (!(await user.checkPassword(password)))
            return res.status(401).json({ error: 'Wrong User/Password' });

        const { id, name } = user;
        const userResponse = { id, name, email };
        return res.json({
            user: userResponse,
            token: jwt.sign({ user: userResponse }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
