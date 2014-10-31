/** @jsx React.DOM */
var React = require('react');
var Layout = require('./layouts/main.jsx');

module.exports = React.createClass({
  render: function() {
    
    return <Layout>
        <section className="users list admin">

            <header>
                <h1>Users</h1>
            </header>

            <nav>
                <a href="/users/new" className="add" title="Create new user">
                    <i className="fa fa-plus-circle"></i>
                </a>


            </nav>

            <table>
                <thead>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Confirmed</th>
                    <th>&nbsp;</th>
                </thead>
                <tbody>
                    {this.props.users.map(function(user) {
                        return <tr>
                            <td>{user.id}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.admin}</td>
                            <td>{user.confirmed}</td>
                            <td>
                                <form action="/users/{user.id}" method = "delete">
                                    <button type="submit" className="delete" title="Delete user {user.id}">

                                        <i className="fa fa-remove"></i>
                                    </button>
                                </form>

                                <a href={'/users/'+user.id} className="edit" title="Edit user {user.id}">

                                    <i className="fa fa-edit"></i>
                                </a>
                            </td>
                        </tr>
                    })}
                    
                    
                </tbody>

            </table>


        </section>
      </Layout>
   }
});