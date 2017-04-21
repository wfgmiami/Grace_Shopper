
'use strict'

const Sequelize = require('sequelize');
const conn = require('../conn');

const Glasses = conn.define('glasses', {

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },

  description: {
    type: conn.Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: conn.Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: conn.Sequelize.INTEGER,
    allowNull: false
  },
  photo_url: {
    type: conn.Sequelize.ARRAY(Sequelize.STRING)
  }
});

module.exports = Glasses;


// Products

// Must have title, description, price, and inventory quantity
// Must belong to at least one category
// If there is no photo, there must be a placeholder photo used



    // // {"images":["http://s7d9.scene7.com/is/image/Lenscrafters/888392192707_shad_fr?$pngalpha$&wid=300&defaultimage=888392192707_shad_qt",
    // "http://s7d9.scene7.com/is/image/Lenscrafters/888392192707_shad_qt?$pngalpha$&wid=300&defaultimage=888392192707_shad_fr"],
    // "price":"$210.00",

    // "attr":
    //   [{"name":"color","value":"Blue"},
    //   {"name":"shape","value":"Oval"},{"name":"ideal_face_shape","value":"Oval"},
    //   {"name":"ideal_face_shape","value":"Square"},{"name":"material","value":"Titanium"},
    //   {"name":"rating","value":"5.0"},{"name":"rating_count","value":"2"},
    //   {"name":"price","value":"210.0"},{"name":"732572_partnumber","value":"888392192707"},
    //   {"name":"732572_price","value":"$210.00"},{"name":"id","value":"888392192707"},
    //   {"name":"brand","value":"Oakley"}],

    //   "name":"OAKLEY\nOX5118 WINGFOLD EVR"}, -> title
