import React from 'react'

import Icon from './Icon'

const Spinner = () => <div style={{
  width: '100%',
  textAlign: 'center'
}}>
  <span style={{
    display: 'block',
    height: '6em'
  }}/>
  <Icon type="spinner" />
</div>

export default Spinner
