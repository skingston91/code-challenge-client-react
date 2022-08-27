import axios from 'axios'
import chance from './chance'
import {serverUrl} from './App'
import useGetTemperature from './useGetTemperature'

jest.mock('axios')
const returnedValue = chance.natural()
describe('useGetTemperature', () => {
    
    it('calls axios with the server url and temperture and drink id', () => {
        const id = chance.natural()
        useGetTemperature({id})
        expect(axios).toBeCalledWith(`${serverUrl}/temperature/${id}`)
    })

    describe('successful request', () => {
        beforeEach(() => {
            axios.mockResolvedValue(returnedValue)
        })

        it('returns id and response', async () => {
            const id = chance.natural()
            const result = await useGetTemperature({id})
            expect(result).toStrictEqual({
                id,
                temperature: returnedValue
            })
        })
    })

     describe('failed request', () => {
        beforeEach(() => {
            axios.mockRejectedValue()
        })

        it('returns id and error', async () => {
            const id = chance.natural()
            const result = await useGetTemperature({id})
            expect(result).toStrictEqual({
                id,
                error: 'Request went wrong'
            })
        })
    })
   
})