const route = require( 'express' ).Router();
const multer = require( 'multer' );
const controller = require( '../controllers/estabcontrol' );
const mysql = require( '../mysql' ).pool;

const storeg = multer.diskStorage( {

    destination: function ( req, file, cb ) {
        cb( null, './public/uploads/' );
    },
    filename: function ( req, file, cb ) {
        cb( null, file.originalname )
    }
} )
const fileFilter = ( req, file, cb ) => {
    //console.log(storeg);
    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif' ) {

        cb( null, true );
    } else {
        cb( null, false )
    }
}
const upload = multer( {
    storage: storeg,
    fileFilter: fileFilter
} );

route.get( '/', ( req, res ) => {
    res.sendFile( __basedir + '/public/pages/estabelecimento.html' );
} )

route.get('/sucesso', (req, res) => {
    res.sendFile(__basedir + '/public/pages/estabelecimento-sucesso.html')
})

route.get( '/todos', controller.getEstabelecimento );


route.get( '/verifica', controller.verifica );

route.delete( '/remover', controller.deleteEstabelecimento );

route.patch( '/atualizar', controller.patchEstabelecimento );

route.post( '/cadastro', upload.single( 'logo' ), controller.postEstab );

route.get( '/listar/:id_proprietario', controller.getEstabProp );

route.get('/mesa/:id_estabelecimento', controller.getUmEstabelecimento);

route.get( '/:nome_estabelecimento', controller.getNomeEstabelecimento);




module.exports = route;