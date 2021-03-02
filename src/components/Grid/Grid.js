import React from 'react'
import cn from 'classnames'
import { grid } from './Grid.module.css'

// TODO: expand to preset columns
const Grid = ({ children, className, ...rest }) => (
  <div className={cn(grid, className)} {...rest}>
    {children}
  </div>
)

export default Grid
