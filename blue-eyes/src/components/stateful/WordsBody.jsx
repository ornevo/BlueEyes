import { Component } from 'react';
import Token from "../stateless/Token";
import { XIcon, PencilIcon } from '@heroicons/react/solid'
import Constants from "../../constants";


function Word({word}) {
    const color = Constants.SEVERITY_TO_COLOR[word.severity];
    return (
        <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] bg-white p-4 border border-b-gray-300">
            <PencilIcon className={"h-6 pb-0.5 cursor-pointer mx-1 w-6"}/>
            <span className="px-3">{word.word}</span>
             <Token color={color} customStyles="text-base px-3 select-none">
                {Constants.SEVERITY_TO_STR[word.severity]}
            </Token>
            <span></span>
            <XIcon className={"h-6 cursor-pointer mx-1 w-6"}/>
        </div>
    )
}

function PlusButton({onClick}) {
    return (
        <div onClick={onclick}
                className="grid cursor-pointer mx-4 place-items-center rounded-full bg-emerald-500 select-none w-12 h-12 text-2xl text-white"
        >
            +
        </div>
    )
}


class WordsBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedWordId: undefined,
            lastSearchTermChange: new Date(),
            searchTerm: ''
        };
    }

    onSearchTemUpdate(n) {
        const now = new Date();
        this.setState({lastSearchTermChange: now}, _ => {
            setTimeout(() => {
                if(this.state.lastSearchTermChange === now)
                    this.setState({searchTerm: n.target.value});
            }, 100);
        })
    }

    render() {
        return (
            <div className="p-5">
                <div className="grid grid-cols-[auto_1fr] mb-5">
                    <PlusButton/>
                    <input className="my-1 py-1 px-3" placeholder="חיפוש..." onChange={this.onSearchTemUpdate.bind(this)} type="text"/>
                </div>
                {/* TODO: filtering, sorting, etc... */}
                {this.props.words.filter(w => w.word.indexOf(this.state.searchTerm) !== -1).map(w => (
                    <Word word={w} key={w.id}/>
                ))}
            </div>
        );
    }
}


export default WordsBody;