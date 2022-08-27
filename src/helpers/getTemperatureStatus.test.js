import getTemperatureStatus from './getTemperatureStatus'
describe('getTemperatureStatus', () => {
    it('returns whe low when too cold', () => {
        expect(getTemperatureStatus({temperature: 0, minimumTemperature: 1})).toBe('low')
    })

    it('returns when hot when too hot', () => {
        expect(getTemperatureStatus({temperature: 1, maximumTemperature: 0})).toBe('hot')
    })

    it('returns good when its good', () => {
        expect(getTemperatureStatus({temperature: 1, maximumTemperature: 1, minimumTemperature: 1})).toBe('good')
    })
})