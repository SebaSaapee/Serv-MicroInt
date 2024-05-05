import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
    {
    nombre: {type:String, required:true},
    descripcion:{type:String, required:true},
    precio:{type:String, required:true},
  
    },
    { timestamps: true}
    )
    ProductSchema.index({nombre:1},{unique:true})
    