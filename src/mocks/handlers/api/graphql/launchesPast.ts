import { graphql } from 'msw'

const mockedlaunchesPast = [
  {
    mission_name: 'Starlink-15 (v1.0)',
    launch_site: {
      site_name_long: 'Cape Canaveral Air Force Station Space Launch Complex 40',
    },
    links: {
      video_link: 'https://youtu.be/J442-ti-Dhg',
    },
  },
  {
    mission_name: 'Sentinel-6 Michael Freilich',
    launch_site: {
      site_name_long: 'Vandenberg Air Force Base Space Launch Complex 4E',
    },
    links: {
      video_link: 'https://youtu.be/aVFPzTDCihQ',
    },
  },
  {
    mission_name: 'Crew-1',
    launch_site: {
      site_name_long: 'Kennedy Space Center Historic Launch Complex 39A',
    },
    links: {
      video_link: 'https://youtu.be/bnChQbxLkkI',
    },
  },
  {
    mission_name: 'GPS III SV04 (Sacagawea)',
    launch_site: {
      site_name_long: 'Cape Canaveral Air Force Station Space Launch Complex 40',
    },
    links: {
      video_link: 'https://youtu.be/wufXF5YKR1M',
    },
  },
]

export const launchesPastHandlers = [
  graphql.query('LaunchesPast', (_, res, ctx) => {
    return res(
      ctx.data({
        launchesPast: mockedlaunchesPast,
      })
    )
  }),
]
