import {render, screen} from '@testing-library/react';
import App, {serverUrl} from './App';
import chance from './chance'
import axios from 'axios'

jest.mock('axios')


const getAllTableRows = () => screen.getAllByRole('row')

const temperature = chance.natural({min: 7})
const drinks = [{
        id: '1',
        name: 'Pilsner',
        maximumTemperature: 6,
    }] // TODO Make this randomly generated and of any length with chance random

const getColumnHeaderByName = (name) => screen.getByRole('columnheader', { name });
describe('App', () => {
    let appContainer;
    let appRerender;

    beforeEach(() => {
        jest.resetAllMocks();
        axios.mockResolvedValue({data: {id: '1', temperature}})
        const {container, rerender} = render(<App drinks={drinks}/>)
        appContainer = container
        appRerender = rerender
    })
    it('has a classname app', () => {
        expect(appContainer.firstChild.classList.contains('App')).toBe(true)
    });
    
    it('common elements', () => {
        screen.getByRole('heading',{level: 2, name: 'Beers'})
        getColumnHeaderByName('Product');
        getColumnHeaderByName('Temperature')
        getColumnHeaderByName('Status')
    });

    describe('api calls', () => {
        it('api call is made on load', () => {
            expect(axios).toBeCalled()
        });

        it('api call is made on load with correct url', () => {
            expect(axios).toBeCalledWith(`${serverUrl}/temperature/${drinks[0].id}`)
        });
        // TODO test its called for each drink
    })

    describe('table body', () => {
        it('renders the correct amount of rows per drinks', () => {
            const headerRowAmount = 1
            expect(getAllTableRows()).toHaveLength(drinks.length + headerRowAmount)
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
            expect(getAllTableRows()).toHaveLength(drinks.length + headerRowAmount)
        })

        it('has the correct data for the row', async () => {
            screen.getByRole('cell', {name: drinks[0].name}) 
            await screen.findByRole('cell', {name: temperature}) 
            await screen.findByRole('cell', {name: 'too high'})
        })

        it('has the correct data when too cold', async () => {
            axios.mockResolvedValue({data: {id: '1', temperature: 0}})
            appRerender(<App drinks={[{
                    id: '1',
                    name: 'IPA',
                    minimumTemperature: 5,
                    maximumTemperature: 6,
                }
            ]}/>)

            await screen.findByRole('cell', {name: 'too low'})
        })

        it('has the correct data when just right', async () => {
            axios.mockResolvedValue({data: {id: '1', temperature: 5}})
            appRerender(<App drinks={[{
                    id: '1',
                    name: 'IPA',
                    minimumTemperature: 5,
                    maximumTemperature: 6,
                }
            ]}/>)

            await screen.findByRole('cell', {name: 'all good'})
        })
    })
   
});

