import {render, screen} from '@testing-library/react';
import App from './App';

describe('App', () => {
    let appContainer;
    beforeEach(() => {
        jest.resetAllMocks();
        const {container} = render(<App />)
        appContainer = container
    })
    it('has a classname app', () => {
        expect(appContainer.firstChild.classList.contains('App')).toBe(true)

    });
    it('common elements', () => {
        screen.getByRole('heading',{level: 2, name: 'Beers'})
        screen.getByText('Product') 
        screen.getByText('Temperature')
        screen.getByText('Status')
    });

    describe('Table Headings', () => {
        it('has correct headings', () => { 
            screen.getByText('Product') 
            screen.getByText('Temperature')
            screen.getByText('Status')
        })
    })
});
