import { Elysia, t } from 'elysia'

export const getHealth = new Elysia().group('/-', (app) =>
  app
    .get(
      '/liveness',
      () => {
        return { status: 'ok' }
      },
      {
        response: t.Object({
          status: t.String(),
        }),
      },
    )

    .get(
      '/readiness',
      () => {
        return { status: 'ok' }
      },
      {
        response: t.Object({
          status: t.String(),
        }),
      },
    )

    .get(
      '/ping',
      () => {
        return { message: 'pong', now: Math.floor(Date.now() / 1000) }
      },
      {
        response: t.Object({
          message: t.String(),
          now: t.Number(),
        }),
      },
    ),
)
