/** @jsx React.DOM */
var React = require('react');
module.exports = React.createClass({
  render: function() {
    return <section>
	    	<h1>{this.props.error.status}</h1>
		<p>
		Error: {this.props.message}
		</p>
		<pre>
		{this.props.error.stack}
		</pre>
	</section>
  }
});