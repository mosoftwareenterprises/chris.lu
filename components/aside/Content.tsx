import styles from './content.module.css'
import BaseLink from '@/components/base/Link'
import ShareButton from '@/components/base/button/Share'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug, faComments } from '@fortawesome/free-solid-svg-icons'
import ImageBuyMeACoffee from '@/components/base/image/BuyMeACoffee'
import buyMeACoffeeImport from '/public/assets/images/buy_me_a_coffee_button.png'

const AsideContent: React.FC = (): JSX.Element => {

    return (
        <div className={styles.content}>
            <ShareButton />
            <a href="https://www.buymeacoffee.com/chriswwweb" className='shake'>
                <ImageBuyMeACoffee staticImport={buyMeACoffeeImport} alt="button buy me a coffee" />
            </a>
            <br />
            <span className="fontDarker">* Please 😉</span>
            <p className="fontSmall fontDarker alignLeft">Donations are not mandatory but greatly appreciated, as they allow me to work on more content (like the one on this page)</p>
            <p className="fontSmall fontDarker alignLeft"><FontAwesomeIcon icon={faBug} size="1x" color='rgb(255, 0, 170)' /> If you find a bug / typo or you want to suggest a new feature, then please open an <BaseLink href="https://github.com/chrisweb/chris.lu/issues">Issue</BaseLink> on GitHub.</p>
            <p className="fontSmall fontDarker alignLeft"><FontAwesomeIcon icon={faComments} size="1x" color='rgb(255, 0, 170)' /> Suggestions and Ideas are appricated, please use the <BaseLink href="https://github.com/chrisweb/chris.lu/discussions">discussion board</BaseLink> to leave feedback or ask a question.</p>
        </div>
    )
}

export default AsideContent