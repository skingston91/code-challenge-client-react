import { useEffect, useState } from 'react';
import axios from 'axios'

export const serverUrl = 'http://localhost:8081' // this should be an env variable

const App = ({drinks}) => {
  const [items, setItems] = useState({});

  useEffect(() => {
    const request = () =>
      drinks.forEach((product) => {
        axios(`${serverUrl}/temperature/${product.id}`)
          .then(({data}) => 
            setItems((prevItems) => ({
            ...prevItems,
            [data.id]: {
              ...product,
              ...data,
            },
          }))
          );
      });

    setInterval(request, 5000); // To Test

    request();
  }, [drinks]);

  return (
    <div className="App">
      <h2>Beers</h2>
      <table>
        <thead>
          <tr>
            <th align="left">Product</th>
            <th align="left">Temperature</th>
            <th align="left">Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(items).map((itemKey) => {
            return (
              <tr key={items[itemKey].id}>
                <td width={150}>{items[itemKey].name}</td>
                <td width={150}>{items[itemKey].temperature}</td>
                <td width={150}>
                  {items[itemKey].temperature <
                    items[itemKey].minimumTemperature && <span>too low</span>}
                  {items[itemKey].temperature >
                    items[itemKey].maximumTemperature && <span>too high</span>}
                  {items[itemKey].temperature <=
                    items[itemKey].maximumTemperature &&
                    items[itemKey].temperature >=
                    items[itemKey].minimumTemperature && <span>all good</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
