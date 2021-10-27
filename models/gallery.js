const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const User = require("./user");
const Photo=require("./photo")
const Gallery = sequelize.define("Gallery", {});
Gallery.belongsTo(User);
Gallery.belongsToMany(Photo,{through:'PhotoGallery'})
Photo.belongsToMany(Gallery,{through:'PhotoGallery'})
module.exports=Gallery
