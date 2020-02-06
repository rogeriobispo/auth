import * as Yup from 'yup';

export default async (req, res, next) => {
    const schema = Yup.object().shape({
        doctor_id: Yup.number().required(),
        date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body)))
        return res.status(422).json({ error: 'Data ou doutor não informado' });

    next();
};
