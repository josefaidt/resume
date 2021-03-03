import React from 'react'
import { motion } from 'framer-motion'
// import { useCurrentTheme } from '../../helpers/ThemeContext'
import { useNotifications } from '../../helpers/NotificationContext'
import NotificationToast from '../NotificationToast/NotificationToast'
import { container, toast } from './NotificationContainer.module.css'

const NotificationContainer = ({ children, notifications }) => {
  const [notificationState, notificationDispatch] = useNotifications()
  const onClose = notificationId => {
    return notificationDispatch({ type: 'toast_shown', payload: { id: notificationId } })
  }
  return (
    <div className={container}>
      {children}
      {notificationState.length > 0 &&
        notificationState.map((n, i) => {
          return (
            <motion.div
              animate={{ x: -10, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 1 }}
              key={n.id}
            >
              {!n.__internal.toast_shown ? (
                <NotificationToast className={toast} data={n} onClose={onClose} />
              ) : null}
            </motion.div>
          )
        })}
    </div>
  )
}

NotificationContainer.defaultProps = {
  notifications: [],
}

export default NotificationContainer
