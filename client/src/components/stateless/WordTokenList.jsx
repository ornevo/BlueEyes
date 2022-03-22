import Constants from "../../constants";
import Token from "./Token";


// If wordsIds is supplied, will use it as the list. otherwise will use words, which is the full word object array
export default function WordTokenList({ wordIds, words }) {
    const toIterOn = wordIds ? wordIds : words.map(w => w.id);
    return (
        <div className="gap-1 mb-3">

            {
                toIterOn.map(wId => {
                    let word = words.find(w => w.id === wId);
                    if(!word) return "";
                    return <Token color={Constants.SEVERITY_TO_COLOR[word.severity]} key={word.id}>{word.word}</Token>;
                })
            }
        </div>
    )
}