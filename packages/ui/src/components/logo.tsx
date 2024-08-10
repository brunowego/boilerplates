import type { HTMLAttributes, JSX } from 'react'

type LogoProps = HTMLAttributes<SVGElement>

const LogoMark = (props: LogoProps): JSX.Element => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 32 28'
    fill='currentColor'
    {...props}
  >
    <title>Acme</title>
    <path d='m8.21 13.74 3.944 6.828.005.01 3.937 6.82a.174.174 0 0 1-.15.26v.001H.174a.175.175 0 0 1-.145-.272l3.937-6.819.005-.009L7.91 13.74a.174.174 0 0 1 .302 0M16.584.27l7.672 13.288.009.016.008.014.002.004 7.654 13.257a.538.538 0 0 1-.431.807l-.037.003h-8.023a.2.2 0 0 1-.184-.118L17.476 17.53l-.006-.011-.001-.002.001.002c-1.58-3.194-4.006-6.93-5.835-10.095a.2.2 0 0 1 .007-.213l4.006-6.94a.54.54 0 0 1 .934-.003zm.887 17.248' />
  </svg>
)

const GitHub = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <title>GitHub</title>
    <path d='M12 2C6.478 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.683-.218.683-.482 0-.238-.01-1.026-.014-1.862-2.782.605-3.369-1.18-3.369-1.18-.455-1.155-1.11-1.463-1.11-1.463-.907-.62.068-.608.068-.608 1.004.07 1.533 1.03 1.533 1.03.892 1.53 2.34 1.088 2.91.832.09-.646.35-1.088.635-1.337-2.22-.253-4.556-1.11-4.556-4.942a3.87 3.87 0 0 1 1.03-2.684c-.103-.252-.446-1.27.097-2.647 0 0 .84-.269 2.751 1.025A9.6 9.6 0 0 1 12 6.836c.85.004 1.706.115 2.505.336 1.909-1.293 2.748-1.025 2.748-1.025.544 1.378.201 2.395.098 2.647.64.7 1.029 1.592 1.029 2.684 0 3.84-2.34 4.686-4.566 4.934.358.31.678.919.678 1.852 0 1.338-.012 2.415-.012 2.744 0 .266.18.578.687.48A10 10 0 0 0 22 12c0-5.523-4.477-10-10-10M5.745 16.245c-.022.05-.1.065-.171.03-.073-.032-.113-.1-.09-.15.022-.05.1-.065.172-.03.073.032.114.1.09.15m.492.44c-.047.043-.14.023-.204-.047-.065-.07-.078-.163-.03-.208.05-.044.14-.023.206.046.065.071.078.164.028.208m.338.56c-.062.043-.162.003-.224-.085-.06-.09-.06-.196.002-.239s.16-.004.223.084c.061.09.061.197-.001.24m.57.651c-.054.06-.171.044-.257-.038-.087-.08-.111-.195-.056-.256.055-.06.173-.043.259.039.086.08.113.195.054.255m.738.22c-.024.078-.137.114-.25.08s-.187-.126-.164-.205.136-.116.25-.08c.113.034.188.125.164.205m.84.093c.002.082-.094.15-.213.152-.12.003-.216-.064-.217-.145 0-.083.094-.151.213-.153.12-.002.216.064.216.146m.824-.032c.014.08-.068.163-.186.185-.116.022-.224-.028-.239-.108-.014-.082.07-.165.186-.186.118-.02.224.027.239.11' />
  </svg>
)

const Google = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <title>Google</title>
    <path
      fill='#4285F4'
      d='M21.6 12.222c0-.822-.067-1.422-.211-2.044H12v3.71h5.511c-.111.923-.711 2.312-2.044 3.245l-.019.125 2.968 2.3.206.02c1.89-1.745 2.978-4.311 2.978-7.356'
    />
    <path
      fill='#34A853'
      d='M12 22c2.7 0 4.967-.889 6.622-2.422l-3.155-2.445c-.845.59-1.978 1-3.467 1-2.644 0-4.889-1.744-5.689-4.155l-.117.01-3.087 2.389-.04.112A9.99 9.99 0 0 0 12 22'
    />
    <path
      fill='#FBBC05'
      d='M6.311 13.978A6.2 6.2 0 0 1 5.978 12c0-.689.122-1.356.322-1.978l-.006-.132L3.17 7.462l-.102.05A10 10 0 0 0 2 12c0 1.611.389 3.133 1.067 4.489z'
    />
    <path
      fill='#EB4335'
      d='M12 5.867c1.878 0 3.144.81 3.867 1.489L18.689 4.6C16.956 2.989 14.7 2 12 2a9.99 9.99 0 0 0-8.933 5.511L6.3 10.022c.811-2.41 3.056-4.155 5.7-4.155'
    />
  </svg>
)

const LinkedIn = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <title>LinkedIn</title>
    <path
      fill='#0A66C2'
      d='M20.518 2.001H3.476A1.46 1.46 0 0 0 2 3.443v17.114A1.46 1.46 0 0 0 3.476 22h17.042c.808.01 1.47-.636 1.482-1.443V3.442A1.463 1.463 0 0 0 20.518 2'
    />
    <path
      fill='#fff'
      d='M19.04 19.041h-2.962v-4.64c0-1.107-.02-2.532-1.542-2.532-1.543 0-1.78 1.206-1.78 2.45v4.722H9.794V9.497h2.845v1.305h.04a3.12 3.12 0 0 1 2.807-1.542c3.003 0 3.557 1.976 3.557 4.546zM6.45 8.193a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44m1.48 10.848H4.965V9.497H7.93z'
    />
  </svg>
)

export { LogoMark, GitHub, Google, LinkedIn }
