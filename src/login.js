const { app } = require("./firebase");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

module.exports = async (req, res) => {
    const {email, contrasena} = req.body;

    try {
        const usuario = await signInWithEmailAndPassword(getAuth(), email, contrasena);
        // en el caso exitoso 
        return {usuario};
    } catch (error) { 
        switch( error.code ) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return res.code(401).send({
                    codigo: error.code,
                    mensaje: error.message
                });
            default:
                res.code(500).send({
                    codigo: error.code,
                    mensaje: error.message
                });
        }
    }
};

/* //opcion2
const { app } = require('./firebase.js');
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

module.exports = async (req, res) => {
    if(req.method != 'POST') {
        return res.code(501).send('Método no implementado');
    } 

  const userData = {
            email: req.body.email, 
            contrasena: req.body.password};
    try {
       const usuario = await signInWithEmailAndPassword(getAuth(), email, contrasena);
        return {usuario};
        
        
    } catch (error) {
        switch( error.code ) {
            case 'auth/invalid-email':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return res.code(401).send({
                    codigo: error.code,
                    mensaje: error.message
                });
            default:
                res.code(500).send({
                    codigo: error.code,
                    mensaje: error.message
                });
        }
    }
}; */