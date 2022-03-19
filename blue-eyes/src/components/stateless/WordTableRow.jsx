import Constants  from '../../constants';
import Token from "../stateless/Token";
import { XIcon, PencilIcon, CheckIcon } from '@heroicons/react/solid'


function WordTableRow({word, editMode, disableEdit, onEdit, onWordFieldChange, onDoneEditing}) {
    const color = Constants.SEVERITY_TO_COLOR[word.severity];

    // Action icon
    let rightAction = "";
    const actionsClasses = "h-6 pb-0.5 cursor-pointer mx-1 w-6";
    if(editMode)
        rightAction = <CheckIcon className={actionsClasses} onClick={onDoneEditing}/>;
    else
        if(disableEdit)
            rightAction = <PencilIcon className={actionsClasses + " text-stone-300 cursor-not-allowed"} />;
        else
            rightAction = <PencilIcon className={actionsClasses} onClick={() => onEdit(word.id)}/>;

    // word itself as input or label
    let wordName = '';
    if(editMode)
        wordName = <input className="px-3 border-white focus:outline-0" value={word.word} autoFocus onChange={c => onWordFieldChange('word', c.target.value)} />;
    else
        wordName = <span className="px-3">{word.word}</span>;

    // The severity token, and if edited then the select option
    let severToken = "";
    const baseTokenClasses = "text-base px-3 select-none cursor-pointer max-0";
    const selectedTokenClasses = "border-2 border-black";
    let severityToRoundedStyle = {};
    severityToRoundedStyle[Constants.SEVERITY_HIGH] = "rounded-r-none";
    severityToRoundedStyle[Constants.SEVERITY_MID] = "rounded-none";
    severityToRoundedStyle[Constants.SEVERITY_LOW] = "rounded-l-none";
    console.log(severityToRoundedStyle);
    if(editMode) 
        severToken = (
            <span style={{margin: "2px 0"}}>
                {
                    [Constants.SEVERITY_LOW, Constants.SEVERITY_MID, Constants.SEVERITY_HIGH].map(sev => (
                        <Token color={Constants.SEVERITY_TO_COLOR[sev]}
                        customStyles={baseTokenClasses + " mx-0 " + severityToRoundedStyle[sev] + " " + (word.severity === sev ? selectedTokenClasses : '')}
                        onClick={() => onWordFieldChange('severity', sev)}
                        >
                            {Constants.SEVERITY_TO_STR[sev]}
                        </Token>

                    ))
                }
            </span>
        )
    else
        severToken = (
            <Token color={color} customStyles="text-base px-3 select-none">
                {Constants.SEVERITY_TO_STR[word.severity]}
            </Token>
        );

    return (
        <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] gap-2 bg-white p-4 border border-b-gray-300">
            {/* Edit / Done icon */}
            { rightAction }

            {/* Word label / input */}
            { wordName }

            {/* Severity */}
            { severToken }

            {/* For grid template place */}
            <span></span>

            {/* Delete icon */}
            <XIcon className={"h-6 cursor-pointer mx-1 w-6"}/>
        </div>
    )
}


export default WordTableRow;