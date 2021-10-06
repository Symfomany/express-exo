// app.js

const http = require('http');
const fs = require( 'fs' )
const path = require('path')

// Create an instance of the http server to handle HTTP requests
let app = http.createServer( ( req, res ) =>
{
    
    const content = 'Coucou  Lundi / Mardi !'

    
    
const fs = require('fs')
const folderName = './testDir'
    try
    {
        if ( !fs.existsSync( folderName ) )
        {
            fs.mkdirSync( folderName )
        }
    } catch ( err )
    { console.error( err ) }


    
   fs.writeFile('./assets/coucou.txt', content, err => {
        if (err) {
            console.error(err)
            return
        }
       
    //file written successfully
    }) 
    
   fs.readFile('./assets/ok.txt', 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
    return res.end( data );
    })
    // const img = fs.readFileSync('./assets/ok.mp4');
    // res.writeHead(200, {'Content-Type': 'video/mp4' });
    // res.end( img, 'binary' );
    
    // const img2 = fs.readFileSync('./assets/200.gif');
    //  res.writeHead(200, {'Content-Type': 'image/gif' });
    // res.end( img2, 'binary' );
    
    // const data = fs.readFileSync('./assets/sample.pdf');
    // res.writeHead(200, {'Content-Type': 'application/pdf'});
    // res.end( data, 'binary' );
    
    // Set a response type of plain text for the response
    // res.writeHead(200, {'Content-Type': 'application/json'});

    // // Send back a response and end the connection
    // res.end( "[2,3,4,5]" );
    
    // 1: envoyer un PDF via un fichier ou une url
    // 2: envoyer une Image stocker en local
    
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');