import React from 'react'
import { connect } from 'app/actions'

const Layout = (props) => {
  let errors = props.errors.message ? <div className="card errors">{props.errors.message}</div> : null
  return (
    <div className="layout">
      {errors}
      {React.cloneElement(props.children, props)}
    </div>
  )
}

export default connect(Layout)
