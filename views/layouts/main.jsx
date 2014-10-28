/** @jsx React.DOM */
var React = require('react');
var Navbar = require('../partials/navbar.jsx');

module.exports = React.createClass({
  render: function() {
    
    return <html lang="en">

            <head>
                <meta charset="utf-8"/>
                <title>go-club</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="/style.css" media="screen"/>


            </head>

            <body>
                <header>
                	<Navbar/>
                </header>
                
                {this.props.children}



            </body>

        </html>
}
});