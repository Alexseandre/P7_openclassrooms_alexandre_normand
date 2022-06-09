module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Like', {
      userLiked: {
        type: DataTypes.STRING,
        get() {
          return this.getDataValue('userLiked').split(',')
        },
        set(userLiked) {
          this.setDataValue('userLiked', userLiked.join())
        },
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      
      like : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      },
      {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}
