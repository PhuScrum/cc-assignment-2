import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      
    };
    this.imageUrl = '';
    this.submitFile = this.submitFile.bind(this)
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    // for (var i = 0; i < this.state.file.length; i++) {
      formData.append('file', this.state.file[0]);
      axios.post(`http://localhost:8080/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.imageUrl = response.data.Location;
        this.props.uploadCallback(response.data.Location);
        this.props.setLocationImage(this.props.type, this.imageUrl)
      }).catch(error => {
        console.log(error);
        // handle your error
      });
    // }
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    // this.setState({ files: [...this.state.files, ...event.target.files] })
  }

  render() {
    return (
      <form >
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
        <button type='button' onClick={this.submitFile.bind(this)}>Send</button>
        <img src={this.imageUrl} className="image_signup" />

      </form>
    );
  }
}

export default FileUpload;