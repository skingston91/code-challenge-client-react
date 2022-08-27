import {render, screen} from '@testing-library/react';
import App, {serverUrl} from './App';
import chance from './chance'
import axios from 'axios'

jest.mock('axios')

const returnedValue = chance.natural()
const drinks = [{
        id: '1',
        name: 'Pilsner',
        maximumTemperature: 6,
    }] // TODO Make this randomly generated and of any length with chance random

describe('App', () => {
    let appContainer;
    let appRerender;

    beforeEach(() => {
        jest.resetAllMocks();
        axios.mockResolvedValue({data: {id: '1', temperature: returnedValue}})
        const {container, rerender} = render(<App drinks={drinks}/>)
        appContainer = container
        appRerender = rerender
    })
    it('has a classname app', () => {
        expect(appContainer.firstChild.classList.contains('App')).toBe(true)
    });
    
    it('common elements', () => {
        screen.getByRole('heading',{level: 2, name: 'Beers'})
        screen.getByRole('columnheader', {name: 'Product'}) 
        screen.getByRole('columnheader', {name: 'Temperature'}) 
        screen.getByRole('columnheader', {name: 'Status'}) 
    });

    describe('api calls', () => {
        it('api call is made on load', () => {
            expect(axios).toBeCalled()
        });

        it('api call is made on load with correct url', () => {
            expect(axios).toBeCalledWith(`${serverUrl}/temperature/${drinks[0].id}`)
        });
    })

    describe('table body', () => {
        it('renders the correct amount of rows per drinks', () => {
            const headerRowAmount = 1
            expect(screen.getAllByRole('row')).toHaveLength(drinks.length + headerRowAmount)
            const newAmountOfDrinks = [
                ...drinks,
                 {
                    id: '2',
                    name: 'IPA',
                    minimumTemperature: 5,
                    maximumTemperature: 6,
                },
            ]
            appRerender(<App drinks={newAmountOfDrinks}/>)
            expect(screen.getAllByRole('row')).toHaveLength(drinks.length + headerRowAmount)
        })

        // it('has the correct data for the row', () => {

        // })
    })
   
});
