//                                                   1.CALLBACKS

// const fs = require('fs');
// const path = require('path');

// const sortFolder = (dir, gender, newDir) => {
//     fs.readdir(path.join(__dirname, dir), (err, files) => {
//         if (err) return console.log(err);
//
//         for (let file of files) {
//             const pathToFile = path.join(__dirname, dir, file);
//
//             fs.readFile(pathToFile, (err1, data) => {
//                 if (err1) return console.log(err1);
//
//                 const user = JSON.parse(data.toString());
//                 if (user.gender === gender) {
//                     fs.rename(pathToFile, path.join(__dirname, newDir, file), err2 => {
//                         if (err2) return console.log(err2);
//                     });
//                 }
//             });
//         }
//     });
// }
//
// sortFolder('boys', 'female', 'girls');
// sortFolder('girls', 'male', 'boys');

//                                                   2.ASYNC AWAIT

// const fs = require('fs/promises');
// const path = require('path');
//
// const sortFolders = async (dir, gender, newDir) => {
//     try {
//         const files = await fs.readdir(path.join(__dirname, dir));
//
//         for (let file of files) {
//             const pathFile = path.join(__dirname, dir, file);
//             const data = await fs.readFile(pathFile);
//             const user = JSON.parse(data.toString());
//
//             if (user.gender === gender) {
//                 await fs.rename(pathFile, path.join(__dirname, newDir, file));
//             }
//         }
//     }catch (error) {
//         console.log(error);
//     }
// }
//
// sortFolders('girls', 'male', 'boys');
// sortFolders('boys', 'female', 'girls');