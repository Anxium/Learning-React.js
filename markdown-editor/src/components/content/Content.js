import React, { Component } from 'react';
import './content.css'; // Import du css

import marked from 'marked' // Import de markdown editor

import sampleText from './sampleText' // Import du text par défaut

class Content extends Component {
    state = {
        text: sampleText
    }

    componentDidMount () {
        const text = localStorage.getItem('text')
        
        if (text) {
            this.setState({ text })  
        } else {
            this.setState({ text: sampleText })
        }
    }

    componentDidUpdate () {
        const text = this.state.text
        localStorage.setItem('text', text)
    }

    handleChange = event => {
        const text = event.target.value
        this.setState({ text })
    }

    renderText = text => {
        const __html = marked(text, { sanitize: true })
        return { __html }
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row mt-4 mb-5">
                    <div className="col-12">
                        <h1 className="text-center">Éditeur live de MarkDown</h1>                
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <textarea
                            className="form-control"
                            rows="30"
                            onChange={this.handleChange}
                            value={this.state.text}>
                        </textarea>
                    </div>
                    <div className="col-sm-6 mt-4 mt-sm-0">
                        <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;