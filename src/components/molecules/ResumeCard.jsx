import '@styles/components/ResumeCard.scss';

function ResumeCard({id, cityName, currentTemp, icon, lastUpdateHour, handleClick}){
    const cityLabelName = () => {
        let label = cityName.split(' ')[0].split('')

        label = label.slice(0,3).join('').toUpperCase()

        return label
    }

    const onClickResumeCard = () => {
        handleClick(id)
    } 

    return(
        <button 
            className='resume__card'
            onClick={onClickResumeCard}    
        >
            <h1 className='resume__city'>{cityLabelName()}</h1>
            <h2 className='resume__temp'>{currentTemp}</h2>
            <img 
                alt={icon} 
                src={`http://openweathermap.org/img/wn/${icon}.png`} 
                className='resume__icon'
            />
            <h3 className='resume__lastUpdate'>{lastUpdateHour}</h3>
        </button>
    )
}

export default ResumeCard;