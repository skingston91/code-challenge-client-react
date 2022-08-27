import {serverUrl} from './App';
import axios from 'axios';

const useGetTemperature = async ({id}) => {
    try {
        const temperature = await axios(`${serverUrl}/temperature/${id}`)
        return {id, temperature}
    } catch(error) {
        return {id, error: 'Request went wrong'}
    }
    
}

export default useGetTemperature;