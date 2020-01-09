const express = require('express');
const app = express();
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS

AWS.config.update({
  accessKeyId: 'AKIAJTM7GUNSTQW3E5AA',
  secretAccessKey: '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'
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
  .catch(err => {
    console.log('failed:', err)
  });
};

module.exports ={
  uploadFile: uploadFile
}
