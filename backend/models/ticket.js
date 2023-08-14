import mongoose from "mongoose"
const ticketSchema=new mongoose.Schema({
    codigo :{type:String,require:true, unique: true},
    fecha_venta :{type:String, default:Date.now,require: true},
    fecha_salida :{type:String, require: true},
    numero_puesto:{type:Number,require:true},
    hora_salida:{type:String,require:true},
    precio:{type:Number,require:true},
    estado:{type:Number,default:1,require:true},
    createdAt :{ type : Date, default : Date.now},
    cliente:{type:mongoose.Schema.Types.ObjectId,ref:'Cliente',require:true},
    vehiculo:{type:mongoose.Schema.Types.ObjectId,ref:'Vehiculo',require:true},
    ruta:{type:mongoose.Schema.Types.ObjectId,ref:'Ruta',require:true},
    empresa:{type:mongoose.Schema.Types.ObjectId,ref:'Empresa',require:true}
})
export default mongoose.model("Tickete",ticketSchema)