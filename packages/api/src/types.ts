import type { User, Session } from '@acme/auth'

// export type Bindings = {
//   db:
// }

export type Variables = {
  user: User
  session: Session
}
