const { admin } = require("./firebase");

module.exports = async (req, res) => {
  switch (req.method) {
    case "GET":
      return procesarGET(req, res);
    case "POST":
      return procesarPOST(req, res);
    case "PUT":
      return procesarPUT(req, res);
    case "DELETE":
      return procesarDELETE(req, res);
    default:
      res.code(500).send({ error: "Metodo HTPP no soportado" });
  }
};

function getColeccion() {
  //INSTANCIA UNA COLECCION
  return admin.firestore().collection('categorias');
}

async function procesarGET(req, res) {
  try{
   const querySnapshot = await getColeccion().get();
   const documentos = querySnapshot.docs.map(d=>{
    return d.data();
   })
   return documentos;
  }catch(error){
    res.code(500).send({error: error.message});
  }
}
async function procesarPOST(req, res) {

  try { 
     const { nombre, descripcion } = req.body;
  const categoria = {
    nombre,
    descripcion,
  };
    const documento = await getColeccion().doc(); // crea un documento vacio pero autogenara un id
    const id = documento.id;
    documento.set(categoria);
    // para tener el id adentro del mismo documento
    categoria.id = id;
    return categoria;
  } catch (error) {
    res.code(500).send({error:error.message})
  }
}
async function procesarPUT(req, res) {
  try {
    const {nombre, descripcion, id} = req.body;
    const categoria = {
        nombre,
        descripcion
    }
    const documento = await getColeccion().doc( id ); // crea documento vacío         
    documento.update( categoria );        
    return categoria; 
} catch (error) {
    res.code(500).send({error: error.message});
}
}

async function procesarDELETE(req, res)
 {
  try{
 const id = req.query.id;
 const docRef= await getColeccion().doc(id);
 await docRef.delete();
 return{borrado:true};
  }catch(error){
 return {borrado:false,mensaje:error.message};
  }
 
}
