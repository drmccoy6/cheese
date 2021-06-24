module.exports = (sequelize, Sequelize) => {
    const Cheese = sequelize.define("cheese", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      productImageURL: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(8,2)
      },
      likes: {
        type: Sequelize.INTEGER
      }
    });
  
    return Cheese;
  };