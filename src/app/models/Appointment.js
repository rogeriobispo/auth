import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                finished: Sequelize.BOOLEAN,
                prescription: Sequelize.BOOLEAN,
                description: Sequelize.STRING,
                type: Sequelize.STRING,
                exam: Sequelize.BOOLEAN,
                date: Sequelize.DATE,

                canceled_at: Sequelize.DATE,

                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    },
                },

                cancelable: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(new Date(), subHours(this.date, 2));
                    },
                },
            },
            {
                sequelize,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Patient, {
            foreignKey: 'patient_id',
            as: 'patient',
        });
        this.belongsTo(models.User, {
            foreignKey: 'doctor_id',
            as: 'doctor',
        });

        this.hasMany(models.Exam, {
            as: 'exams',
        });
        this.belongsToMany(models.Medicine, {
            through: 'prescriptions',
            foreignKey: 'medicine_id',
            as: 'medicines',
        });
    }
}

export default Appointment;
