import { useCallback, useEffect, useState, useRef } from 'react'
import { HeadlessService } from '@novu/headless'

// import { createClient } from '@midday/supabase/client'
// import { getUserQuery } from '@midday/supabase/queries'

export function useNotifications() {
  // const supabase = createClient()
  const [isLoading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const [subscriberId, setSubscriberId] = useState()
  const headlessServiceRef = useRef<HeadlessService>()

  const markAllMessagesAsRead = () => {
    const headlessService = headlessServiceRef.current

    if (headlessService) {
      // @ts-ignore
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => {
          return {
            // @ts-ignore
            ...notification,
            read: true,
          }
        }),
      )

      headlessService.markAllMessagesAsRead({
        listener: () => {},
        onError: () => {},
      })
    }
  }

  const markMessageAsRead = (messageId: string) => {
    const headlessService = headlessServiceRef.current

    if (headlessService) {
      // @ts-ignore
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => {
          // @ts-ignore
          if (notification.id === messageId) {
            return {
              // @ts-ignore
              ...notification,
              read: true,
            }
          }

          return notification
        }),
      )

      headlessService.markNotificationsAsRead({
        messageId: [messageId],
        listener: (result) => {},
        onError: (error) => {},
      })
    }
  }

  const fetchNotifications = useCallback(() => {
    const headlessService = headlessServiceRef.current

    if (headlessService) {
      headlessService.fetchNotifications({
        // biome-ignore lint/correctness/noEmptyPattern: empty pattern is needed for type inference
        listener: ({}) => {},
        onSuccess: (response) => {
          setLoading(false)
          // @ts-ignore
          setNotifications(response.data)
        },
      })
    }
  }, [])

  const markAllMessagesAsSeen = () => {
    const headlessService = headlessServiceRef.current

    if (headlessService) {
      // @ts-ignore
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          // @ts-ignore
          ...notification,
          seen: true,
        })),
      )

      headlessService.markAllMessagesAsSeen({
        listener: () => {},
        onError: () => {},
      })
    }
  }

  useEffect(() => {
    async function fetchUser() {
      // const {
      //   data: { session },
      // } = await supabase.auth.getSession()

      // const { data: userData } = await getUserQuery(supabase, session?.user?.id)
      const userData = {
        id: '1',
        team_id: '1',
      }

      if (userData) {
        // @ts-ignore
        setSubscriberId(`${userData.team_id}_${userData.id}`)
      }
    }

    fetchUser()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: headlessServiceRef.current is not a dependency
  useEffect(() => {
    const headlessService = headlessServiceRef.current

    if (headlessService) {
      headlessService.listenNotificationReceive({
        listener: () => {
          fetchNotifications()
        },
      })
    }
  }, [headlessServiceRef.current])

  useEffect(() => {
    if (subscriberId && !headlessServiceRef.current) {
      const headlessService = new HeadlessService({
        applicationIdentifier: process.env
          .NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER as string,
        subscriberId,
      })

      headlessService.initializeSession({
        listener: () => {},
        onSuccess: () => {
          headlessServiceRef.current = headlessService
          fetchNotifications()
        },
        onError: () => {},
      })
    }
  }, [fetchNotifications, subscriberId])

  return {
    isLoading,
    markAllMessagesAsRead,
    markMessageAsRead,
    markAllMessagesAsSeen,
    hasUnseenNotificaitons: notifications.some(
      // @ts-ignore
      (notification) => !notification.seen,
    ),
    notifications,
  }
}
