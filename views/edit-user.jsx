/** @jsx React.DOM */
var React = require('react');
var Layout = require('./layouts/main.jsx');
var ReactForms = require('react-forms');
var Form = ReactForms.Form;

module.exports = React.createClass({
  onChange: function(value, update) {
//    console.dir(arguments)
  },
  showValue(){
    alert(this.refs.form.value());
  },
  render: function() {
    var form = this.transferPropsTo(
      <Form 
        ref="form" 
        component={React.DOM.div}

        value={this.props.user} 
        onChange={this.onChange} 
        schema={this.props.userFormSchema}/>
    );

    return <Layout>
        <section className="users edit admin">
            <header>
                <h1>Edit User</h1>
            </header>
        
            <form onSubmit={this.onSubmit} method='POST'>
              {form}
                <button type="submit" className="save">
                    Save changes
                </button>
            </form>

        </section>
    </Layout>;
    }
});

