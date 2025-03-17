import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable  = forwardRef((props,refs) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = {display: visible? 'none' : ''}
    const showWhenVisible = {display: visible? '' : 'none'}

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs,() => {
        return {toggleVisible,visible}
    })

    return (
        <div>
            <div style={hiddenWhenVisible}>
                <button onClick={toggleVisible}>{props.label}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
  label: PropTypes.string.isRequired
}
Toggleable.displayName = 'Toggle'

export default Toggleable