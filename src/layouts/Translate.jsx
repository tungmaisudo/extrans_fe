/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {Component} from "react";
import axios from "axios";

class Translate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            pronunciation: '',
            syllables: [],
            definition: []
        };
    }

    componentDidMount() {
        const search = this.props.match.params.translate;
        axios.get("http://localhost:8080/search?search=" + search)
            .then((result) => {
                    const data = result.data;
                    this.setState({
                        word: data.word,
                        pronunciation: data.pronunciation,
                        syllables: data.syllables,
                        definition: data.results
                    })
                }
            )
    }

    renderEachDefinition(definition, index) {
        if (!definition) {
            return (<div key={index}></div>)
        }
        return (
            <div key={index}>
                <hr/>
                <p>{definition.partOfSpeech}</p>
                <p>{definition.definition}</p>
                <p>
                    {definition.synonyms && definition.synonyms.map(function (d, idx) {
                        return (<li key={idx}>{d}</li>)
                    })}
                </p>

                <p>
                    {definition.typeOf && definition.typeOf.map(function (d, idx) {
                        return (<li key={idx}>{d}</li>)
                    })}
                </p>

                <p>
                    {definition.examples && definition.examples.map(function (d, idx) {
                        return (<li key={idx}>{d}</li>)
                    })}
                </p>
            </div>
        )
    }

    render() {
        let syllables = '';
        let definitiones = [];
        if (this.state.syllables && this.state.syllables.length > 0) {
            this.state.syllables[0].list.forEach(item => {
                syllables += item + ".";
            })
        }
        if (this.state.definition && this.state.definition.length > 0) {
            this.state.definition.forEach((item, index) => {
                definitiones.push(this.renderEachDefinition(item, index))
            })
        }
        return (
            <div className="content">
                <Grid fluid>
                    <div>
                        <span><b>Dictionary:</b></span>&nbsp;
                        <span>{this.state.word}</span>&nbsp;&nbsp;
                        (<span>{this.state.pronunciation.all}</span>)
                    </div>

                    <div>
                        Syllables: {syllables}
                    </div>
                    <div>
                        {definitiones}
                    </div>
                </Grid>
            </div>
        );
    }
}

export default Translate;
