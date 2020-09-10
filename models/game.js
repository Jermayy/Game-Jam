/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define(
    "Game", {
      rank: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      platform: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      year: {
        type: DataTypes.INTEGER
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      publisher: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      NA_Sales: {
        type: DataTypes.DECIMAL(4, 2)
      },
      EU_Sales: {
        type: DataTypes.DECIMAL(4, 2)
      },
      JP_Sales: {
        type: DataTypes.DECIMAL(4, 2)
      },
      Other_Sales: {
        type: DataTypes.DECIMAL(4, 2)
      },
      Global_Sales: {
        type: DataTypes.DECIMAL(4, 2)
      }
    }, {
      timestamps: false
    }
  );

  return Game;
};