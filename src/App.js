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
            const {id, name, temperature, minimumTemperature, maximumTemperature} = items[itemKey]
            return (
              <tr key={id}>
                <td width={150}>{name}</td>
                <td width={150}>{temperature}</td>
                <td width={150}>
                  {temperature <
                    minimumTemperature && <span>too low</span>}
                  {temperature >
                    maximumTemperature && <span>too high</span>}
                  {temperature <=
                    maximumTemperature &&
                    temperature >=
                    minimumTemperature && <span>all good</span>}
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
