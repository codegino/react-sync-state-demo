import React, {FC, useEffect} from 'react';

type User = {
  name: string;
  username: string;
  website: string;
};

const Table: FC<{data: User[]}> = ({data}) => {
  return (
    <table cellSpacing={20} border={1}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>website</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.name}</td>
              <td>{item.website}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const App: FC = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Table data={data} />
    </div>
  );
};

export default App;
