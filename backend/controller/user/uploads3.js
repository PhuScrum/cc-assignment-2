const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS

AWS.config.update({
 
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: 'assignment-bucket123',
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise()
  //.then(response => {
    // console.log(`done! - `, response)
    // console.log(
    //   `The URL is ${s3.getSignedUrl('getObject', { Bucket: BUCKET, Key: `${name}.${type.ext}` })}`
    // )
 // })
  .catch(err => {
    console.log('failed:', err)
  });
};

module.exports ={
  uploadFile: uploadFile
}

// // Define POST route
// app.post('/test-upload', (request, response) => {
//   const form = new multiparty.Form();
//     form.parse(request, async (error, fields, files) => {
//       if (error) throw new Error(error);
//       try {
//         const path = files.file[0].path;
//         const buffer = fs.readFileSync(path);
//         const type = fileType(buffer);
//         const timestamp = Date.now().toString();
//         const fileName = `assignment-bucket123/${timestamp}-lg`;
//         const data = await uploadFile(buffer, fileName, type);
//         return response.status(200).send(data);
//       } catch (error) {
//         return response.status(400).send(error);
//       }
//     });
// });

// app.listen(process.env.PORT || 3000);
// console.log('Server up and running...');
