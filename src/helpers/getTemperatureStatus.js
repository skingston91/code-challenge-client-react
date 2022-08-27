const getTemperature = ({temperature, minimumTemperature, maximumTemperature}) => {
    if(temperature > maximumTemperature) return 'hot'
    if(temperature <=
                    maximumTemperature &&
                    temperature >=
                    minimumTemperature) return 'good'
    return 'low'
}

export default getTemperature