// 'use client'

import Popup from '@acme/ui/components/popup'

// import useUser from '@/lib/swr/use-user'

import UserSurveyPopupInner from './user-survey-popup-inner'

export default function UserSurveyPopup() {
  // const { user } = useUser()

  return (
    // user &&
    // !user.source && (
    <Popup hiddenCookieId='hide_user_survey_popup'>
      <UserSurveyPopupInner />
    </Popup>
    // )
  )
}
