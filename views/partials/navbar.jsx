/** @jsx React.DOM */
var React = require('react');
module.exports = React.createClass({
  render: function() {
    
    return <nav>
        <div className="navigation-wrapper">
          <a className="logo">
            <img src="https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png" alt="Logo Image"/>
          </a>
          <a href="" className="navigation-menu-button" id="js-mobile-menu">MENU</a>
          <div className="nav">
            <ul id="navigation-menu">
              <li className="nav-link"><a>Products</a></li>
              <li className="nav-link"><a>About Us</a></li>
              <li className="nav-link"><a>Contact</a></li>
              <li className="nav-link more"><a>More</a>
                <ul className="submenu">
                  <li><a>Submenu Item</a></li>
                  <li><a>Another Item</a></li>
                  <li className="more"><a>Item with submenu</a>
                    <ul className="submenu">
                      <li><a>Sub-submenu Item</a></li>
                      <li><a>Another Item</a></li>
                    </ul>
                  </li>
                  
                </ul>
              </li>
            </ul>
          </div>
          <div className="navigation-tools">
            <div className="search-bar">
              <div className="search-and-submit">
                <input type="search" placeholder="Enter Search" />
                <button className="search" type="button" title="Search the site">
                  <i className="fa fa-search"></i>
                  </button>
              </div>
            </div>
            <a className="sign-up">Sign Up</a>
          </div>
        </div>
      </nav>
}
});