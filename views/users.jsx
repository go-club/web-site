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
                <button type="button" className="add" title="Create new user">
                    <i className="fa fa-plus-circle"></i>
                </button>


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
                            <td>{user.name}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.admin}</td>
                            <td>{user.confirmed}</td>
                            <td>
                                <button type="button" className="delete" title="Delete user user.name}">

                                    <i className="fa fa-remove"></i>
                                </button>

                                <button type="button" className="edit" title="Edit user user.name}">

                                    <i className="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    })}
                    
                    
                </tbody>

            </table>


        </section>
      </Layout>
   }
});