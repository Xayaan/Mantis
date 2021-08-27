import { PageProps } from 'gatsby'
import { Link } from "gatsby"
import React, { ReactElement } from 'react'
import { Helmet } from "react-helmet"

import { connectVideo, metamaskVideo, welcomeVideo } from '../@types/constants'
import Alert from '../components/atoms/Alert/Alert'
import { DownloadMetamaskButton } from '../components/atoms/Button'
import ContentContainer from '../components/atoms/ContentContainer'
import { FAQCollapser } from '../components/molecules/FAQCollapser'
import { TutorialVideo, VideoData } from '../components/molecules/TutorialVideo'
import Challenge from '../components/organisms/Challenge'
import Page from '../components/templates/Page'
import { useAuthContext } from '../providers/AuthProvider'
import { useWeb3 } from '../providers/Web3'
import styles from './index.module.css'

const WelcomeContent = () => {
  return (
    <div className={styles.leftAlign}>
        <p>
          Welcome to DataUnion.app’s web app Mantis. Currently we are in alpha state. 
          We want to show that a community of contributors can create more ethical, more diverse data. 
          We are solving bias and giving ownership of datasets back to the contributors. 
          Join us on our journey and contribute your data. To get started checkout <Link to="/#challenges">the challenge rules</Link>, <Link to="/bounties">the data bounties</Link> and <Link to="/tutorials">checkout the tutorials.</Link></p>
    </div>
  )
}

const ChallengeContent = () => {
  return (
    <div className={styles.leftAlign}>
        <p>There are three challenges starting from 15.05.2021 - until 15.08.2021 - to incentivise the use of our platform and to create a foundation of the <a href="https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38">DataUnion.app Image Data Vault</a>. This data will power our Data Portal that we are currently developing - the window onto the data for buyers and contributors.
        <br/><br/>
        The rules for the challenges are that either the following criteria are fullfilled or three month have passed. In either case we will then check the submissions for fraud and if necessary disqualify participants - fraud would be purposly wrong, random or upload rule violating contributions. <b>All tags and descriptions have to be in English for now.</b></p>
        <ul className={styles.list}>
          <li>Upload challenge: 1.000.000 images have been uploaded</li>
          <li>Annotation challenge: 3.000.000 descriptions and 7.000.000 tags have been created</li>
          <li>Verification challenge: 200.000.000 upvotes and downvotes have been cast</li>
        </ul>
        <p><br></br>For each category <a href="https://etherscan.io/token/0x7Bce67697eD2858d0683c631DdE7Af823b7eea38?a=0x655efe6eb2021b8cefe22794d90293aec37bb325">20 QUICRA-0 datatokens are reserved</a> as rewards. First come, first serve. In <Link to="myDashboard">your stats page</Link> you can see how many of those are attributed to you. We reserve the right to change these rules if unexpected events force us to do so.
        </p>
    </div>
  )
}

const NewsContent = () => {
  return (
    <div className={styles.leftAlign}>
        <p>Starting from 15.05.2021 we are covered by Ocean Protocol in a Ocean Shipyard Spotlight - check that out and like & retweet to give us exposure. These are the tweets:</p>
        <ul className={styles.list}>
          <li><a href="https://twitter.com/oceanprotocol/status/1393505667462348800" target="_blank">Welcome to the DataUnion.app Ocean Shipyard Spotlight</a></li>
        </ul>
    </div>
  )
}

