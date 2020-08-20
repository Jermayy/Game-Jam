module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define("Game", {
        name_of_game: {
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
        score: {
            type: DataTypes.FLOAT,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    return Game;
};