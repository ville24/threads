import React from 'react'
import PropTypes from 'prop-types'

import TabButton from './TabButton'

const NewsTabs = (props) => <>
  <div>
    {
      props.tabList.map((tab) => {

        const style = tab === props.tab
          ? 'btn btn-selected'
          : 'btn'
        return <TabButton
          key={tab}
          style={style}
          title={tab}
          name={props.type}
          value={tab}
          handleClick={props.handleClick}
        />

      })
    }
  </div>
</>

NewsTabs.propTypes = {
  type: PropTypes.string.isRequired,
  tab: PropTypes.string.isRequired,
  tabList: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default NewsTabs
