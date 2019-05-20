import React, { useContext } from 'react';

import { AppContext } from '../context/app';

const Profile: React.FC = () => {
  const { user } = useContext(AppContext);
  return (
    <table>
      <tbody>
        <tr>
          <th>Id</th>
          <td>{user.id}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{user.name}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>Created at</th>
          <td>{user.createdAt}</td>
        </tr>
        <tr>
          <th>Updated at</th>
          <td>{user.updatedAt}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Profile;