export default function PageGatsbyHome(props: PageProps): ReactElement {
  const { notLoggedInError } = useAuthContext()
  // const { noMetamaskDownloaded } = useWeb3()

  const challengesOngoing: boolean = true
  const videos: VideoData[] = [metamaskVideo]

  return (
    <Page
      title={"Mantis"}
      description={"DataUnion's curation tools for Computer Vision data. Earn crypto rewards for participating in challenges!"}
      uri={props.uri}
      noPageHeader={false}
      headerCenter
    >
      <Helmet>
        <title>DataUnion.app Mantis</title>
        <meta name="description" content="Welcome to DataUnion.app's computer vision upload, annotation and verification tool. Earn datatokens in challenges, data bounties and long term royalties." />
      </Helmet>

      {/* {notLoggedInError && notLoggedInError !== `Please accept DataUnion's Guidelines.` && (
        <ContentContainer>
          <Alert text={notLoggedInError} state="error" />
          
          {noMetamaskDownloaded ? (
            <>
            <div className={styles.padding}>
              <DownloadMetamaskButton 
                text={"Download Metamask"}
                type={"download"}
              />
            </div>

            <div className={styles.padding}>
              <a href={`#metamaskInfo`}>What is Metamask and why do I need it for this app?</a>
            </div>

            <div className={styles.padding}>
              <a href={`#troubleshooting`}>Help, I've already downloaded Metamask but it still says "no Metamask extension detected".</a>
            </div>
            </>
          ) : (
            <>
            <div className={styles.padding}>
              <DownloadMetamaskButton 
                text={"Connect Wallet"}
                type={"connect"}
              />
            </div>

            <div className={styles.padding}>
              <a href={`#metamaskInfo`}>What is Metamask and why do I need it for this app?</a>
            </div>
            </>
          )}

          <FAQCollapser
            title={`How to Download Metamask`}
            keyValue={`metamaskDownload`}
          >
            <TutorialVideo videos={videos} />
          </FAQCollapser>

          <FAQCollapser
            title={`What is Metamask and why do I need it for this app?`}
            keyValue={`metamaskInfo`}
          >
            <h4 className={styles.headerPadding}>What is Metamask?</h4>
            Metamask is a cryptocurrency wallet app. Through Metamask, you can generate a wallet on the Ethereum blockchain. 
            Your Metamask wallet connects to DataUnion.app and acts as your anonymous account. 
            <br />
            <br />
            <h4 className={styles.headerPadding}>Why do I need Metamask?</h4>
            We can only give you cryptocurrency rewards if you're logged in with your Metamask account!
          </FAQCollapser>

          {noMetamaskDownloaded && (
            <FAQCollapser
              title={`Help, I've already downloaded Metamask but it still says "no Metamask extension detected".`}
              keyValue={`troubleshooting`}
            >
              <h4 className={styles.headerPadding}>Troubleshooting</h4>
              <ol>
                <li>Please double check that you have actually downloaded Metamask by visiting your browser's extensions.</li>
                <li>Please ensure you're using the correct browser. Remember that Metamask will only work on Chrome, Brave or Firefox. You may have downloaded Metamask on a different browser to the one you're using.</li>
                <li>Please check your Metamask settings in your browser's extensions tab. If you only enable Metamask on certain sites, you need to manually enable it on this site.</li>
              </ol>
            </FAQCollapser>
          )} 
        </ContentContainer>
      )} */}

      <ContentContainer>
        <div className={styles.padding}>
          <Link className={styles.tutorialLink} to={`#welcome`}>
            Welcome
          </Link>
          <Link className={styles.tutorialLink} to={`#challenges`}>
            About the Challenges
          </Link>
          <Link className={styles.tutorialLink} to={`#viewChallenges`}>
            View Challenges
          </Link>
        </div>

        <FAQCollapser
          title={`Welcome!`}
          keyValue={`welcome`}
        >
          <WelcomeContent/>

          <TutorialVideo
            videos={[welcomeVideo]}
          />
        </FAQCollapser>

        <FAQCollapser
          title={`Challenges`}
          keyValue={`challenges`}
        >
          <ChallengeContent/>
        </FAQCollapser>

      </ContentContainer>

      <div id={`viewChallenges`}>
        <Challenge
          title={"Upload & Annotation Challenge"}
          description={"Earn crypto rewards for uploading images. The more detail you provide via descriptions and tags, the more you earn."}
          linkTo={"/upload"}
        />

        <Challenge 
          title={"Annotation & Verification Challenge"}
          description={"Earn crypto rewards for verifying other users' descriptions and tags as well as adding better descriptions or missing tags."}
          linkTo={"/verify"}
        />
      </div>
    
    </Page>
  )
}
