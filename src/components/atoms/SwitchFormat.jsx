import { changeSearchFormat } from "@/store/slices/citiesWeatherSlice";
import { useSelector, useDispatch } from 'react-redux';
import '@styles/components/SwitchFormat.scss';

const CELSIUS = {
    label: 'C°',
    value: 'celsius',
    id: 'C'
}
const FAHRENHEIT = {
    label: 'F°',
    value: 'fahrenheit',
    id: 'F'
}

function SwitchFormat(){
    const {
        format
    } = useSelector(state => state.citiesWeather)
    const dispatch = useDispatch();
    const onClickFormat = (e) => {
        dispatch( changeSearchFormat(e.target.value) )
    }

    return (
        <ul className="switch">
            <li className={format.id === CELSIUS.id? "switch__element switch__element--c_active":"switch__element"}>
                <button type="button" onClick={onClickFormat} value={CELSIUS.value}>{CELSIUS.label}</button>
            </li>
            <li className={format.id === FAHRENHEIT.id? "switch__element switch__element--f_active":"switch__element"}>
                <button type="button" onClick={onClickFormat} value={FAHRENHEIT.value}>{FAHRENHEIT.label}</button>
            </li>
        </ul>
    )
}

export default SwitchFormat;