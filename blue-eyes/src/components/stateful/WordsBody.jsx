import { Component } from 'react';
import WordTableRow from "../stateless/WordTableRow";


function PlusButton({onClick}) {
    return (
        <div onClick={onClick}
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
            editedWord: undefined,
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

    onEdit(wId) {
        this.setState({editedWord: (this.props.words.filter(w => w.id === wId) || [undefined])[0]});
    }

    onWordFieldChange(field, value) {
        let currEditedWord = this.state.editedWord;
        if(currEditedWord === undefined) {
            console.log("Weird: for some reason tried to edit word while WordsBody container component was not in edit mode");
            return;
        }
        currEditedWord[field] = value;
        console.log(this.state.editedWord, currEditedWord);
        this.setState({editedWord: currEditedWord});
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
                    (this.state.editedWord !== undefined && this.state.editedWord.id === w.id)
                    ?
                    <WordTableRow word={this.state.editedWord} key={w.id}
                            editMode={true} onWordFieldChange={this.onWordFieldChange.bind(this)}
                            onDoneEditing={() => this.setState({editedWord: undefined})} />
                    :
                    <WordTableRow word={w} key={w.id} editMode={false} disableEdit={this.state.editedWord !== undefined} onEdit={this.onEdit.bind(this)}/>
                ))}
            </div>
        );
    }
}


export default WordsBody;