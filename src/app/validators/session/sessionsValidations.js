import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body)))
        return res
            .status(401)
            .json({ error: 'Middleware Wrong User/Password' });

    next();
};
