let file = './assets/ok.mp4'
const path = require( 'path' )
const fs = require('fs')

fs.stat(file, (err, stat) => {
  let total = stat.size
  let progress = 0
  let read = fs.createReadStream( file )
  let write = fs.createWriteStream('copy.mp4')

  read.on('data', (chunk) => {
    progress += chunk.length
    console.log("J'ai lu " + Math.round(100 * progress / total) + "%")
  } )
    
    // Un simple pipe suffit pour brancher notre lecture à notre écriture, NodeJS se charge du reste :)
  read.pipe(write)
write.on('finish', () => {
    console.log('Le fichier a bien été copié')
})
} )


// Dans cet exemple, string est stocké dans buffer 
// qui est bien un tableau de bytes que nous reconvertissons en string2.


