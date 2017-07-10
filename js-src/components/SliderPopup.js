import React from 'react'
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

class SliderPopup extends React.Component {
  componentWillMount () {
    document.body.classList.add('locked')
  }

  componentWillUnmount () {
    document.body.classList.remove('locked')
  }

  render () {
    return (
      <ReactCSSTransitionGroup
        transitionName='slide'
        transitionAppear
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppearTimeout={1000}
      >
        <div className='side-popup-wrap'>

          <div className='side-popup'>

            {this.props.children}

          </div>

        </div>

      </ReactCSSTransitionGroup>
    )
  }
}

module.exports = SliderPopup
