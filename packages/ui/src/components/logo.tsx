import type { HTMLAttributes } from 'react'

type LogoProps = HTMLAttributes<SVGElement>

const LogoMark = (props: LogoProps) => (
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

const Apple = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <title>Apple</title>
    <path d='M19.764 7.819c-.116.09-2.165 1.244-2.165 3.81 0 2.968 2.607 4.019 2.685 4.045-.012.064-.414 1.438-1.374 2.838-.857 1.232-1.75 2.462-3.11 2.462-1.361 0-1.711-.79-3.281-.79-1.53 0-2.074.816-3.318.816s-2.113-1.14-3.11-2.54C4.933 16.816 4 14.26 4 11.837c0-3.888 2.528-5.95 5.017-5.95 1.322 0 2.424.868 3.254.868.79 0 2.022-.92 3.526-.92.57 0 2.618.051 3.967 1.984m-4.68-3.63c.621-.739 1.061-1.763 1.061-2.787A2 2 0 0 0 16.107 1c-1.012.038-2.216.674-2.942 1.516-.57.648-1.102 1.672-1.102 2.71 0 .156.026.312.038.362.064.012.168.026.272.026.908 0 2.05-.608 2.71-1.426' />
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

const MercadoPago = (props: LogoProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <title>Mercado Pago</title>
    <path
      fill='#0A0080'
      d='M22 11.516C22 7.923 17.509 5 12 5 6.467 5 2 7.923 2 11.516v.372C2 15.703 5.92 18.8 12 18.8c6.13 0 10-3.097 10-6.912z'
    />
    <path
      fill='#2ABCFF'
      d='M21.603 11.516c0 3.394-4.293 6.144-9.603 6.144s-9.603-2.75-9.603-6.144S6.69 5.372 12 5.372c5.31.024 9.603 2.75 9.603 6.144'
    />
    <path
      fill='#fff'
      d='M8.799 9.583s-.1.1-.05.199c.15.198.62.297 1.092.198.273-.074.645-.347.993-.62.372-.297.744-.594 1.141-.718s.645-.074.819-.025c.199.05.397.174.745.446.67.496 3.3 2.8 3.746 3.196.373-.173 2.01-.867 4.219-1.363-.15-1.189-.869-2.279-1.96-3.17-1.514.643-3.375.966-5.212.074 0 0-.992-.471-1.96-.446-1.439.024-2.06.669-2.73 1.313z'
    />
    <path
      fill='#fff'
      d='M17.21 12.482c-.024-.024-3.1-2.725-3.796-3.245-.397-.298-.62-.372-.868-.422a.83.83 0 0 0-.422.05c-.322.1-.744.372-1.117.669-.397.322-.769.595-1.091.669-.422.124-.968 0-1.216-.149-.1-.074-.174-.148-.199-.223-.099-.198.075-.371.1-.396l.843-.917.298-.297c-.273.025-.521.099-.77.173-.297.075-.595.174-.893.174-.124 0-.794-.1-.918-.149-.769-.198-1.439-.421-2.456-.892-1.216.892-2.01 2.007-2.234 3.246.174.05.447.124.571.148 2.73.595 3.573 1.24 3.747 1.363a.94.94 0 0 1 .67-.297c.298 0 .57.148.744.396.15-.124.373-.223.646-.223.124 0 .248.025.397.075a.9.9 0 0 1 .546.495q.149-.075.372-.074c.149 0 .297.024.446.099.497.223.571.718.546 1.09h.1a1.1 1.1 0 0 1 1.092 1.09c0 .173-.05.347-.125.52.174.1.571.298.943.248.298-.025.397-.124.447-.198.025-.05.05-.075.025-.124l-.77-.867s-.124-.124-.074-.173c.05-.05.124.024.174.074.397.322.868.817.868.817s.05.075.224.1c.148.024.421 0 .62-.15.05-.049.1-.098.124-.148.198-.248-.025-.495-.025-.495l-.893-1.016s-.124-.124-.074-.173c.05-.05.123.024.173.074q.545.496 1.067 1.016c.075.05.422.272.869-.025a.63.63 0 0 0 .322-.57.63.63 0 0 0-.198-.372l-1.241-1.239s-.124-.099-.074-.173c.05-.05.124.025.173.074.397.322 1.464 1.289 1.464 1.289.025 0 .372.272.844-.025a.49.49 0 0 0 .273-.446.94.94 0 0 0-.273-.47'
    />
    <path
      fill='#fff'
      d='M11.256 14.043c-.199 0-.398.1-.422.1-.025 0 0-.075.024-.125.025-.05.274-.793-.347-1.065-.471-.198-.744.025-.844.124-.024.025-.05.025-.05 0a.67.67 0 0 0-.47-.62c-.571-.173-.944.223-1.043.372-.05-.322-.322-.595-.67-.595a.669.669 0 1 0 .472 1.14v.025c-.025.173-.075.768.546 1.016.248.099.471.025.645-.1.05-.049.05-.024.05.025-.025.15 0 .496.47.67.348.148.571 0 .695-.124.05-.05.075-.05.075.05a.843.843 0 0 0 .844.792.836.836 0 0 0 .843-.842c.025-.446-.347-.818-.818-.843'
    />
    <path
      fill='#0A0080'
      d='M17.335 12.16c-.943-.818-3.151-2.725-3.722-3.171-.348-.248-.57-.397-.77-.446a1.5 1.5 0 0 0-.843.025c-.372.124-.77.42-1.141.718l-.025.025c-.348.272-.695.545-.968.62-.124.024-.248.049-.347.049-.298 0-.571-.1-.67-.223-.025-.025 0-.05.024-.1l.82-.94c.645-.645 1.265-1.264 2.68-1.289h.074c.893 0 1.761.396 1.86.446.844.396 1.688.595 2.556.595.894 0 1.812-.223 2.805-.67-.1-.098-.224-.173-.348-.272-.844.372-1.662.545-2.457.545a5.5 5.5 0 0 1-2.382-.57c-.05-.025-1.017-.47-2.034-.47h-.075c-1.19.024-1.86.445-2.307.817-.447 0-.82.124-1.167.223-.297.075-.57.149-.819.149h-.297c-.298 0-1.762-.372-2.928-.818-.124.074-.224.174-.348.273 1.216.495 2.705.892 3.176.916.124 0 .273.025.397.025.298 0 .62-.074.918-.173.174-.05.373-.1.571-.149l-.173.174-.844.916c-.075.075-.223.248-.124.471.05.1.124.173.223.248.199.124.57.223.893.223.124 0 .248 0 .348-.05.347-.074.72-.371 1.117-.694.322-.247.769-.57 1.091-.668.1-.025.223-.05.298-.05h.075c.223.025.446.1.843.396.695.52 3.772 3.221 3.797 3.246 0 0 .198.173.173.446 0 .149-.099.297-.248.397a.8.8 0 0 1-.397.123c-.198 0-.347-.099-.347-.099s-1.067-.966-1.464-1.288c-.05-.05-.124-.1-.174-.1-.025 0-.05.025-.074.05-.05.075 0 .174.099.248l1.24 1.239s.15.149.174.322q0 .297-.298.52a.8.8 0 0 1-.446.149c-.199 0-.323-.074-.348-.1l-.173-.173c-.323-.322-.645-.644-.894-.842-.05-.05-.123-.1-.173-.1-.025 0-.05 0-.075.026s-.05.099.025.173q.02.04.05.074l.893 1.016s.174.223.025.422l-.025.049-.074.074a.73.73 0 0 1-.447.149h-.124c-.1-.025-.149-.05-.174-.074-.05-.05-.496-.52-.868-.818-.05-.05-.1-.1-.174-.1-.025 0-.05 0-.074.026-.075.074.05.198.074.247l.77.843s0 .024-.025.05c-.025.049-.125.123-.397.173h-.1c-.298 0-.595-.149-.744-.223.074-.149.1-.322.1-.496 0-.62-.522-1.14-1.142-1.14h-.05c.025-.297-.025-.842-.57-1.065a1.1 1.1 0 0 0-.472-.099.8.8 0 0 0-.348.074c-.124-.223-.297-.396-.57-.47a1.3 1.3 0 0 0-.422-.075 1.23 1.23 0 0 0-.645.199 1 1 0 0 0-.745-.372c-.248 0-.496.1-.695.273-.248-.174-1.19-.793-3.722-1.363-.124-.025-.397-.1-.57-.149-.025.149-.05.273-.075.421 0 0 .472.124.57.124 2.582.57 3.45 1.165 3.599 1.288a.968.968 0 0 0 .893 1.338c.05 0 .124 0 .174-.024.074.396.347.694.72.842.124.05.223.074.347.074.074 0 .149 0 .223-.024.075.173.248.42.596.57q.186.074.372.074c.1 0 .199-.025.298-.05.174.422.595.719 1.067.719.297 0 .595-.124.819-.347.173.099.57.297.967.297h.15c.396-.05.57-.198.645-.322.024-.025.024-.05.05-.074.098.025.198.05.297.05.223 0 .422-.075.62-.224.199-.148.348-.347.372-.545a.6.6 0 0 0 .199.025c.223 0 .447-.074.645-.198.397-.273.472-.595.472-.818.074.025.148.025.223.025.198 0 .397-.074.595-.173a.87.87 0 0 0 .422-.67.85.85 0 0 0-.124-.545c.67-.297 2.184-.842 3.995-1.238 0-.149-.025-.273-.05-.421-2.158.396-3.771 1.09-4.193 1.263m-6.08 3.518a.79.79 0 0 1-.794-.743c0-.025 0-.124-.074-.124-.025 0-.05.025-.1.05-.099.074-.223.173-.371.173a1 1 0 0 1-.248-.05c-.447-.173-.447-.495-.422-.619 0-.025 0-.074-.025-.099l-.025-.025h-.025c-.025 0-.05 0-.074.025-.15.1-.273.149-.397.149a.7.7 0 0 1-.224-.05c-.595-.223-.545-.793-.52-.941 0-.025 0-.05-.025-.074l-.05-.025-.05.05a.7.7 0 0 1-.422.173.614.614 0 0 1-.62-.62c0-.347.273-.62.62-.62.298 0 .571.224.596.521l.025.173.1-.148c-.001-.025.247-.396.719-.396.074 0 .173.024.273.05.372.098.421.445.421.569 0 .074.075.074.075.074.025 0 .05-.025.074-.025a.63.63 0 0 1 .447-.198c.1 0 .223.025.347.074.571.248.323.967.323.992-.05.123-.05.173 0 .198h.05c.024 0 .05 0 .099-.025.074-.025.198-.074.298-.074.422 0 .794.347.794.793a.783.783 0 0 1-.794.792'
    />
  </svg>
)

const PayPal = (props: LogoProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <title>PayPal</title>
    <path
      fill='#001C64'
      d='M19.972 11.207c-.457 2.606-2.584 4.576-5.374 4.576h-1.771c-.362 0-.726.335-.783.705l-.776 4.924c-.045.28-.176.373-.46.373h-2.85c-.288 0-.356-.096-.313-.38L7.972 18l-3.42-.177c-.287 0-.392-.157-.35-.444L6.534 2.582c.045-.28.22-.4.502-.4h5.919c2.849 0 4.65 1.917 4.871 4.404 1.695 1.145 2.488 2.669 2.145 4.62z'
    />
    <path
      fill='#0070E0'
      d='M8.84 12.486 7.972 18l-.548 3.46a.47.47 0 0 0 .461.54h3.01a.58.58 0 0 0 .57-.487l.791-5.026a.58.58 0 0 1 .57-.487h1.771a5.66 5.66 0 0 0 5.588-4.793c.307-1.957-.678-3.74-2.364-4.62a4.5 4.5 0 0 1-.054.623A5.66 5.66 0 0 1 12.18 12H9.408a.576.576 0 0 0-.569.486'
    />
    <path
      fill='#003087'
      d='M7.972 18H4.468a.47.47 0 0 1-.463-.542l2.362-14.97A.576.576 0 0 1 6.936 2h6.017c2.848 0 4.92 2.073 4.871 4.585A5.26 5.26 0 0 0 15.371 6h-5.017a.58.58 0 0 0-.57.487l-.945 6z'
    />
  </svg>
)

const Pix = (props: LogoProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <title>Pix</title>
    <path
      fill='#32BCAD'
      d='M17.597 17.3a2.92 2.92 0 0 1-2.077-.86l-3-3a.57.57 0 0 0-.788 0L8.72 16.45a2.92 2.92 0 0 1-2.078.86h-.59l3.799 3.8a3.04 3.04 0 0 0 4.297 0l3.81-3.81zM6.643 6.69a2.92 2.92 0 0 1 2.078.86l3.01 3.01a.56.56 0 0 0 .789 0l3-3a2.92 2.92 0 0 1 2.077-.86h.362l-3.81-3.81a3.04 3.04 0 0 0-4.297 0l-3.8 3.8z'
    />
    <path
      fill='#32BCAD'
      d='m21.11 9.852-2.302-2.303a.4.4 0 0 1-.164.033h-1.047c-.541 0-1.07.22-1.453.602l-3 3c-.28.28-.65.421-1.018.421-.369 0-.737-.14-1.018-.42L8.097 8.172a2.07 2.07 0 0 0-1.454-.602H5.356a.4.4 0 0 1-.154-.031L2.89 9.852a3.04 3.04 0 0 0 0 4.296L5.2 16.46a.4.4 0 0 1 .155-.031h1.287c.542 0 1.071-.22 1.454-.602l3.01-3.011c.545-.544 1.494-.544 2.037 0l3 3a2.07 2.07 0 0 0 1.453.602h1.047q.087.002.164.033l2.302-2.303a3.04 3.04 0 0 0 0-4.296'
    />
  </svg>
)

const Revolut = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <title>Revolut</title>
    <path
      // fill='#191C1F'
      d='M7.716 6.908H4v15.046h3.716z'
    />
    <path
      // fill='#191C1F'
      d='M19.413 7.78c0-3.211-2.615-5.78-5.78-5.78H4v3.211h9.128c1.468 0 2.661 1.147 2.661 2.523 0 .688-.23 1.376-.734 1.88a2.57 2.57 0 0 1-1.835.78H9.642c-.137 0-.23.092-.23.23v2.844c0 .046 0 .092.047.137L15.514 22h4.403l-6.009-8.44c3.028-.138 5.505-2.707 5.505-5.78'
    />
  </svg>
)

const Wise = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <title>Wise</title>
    <path d='M7.401 7.714 2 14.054h9.667l1.096-2.974H8.614l2.544-2.935v-.078L9.516 5.249h7.397L11.16 21.022h3.913L22 2H4.114z' />
  </svg>
)

export {
  LogoMark,
  GitHub,
  Google,
  Apple,
  MercadoPago,
  PayPal,
  Pix,
  Revolut,
  Wise,
}
