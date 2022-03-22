import { Component } from 'react';
import WordTableRow from "../stateless/WordTableRow";


function PlusButton({onClick}) {
    return (
        <div onClick={onClick}
                className="grid shadow-lg cursor-pointer mx-4 place-items-center rounded-full bg-emerald-500 select-none w-12 h-12 text-2xl text-white"
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

    cloneWord(word) {
        if(word === undefined) return word;
        var ret = {};
        Object.assign(ret, word);
        return ret;
    }
    
    componentDidUpdate(previousProps) {
        // Check if added word to put in edit word the new word
        if(previousProps.words.length < this.props.words.length)
            this.setState({editedWord: this.cloneWord(this.props.words[0])});
    }

    onEdit(wId) {
        this.setState({editedWord: this.cloneWord((this.props.words.filter(w => w.id === wId) || [undefined])[0])});
    }

    onWordFieldChange(field, value) {
        let currEditedWord = this.state.editedWord;
        if(currEditedWord === undefined) {
            return;
        }
        currEditedWord[field] = value;
        this.setState({editedWord: currEditedWord});
    }

    applyEdit() {
        let newWords = this.props.words.map(w => (
            w.id === this.state.editedWord.id ? 
            this.state.editedWord : 
            this.cloneWord(w)
        ));
        this.props.updateWords(newWords, () => {
            this.setState({editedWord: undefined});
        });
    }

    onWordDelete(wId) {
        let newWords = this.props.words.filter(w => w.id !== wId).map(this.cloneWord);
        if(this.state.editedWord && this.state.editedWord.id === wId)
            this.setState({editedWord: undefined}, () => this.props.updateWords(newWords));
        else
            this.props.updateWords(newWords);
    }

    render() {
        return (
            <div className="p-5">
                <div className="grid grid-cols-[auto_1fr] mb-5">
                    <PlusButton onClick={this.props.addNewWord}/>
                    <input className="my-1 shadow py-1 px-3" placeholder="חיפוש..." onChange={this.onSearchTemUpdate.bind(this)} type="text"/>
                </div>
                {/* TODO: sorting */}
                {this.props.words.filter(w => w.word.indexOf(this.state.searchTerm) !== -1).map(w => (
                    (this.state.editedWord !== undefined && this.state.editedWord.id === w.id)
                    ?
                    <WordTableRow word={this.state.editedWord} key={w.id}
                            editMode={true} onWordFieldChange={this.onWordFieldChange.bind(this)}
                            onDoneEditing={this.applyEdit.bind(this)} onDelete={this.onWordDelete.bind(this)}/>
                    :
                    <WordTableRow word={w} key={w.id} editMode={false}
                            disableEdit={this.state.editedWord !== undefined}
                            onEdit={this.onEdit.bind(this)} onDelete={this.onWordDelete.bind(this)}/>
                ))}
            </div>
        );
    }
}


export default WordsBody;