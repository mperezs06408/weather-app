import { useState } from "react"

const CELCIUS = 'celcius';

function SwitchFormat({handleFormatChange}){
    const [state, setState] = useState({
        celsiusActive: true,
        fahrenheitActive: false,
    })
    const onClickFormat = (e) => {
        handleFormatChange(e.target.value);
    }

    return (
        <ul className="switch">
            <li className="switch__element">
                <button type="button" onClick={onClickFormat} value="celsius">Celsius</button>
            </li>
            <li className="switch__element">
                <button type="button" onClick={onClickFormat} value="fahrenheit">Fahrenheit</button>
            </li>
        </ul>
    )
}

export default SwitchFormat;