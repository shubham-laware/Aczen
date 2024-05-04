import CSSModules from 'react-css-modules'
import config from 'helpers/externalConfig'
import styles from '../Footer.scss'

type ServiceLinksProps = {
  versionName: string | null
  versionLink: string | null
}

function ServiceLinks({ versionName, versionLink }: ServiceLinksProps) {
  const serviceLink = config?.opts?.ui?.serviceLink || 'https://onout.org/wallet'

  return (
    <div styleName="serviceLinks">
      {versionName && versionLink && (
        <span>
          <a href={versionLink} target="_blank" rel="noreferrer">
          ACZ2024
          </a>
        </span>
      )}
     
    </div>
  )
}

export default CSSModules(ServiceLinks, styles, { allowMultiple: true })
