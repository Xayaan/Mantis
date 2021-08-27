import React, { ReactElement } from 'react'

import { metamaskVideo } from '../../@types/constants'
import { useWeb3 } from '../../providers/Web3'
import Alert from '../atoms/Alert/Alert'
import { DownloadMetamaskButton } from '../atoms/Button'
import ContentContainer from '../atoms/ContentContainer'
import { FAQCollapser } from '../molecules/FAQCollapser'
import { TutorialVideo, VideoData } from '../molecules/TutorialVideo'
import styles from './DownloadMetamask.module.css'

type DownloadMetamaskViewProps = {
    errorText?: string
}

export default function DownloadMetamask({ 
  errorText
}: DownloadMetamaskViewProps): ReactElement {
    const videos: VideoData[] = [metamaskVideo]

    return (
        <>
            <Alert 
                text={errorText}
                state='guidelinesWarning' 
            />

            <ContentContainer>
                <div className={styles.downloadMetamaskButton}>
                
                    <DownloadMetamaskButton 
                        text={"Download Metamask"}
                        type={"download"}
                    />
            
                    <DownloadMetamaskButton 
                        text={"Connect Wallet"}
                        type={"connect"}
                    />

                    <div className={styles.padding}>
                        <a href={`#metamaskInfo`}>What is Metamask and why do I need it for this app?</a>
                    </div>
                    
                    <div className={styles.padding}>
                        <a href={`#troubleshooting`}>Help, I've already downloaded Metamask but "Connect Wallet" isn't working.</a>
                    </div>

                </div>
                
                <div className={styles.bottomPadding}>
                    <FAQCollapser
                        title={`How to Download Metamask`}
                        keyValue={`download`}
                    >
                        <TutorialVideo 
                            videos={videos}
                        />
                    </FAQCollapser>
                </div>

                <FAQCollapser
                    title={`What is Metamask and why do I need it for this app?`}
                    keyValue={`metamaskInfo`}
                >
                    <h4 className={styles.headerPadding}>What is Metamask?</h4>
                        Metamask is a cryptocurrency wallet app. Through Metamask, you can generate a cryptocurrency wallet or connect an existing wallet. 
                        Your Metamask wallet connects to DataUnion.app and acts as your anonymous account. 
                    <br />
                    <br />
                    <h4 className={styles.headerPadding}>Why do I need Metamask?</h4>
                        We can only give you cryptocurrency rewards if you're logged in with your Metamask account!
                </FAQCollapser>

                <FAQCollapser
                title={`Help, I've already downloaded Metamask but "Connect Wallet" isn't working.`}
                keyValue={`troubleshooting`}
                >
                <h4 className={styles.headerPadding}>Troubleshooting</h4>
                <ol>
                    <li>Please double check that you have actually downloaded Metamask by visiting your browser's extensions.</li>
                    <br/>
                    <li>Please ensure you're using the correct browser. Remember that Metamask will only work on <b>Chrome, Brave, Firefox or Edge</b>. You may have downloaded Metamask on a different browser to the one you're using.</li>
                    <br/>
                    <li>
                        <b>Please check your Metamask settings in your browser's extensions tab. If you only enable Metamask on certain sites, you need to manually enable it on this site.</b> 
                        {/* <br/><br/>
                        On Chrome:
                        <img src="../../images/metamask_tutorial.png"/> */}
                    </li>
                    <br/>
                    <img src=""/>
                </ol>
                </FAQCollapser>
            </ContentContainer> 
        </>
    )
}