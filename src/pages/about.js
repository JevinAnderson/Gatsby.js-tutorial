import React, { Component, createRef } from 'react'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import waitForGlobal from '../utils/wait-for-global'

export class About extends Component {
  buttonRef = createRef()

  componentDidMount() {
    waitForGlobal('mdc').then(this.addRipple)
  }

  addRipple = mdc => {
    if (this.buttonRef.current) {
      mdc.ripple.MDCRipple.attachTo(this.buttonRef.current)
    }
  }

  render = () => (
    <Layout>
      <h2>About Jevin Anderson</h2>
      <pre>{JSON.stringify(this.props, null, 2)}</pre>
      <Link to="/">
        <button className="mdc-button mdc-button--raised" ref={this.buttonRef}>
          <i className="material-icons mdc-button__icon">arrow_back</i>
          Back
        </button>
      </Link>
    </Layout>
  )
}

export default About
