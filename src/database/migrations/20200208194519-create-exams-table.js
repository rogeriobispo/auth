module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('exams', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            patients_id: {
                type: Sequelize.INTEGER,
                references: { model: 'patients', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            results: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            image_result: {
                type: Sequelize.INTEGER,
                references: { model: 'files', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },
            with_doctor: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            with_patient: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('exams');
    },
};
