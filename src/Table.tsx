import React, {FC} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {User} from './user.model';

const SortableTableHeader = ({sortValue, children}: any) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy');

  const [sortProp, order] = sortBy ? sortBy.split(':') : [];

  const createToLink = () => {
    if (sortValue === sortProp) {
      if (!order) {
        return `?sortBy=${sortValue}:desc`;
      } else {
        return '/';
      }
    } else {
      return `?sortBy=${sortValue}`;
    }
  };

  const sortSymbol = () => {
    if (sortValue === sortProp) {
      return !order ? '️⬇️' : '⬆️';
    }
    return '';
  };

  return (
    <th>
      <Link to={createToLink()}>
        {children}
        {sortSymbol()}
      </Link>
    </th>
  );
};

const Table: FC<{
  data: User[];
}> = ({data}) => {
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy');

  const [sortProp, order] = sortBy ? (sortBy as string).split(':') : [];

  const createToLink = (sortValue: string) => {
    if (sortValue === sortProp) {
      if (!order) {
        return `?sortBy=${sortValue}:desc`;
      } else {
        return '/';
      }
    } else {
      return `?sortBy=${sortValue}`;
    }
  };

  const sortSymbol = (sortValue: string) => {
    if (sortValue === sortProp) {
      return !order ? '️⬇️' : '⬆️';
    }
    return null;
  };

  return (
    <table>
      <thead>
        <tr>
          <SortableTableHeader sortValue="username">
            Username
          </SortableTableHeader>
          <SortableTableHeader sortValue="name">Name</SortableTableHeader>
          <SortableTableHeader sortValue="website">Website</SortableTableHeader>
        </tr>
      </thead>
      <tbody>
        {data.map(item => {
          return (
            <tr key={item.username}>
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

export default Table;
