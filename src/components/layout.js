import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import { StaticQuery, graphql, Link } from 'gatsby';

import './layout.css';
import css from './layout.module.css';
import waitForGlobal from '../utils/wait-for-global';

export class Layout extends Component {
  drawerRef = createRef();
  open = false;

  componentDidMount() {
    waitForGlobal('mdc').then(this.applyJavascript);
  }

  applyJavascript = mdc => {
    this.mdc = mdc;
    this.drawer = mdc.drawer.MDCDrawer.attachTo(this.drawerRef.current);
  };

  toggleDrawer = () => {
    this.drawer.open = !this.drawer.open;
    window._draw = this.drawer;
  };

  closeDrawer = () => {
    this.drawer.open = false;
  };

  render = () => {
    const { children } = this.props;

    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[{ name: 'description', content: 'Sample' }, { name: 'keywords', content: 'sample, something' }]}
            >
              <html lang="en" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
              <link
                rel="stylesheet"
                href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css"
              />
              <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js" />
            </Helmet>
            <aside className="mdc-drawer mdc-drawer--dismissible" ref={this.drawerRef}>
              <div className="mdc-drawer__content">
                <nav className="mdc-list">
                  <Link className="mdc-list-item" activeClassName="mdc-list-item--activated" to="/">
                    Home
                  </Link>
                  <Link className="mdc-list-item" activeClassName="mdc-list-item--activated" to="/page-2/">
                    Page 2
                  </Link>
                  <Link className="mdc-list-item" activeClassName="mdc-list-item--activated" to="/about/">
                    About
                  </Link>
                  <Link className="mdc-list-item" activeClassName="mdc-list-item--activated" to="/love-text/">
                    Love Text
                  </Link>
                </nav>
              </div>
            </aside>
            <div className="mdc-drawer-app-content">
              <header className="mdc-top-app-bar app-bar" id="app-bar">
                <div className="mdc-top-app-bar__row">
                  <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button
                      href="#"
                      className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
                      onClick={this.toggleDrawer}
                    >
                      menu
                    </button>
                    <span className="mdc-top-app-bar__title">Gatsby Default Starter</span>
                  </section>
                </div>
              </header>
              <main
                className={classnames('main-content', css.mainContent)}
                id="main-content"
                onClick={this.closeDrawer}
              >
                <div className="mdc-top-app-bar--fixed-adjust">{children}</div>
              </main>
            </div>
          </>
        )}
      />
    );
  };
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
