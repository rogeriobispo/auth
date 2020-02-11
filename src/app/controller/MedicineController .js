import Medicine from '../models/Medicine';

class MedicineController {
    async index(_, res) {
        const medicines = await Medicine.findAll({ where: { deleted: 0 } });
        res.json(medicines);
    }

    async store(req, res) {
        const { name, factory } = req.body;
        const medicine = await Medicine.findOne({
            where: { name, factory },
        });

        if (medicine)
            return res.status(422).json({ error: 'Medicamento ja cadastrado' });

        const newMedicine = await Medicine.create({
            name,
            factory,
        });
        return res.json(newMedicine);
    }

    async delete(req, res) {
        const { id } = req.params;
        const medicine = await Medicine.findByPk(id);
        if (!medicine)
            return res
                .status(422)
                .json({ error: 'Medicamento não localizada' });

        await Medicine.softDelete({ where: { id } });
        return res.status(204).json();
    }
}

export default new MedicineController();
