import React, {Component} from "react";
import axios from "axios"
import renderHTML from 'react-render-html';

class Translate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            definition: [],
            word_net: [],
            sentence: [],
            synonyms: [],
            rel_word: null
        };
    }

    componentDidMount() {
        const search = this.props.match.params.translate;
        axios.get("http://139.180.155.106/api/translate/" + search)
            .then((result) => {
                    const data = result.data;
                    this.setState({
                        definition: data.definition,
                        word_net: data.word_net,
                        sentence: data.sentence,
                        synonyms: data.synonyms,
                        rel_word: data.rel_word
                    })
                }
            )
    }

    render() {
        return (
            <div className="content">
                <div className="definition new-line">
                    <h5>Định nghĩa: </h5>
                    {this.state.definition.map(item => {
                        return item + ' \n ';
                    })}
                </div>
                <hr/>
                {/*<div className="word-net">*/}
                {/*    {this.state.word_net.map((item, index) => {*/}
                {/*        return (<div key={index}>*/}
                {/*            <span>{item.pos}</span> <br/>*/}
                {/*            {item.tr.map((tr, keyTr) => {*/}
                {/*                return (<div key={keyTr}>*/}
                {/*                    <span>{keyTr}. {tr.l}</span><br/>*/}
                {/*                    {tr.similar && tr.similar.length > 0 &&*/}
                {/*                    <span>Synonyms: <span>{tr.similar.map(s => s + '/')}</span></span>*/}
                {/*                    }*/}
                {/*                    <br/>*/}
                {/*                </div>)*/}
                {/*            })}*/}
                {/*        </div>)*/}
                {/*    })}*/}
                {/*</div>*/}
                {/*<hr/>*/}

                <div className="sample-sentences">
                    <h5>Vi du:</h5>
                    {this.state.sentence.map((item, index) => {
                        return (<div key={index}>
                            <span>{index + 1}. {renderHTML(item.foreign)} </span><br/><br/>
                        </div>)
                    })}
                </div>
                <hr/>

                <div className="synosyms">
                    {this.state.synonyms && this.state.synonyms.map((item, index) => {
                        return (<div key={index}>
                            <span>{item.pos}{item.tran}</span><br/>
                            {item.ws.map(ws => " " + ws.w + " / ")}
                            <br/><br/>
                        </div>)
                    })}
                    <hr />
                </div>

                {this.state.rel_word &&
                    <div className="rel-word">
                        <span>Lien hop: {this.state.rel_word.word} </span> <br/><br/>
                        {this.state.rel_word.rels.map((item, index) => {
                            return (<div key={index}>
                                <span>{item.rel.pos}</span><br/>
                                {item.rel.words.map(w => w.word + " / ")}
                                <br/><br/>
                            </div>)
                        })}
                    </div>
                }

            </div>
        );
    }
}

export default Translate;
