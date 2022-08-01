import React, {FC, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import Table from './Table';
import {User} from './user.model';

const App: FC = () => {
  const [data, setData] = React.useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';
  const [sortProp, order] = sortBy ? sortBy.split(':') : [];

  const sortedData = sortBy
    ? [...data].sort((a, b) => {
        const firstValue = a[sortProp as keyof User];
        const secondValue = b[sortProp as keyof User];

        if (!firstValue || !secondValue) {
          return 0;
        }

        return order === 'desc'
          ? secondValue.localeCompare(firstValue)
          : firstValue.localeCompare(secondValue);
      })
    : data;

  return (
    <div>
      <Table data={sortedData} />
    </div>
  );
};

export default App;
