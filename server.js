// Framerwork Express
const express = require( 'express' )
const path = require( 'path' )

const port = 3000
const axios = require('axios')
const { json } = require( 'express/lib/response' )
const fs = require( 'fs' )
const Mustache = require('Mustache')

const bodyParser = require('body-parser')
const app = express()

const fileUpload = require('express-fileupload')

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.use(bodyParser.json());
app.use( bodyParser.urlencoded( { extended: true } ) );
// app.use(express.static(path.join(__dirname, 'assets')));



const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set( 'views', __dirname + '/views' );


app.get( '/moustache', ( req, res ) =>
{
  
  axios.get( 'https://jsonplaceholder.typicode.com/users' ).then( ( response ) =>
  {
    return res.render( 'users',
    {
      users: response.data
    } )
    
  } )
} )

app.get( '/photos', ( req, res ) =>
{
  
  axios.get( 'https://jsonplaceholder.typicode.com/photos' ).then( ( response ) =>
  {
    return res.render( 'photos',
    {
      photos: response.data
    } )
    
  } )
} )

// Créer route qui affichera les images de JSONPlaceholder avec Axios 




// Utiliser la librairiec Express Upload pour uploader une image de bio  


app.post( "/subscribe",  ( req, res, next ) =>
{
  
  console.log( req.files.photo );
  req.files.photo.mv( './avatar/avatar.jpg', ( err ) =>
  {
     if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  })
  // const nom = req.body.nom
  //res.send( rendered)
  // 0. Ajouter l'age au formulaire et vérifier que l'age soit un nombre et de moins de 99 ans
  let nom = ( req.body.nom )
  let prenom = (req.body.prenom)
  let age = parseInt( req.body.age )
  let email = ( req.body.email )
  let ville = (req.body.ville)
  if ( isNaN( age )  )
  {
     return res.status(500).send('Age doit être un nombre')
  } else if ( age > 99 )
  {
    return res.status(500).send('Age doit être inférieur à 99')
  }
  
  
  
  
  // 1. Crée un champs Biographie de type textarea et vérifier si la bio fait au moins 20 caractères
  
  let bio = req.body.bio
  
  // bio.split(" ").length
  if ( bio.length < 20 )
  {
    return res.status(500).send('Bio trop courte')
  }
  
  
  // sinon lancer une erreur 500
  // 1. écrire dans un fichier text l'ensemble des donnés avec fs.writeFile()
  
  // fs.writeFileSync("data.txt", data,)
  
  const content = `
    nom : ${nom}
    prenom: ${prenom}
    Bio: ${bio}
  `
fs.writeFile("data.txt", content, (err) => {
  if (err) {
     console.error(err)
     return res.status(500).send('Erreur de fichier')
  }
  //file written successfully
} )
  
  // 3. Si la ville saisie est St Etienne, levée une exception de type 403 "Interdis ici"
  if ( ville === "st etienne" )
  {
    res.status(403).send("Dommage...")
  }
  
  
  
  // // 2. Renvoyer le nom l'email et la ville sous format JSON
  // return res.json( {
  //   email: email,
  //   ville: ville
  //  })
  
  
  // 4. Modifier la réponse pour envoyer du html en réponse avec le nom , prénom, ville
  // avec le moteur de template Moustache
  
  const template = `
  <body>
    <p>Hello <b>{{  name }}</b></p>
  </body>
  `
  
  res.render( 'formulaire', { name: 'Luke' }  )
  
  // Exercice 1:  Externaliser dans un fichier le rendu HTML avec Moustache Express
  // Exercice 2: Utiliser Moustache Express et le Module Axios pour afficher la liste des utilisateurs
  // avec JSONPlaceholder https://jsonplaceholder.typicode.com/users 
  
  
  
} );


app.get( '/la', ( req, res ) =>
{
    console.log(path.dirname('./assets/ok.txt'))
    // return res.send("data")
    fs.readFile('./assets/ok.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        return res.send(data)
        // console.log(data)
    } )
    
    const content = 'Some content!'

    try {
        const data = fs.writeFileSync('./assets/test.txt', content)
    //file written successfully
    } catch (err) {
        console.error(err)
    }
//   res.send('Hello World!')
} )

app.get( "/lai", function ( req, res )
{
  res.sendFile(__dirname + "/index.html");
})

app.get("/video", function (req, res) {
 // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "./assets";
  const videoSize = fs.statSync("./assets/ok.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
} );

app.get("/html", function(req, res, next) {
  res.sendfile("./assets/index.html")
} );

app.get('/mesposts', async (req, res) => {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    res.json( posts.data )
} )



app.get('/api', (req, res) => {
    res.json( {
        nom: "ok",
        age: 33,
        ville: "Lyon"
    })
} )


app.get("/subscribe", function(req, res, next) {
  res.sendfile("./assets/suscribe.html")
} );




app.get("/contact", function(req, res, next) {
  res.sendfile("./assets/contact.html")
} );

app.get("/profil/:id", function(req, res, next) {
    // parametre en GET
    const id = req.params.id
    res.send(`Votre profil est ${id}`)
});

// Route qui renvois un nom et prénom en GET sous format JSON
// Bonus : si le prénom est Julien, renvoyer une erreur 500 avec pour message "It's so bad !"
// Bonus 2: Si on écris Capucine: envoyer une client 403 



app.get( '/movie', ( req, res ) =>
{
} )

app.get( '/pdf', ( req, res ) =>
{
   res.download('./assets/sample.pdf', 'user-test.pdf')
} )

// créer une route qui renvois un vidéo en MP4 avec Express

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})