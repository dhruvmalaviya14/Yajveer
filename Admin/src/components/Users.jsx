import { useSelector } from "react-redux";
import "../CSS/Users.css";

export default function Users() {
  const users = useSelector((state) => state.users?.data?.totalUsers || []);

  return (
    <div className="users-container">
      <h2 className="users-title">Registered Users</h2>
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Phone</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{new Date(user.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-data">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
