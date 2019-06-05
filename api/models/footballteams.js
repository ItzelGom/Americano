'use strict';
module.exports = (sequelize, DataTypes) => {
  const footballteams = sequelize.define('footballteams', {
    Name: DataTypes.STRING,
    City: DataTypes.STRING,
    Conference: DataTypes.STRING,
    Division: DataTypes.STRING
  }, {});
  footballteams.associate = function(models) {
    // associations can be defined here
  };
  return footballteams;
};