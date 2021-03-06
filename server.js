// Framerwork Express
const express = require( 'express' )
const path = require( 'path' )

const port = 3000
const axios = require('axios')
const { json } = require( 'express/lib/response' )
const fs = require( 'fs' )
const Mustache = require('Mustache')
const {createConnection, createConnections, Connection}  =  require("typeorm");


const main = async () =>
{
   try
  {
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 8889,
    username: "root",
    password: "root",
    database: "appnode"
  } );
 
     connection.query('SELECT * FROM user', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });

  } catch ( e )
  {
    console.log(e)
  }
}

main()

const bodyParser = require('body-parser')
const app = express()
const session = require('express-session')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'Webtech2022',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: false,
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

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


app.get( '/login', ( req, res ) =>
{
  console.log(req.session)
  return res.render('login',  {
      name: req.session.name
    })
} )


app.post( '/login', ( req, res ) =>
{
  const { email, password } = req.body
  if ( email === "julien@taiwa.fr" )
  {

    req.session.name = "Julien Boyer"
    return res.render( 'login', {
      name: req.session.name
    })
  } else
  {
    return res.status('403').send("Erreur d'identifiant")
  }
  
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

// Cr??er route qui affichera les images de JSONPlaceholder avec Axios 




// Utiliser la librairiec Express Upload pour uploader une image de bio  


app.post( "/subscribe",  ( req, res, next ) =>
{
  
  console.log( req.files.photo );
  req.files.photo.mv( `./avatar/${req.files.photo.name}`, ( err ) =>
  {
     if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  })
  // const nom = req.body.nom
  //res.send( rendered)
  // 0. Ajouter l'age au formulaire et v??rifier que l'age soit un nombre et de moins de 99 ans
  let nom = ( req.body.nom )
  let prenom = (req.body.prenom)
  let age = parseInt( req.body.age )
  let email = ( req.body.email )
  let ville = (req.body.ville)
  if ( isNaN( age )  )
  {
     return res.status(500).send('Age doit ??tre un nombre')
  } else if ( age > 99 )
  {
    return res.status(500).send('Age doit ??tre inf??rieur ?? 99')
  }
  
  
  
  
  // 1. Cr??e un champs Biographie de type textarea et v??rifier si la bio fait au moins 20 caract??res
  
  let bio = req.body.bio
  
  // bio.split(" ").length
  if ( bio.length < 20 )
  {
    return res.status(500).send('Bio trop courte')
  }
  
  
  // sinon lancer une erreur 500
  // 1. ??crire dans un fichier text l'ensemble des donn??s avec fs.writeFile()
  
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
  
  // 3. Si la ville saisie est St Etienne, lev??e une exception de type 403 "Interdis ici"
  if ( ville === "st etienne" )
  {
    res.status(403).send("Dommage...")
  }
  
  
  
  // // 2. Renvoyer le nom l'email et la ville sous format JSON
  // return res.json( {
  //   email: email,
  //   ville: ville
  //  })
  
  
  // 4. Modifier la r??ponse pour envoyer du html en r??ponse avec le nom , pr??nom, ville
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

// Route qui renvois un nom et pr??nom en GET sous format JSON
// Bonus : si le pr??nom est Julien, renvoyer une erreur 500 avec pour message "It's so bad !"
// Bonus 2: Si on ??cris Capucine: envoyer une client 403 



app.get( '/movie', ( req, res ) =>
{
} )

app.get( '/pdf', ( req, res ) =>
{
   res.download('./assets/sample.pdf', 'user-test.pdf')
} )

// cr??er une route qui renvois un vid??o en MP4 avec Express

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})