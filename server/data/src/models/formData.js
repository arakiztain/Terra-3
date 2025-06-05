import { DataTypes } from 'sequelize';
import sequelize from '../../../src/config/sqlite.js';

const FormData = sequelize.define('FormData', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'form_data',
  timestamps: false
});

export default FormData;
