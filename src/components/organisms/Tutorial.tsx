import React, { ReactElement } from 'react'

import { metamaskVideo, uploadVideo, verifyVideo, statsVideo } from '../../@types/constants'
import { FAQCollapser } from '../molecules/FAQCollapser'
import { TutorialVideo } from '../molecules/TutorialVideo'
import styles from './Tutorial.module.css'
import { Link } from "gatsby"

type TutorialProps = {}

const WhyContent = () => {
  return (
    <div className={styles.leftAlign}>
        <p>Data is valuable because it allows data scientists to build machine learning algorithms that solve big and small problems. Photos are a type of data.
        The more detailed and organized data is, the more valuable it becomes. And especially if there is a lot of it. This is why DataUnion.app rewards you not just for uploading images, but for annotating and verifying them as well.<br></br>
        Some examples of problems you can help solve by contributing data: </p>
        <ul className={styles.list}>
            <li>Fixing bias in facial-recognition algorithms <a href={`https://ai.facebook.com/blog/how-were-using-fairness-flow-to-help-build-ai-that-works-better-for-everyone`} target="_blank">[x]</a></li>
            <li>Fixing bias in other algorithms <a href={`https://www.ajl.org/`} target="_blank">[x]</a></li>
            <li>Self-driving vehicles <a href={`https://evotegra.de`} target="_blank">[x]</a></li>
            <li>Litter collection <a href={`https://project.bb`} target="_blank">[x]</a></li>
            <li>Improving the Food Supply Chain <a href={`https://apfoodonline.com/industry/food-thought-machine-vision-revolutionising-food-beverage-industry/`} target="_blank">[x]</a></li>
        </ul>
        <br />
        <br />
        <p>To read more about DataUnion.app's mission and technical goals, visit <a href={`https://dataunion.app/`} target="_blank">our website.</a></p>
    </div>
  )
}

const WhereContent = () => {
  return (
    <div className={styles.leftAlign}>
        <p>Your photos, annotations and verifications are contributing to the <a href={`https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38`} target="_blank">DataUnion.app Image Data Vault</a> which is being sold on the Ocean Marketplace.</p>
        <p>
          QUICRA-0 Tokens (short for Quiescient Crab Tokens)
          The QUICRA-0 datatokens you earn for contributing, are shares in this dataset. These can either be traded for Ocean Protocol tokens ($OCEAN) and from there to many other tokens. They can be also staked in the liquidity pool and generate rewards for the usage of the dataset that you contributed to.
        </p>
        <br />
        <p>To read more about DataUnion.app's mission and technical goals, visit <a href={`https://dataunion.app/`} target="_blank">our website.</a></p>
    </div>
  )
}

const Explanation = () => {
  return (
    <div className={styles.leftAlign}>
      <ul>
        <li>
          <b>Uploading Images: </b>
          The first option to gain rewards is to upload images. This is called <i><b>Images Uploaded</b></i> in the statistics.
          Uploading images is straightforward except you are not allowed to upload similar images - your image is checked on the server for duplicates (hence why uploads take time).
          Uploading Images gives the most rewards. You can do this in the <a href="/upload">upload section.</a>
        </li>
        <br />
        <li>
          <b>Annotating Images: </b>
          The second option is to add descriptions and tags - collectively known as <i><b>Annotations</b></i> - to the images.
          Annotations let us group similar images together and they increase the usefulness of algorithms trained on the dataset.
          When buyers of the data later look for images they are interested in, they will search for the tags. Individual tags and descriptions give the second highest amount of rewards,
          as adding a tag or description is easier than finding images.
          You can annotate images whilst <a href="/upload">uploading</a> or <a href="/verify">verifying</a> images.
        </li>
        <br />
        <li>
          <b>Verifying Images: </b>
          The third option is to verify the descriptions - this is called <i><b>Verifications</b></i> in the statistics - and tags that other people added to images as well as to filter out images that should not be in the dataset. This is done by up or downvoting the descriptions and tags. This is rewarded the least amount as it is the easiest way to contribute. You can do this in the <a href="/verify">verification section.</a>
        </li>
      </ul>
    </div>
  )
}

export default function TutorialView({}: TutorialProps): ReactElement {

  return (
    <>
    {/** TODO: Put this in a component. */}
    <div className={styles.tutorialLinks}>

      <Link className={styles.tutorialLink} to={`#why`}>
        Why are we rewarding you for uploading photos?
      </Link>

      <Link className={styles.tutorialLink} to={`#what`}>
        How do you get rewards?
      </Link>

      <Link className={styles.tutorialLink} to={`#metamaskDownload`}>
        {metamaskVideo.title}
      </Link>

      <Link className={styles.tutorialLink} to={`#uploadImage`}>
        {uploadVideo.title}
      </Link>

      <Link className={styles.tutorialLink} to={`#verifyImage`}>
        {verifyVideo.title}
      </Link>

      <Link className={styles.tutorialLink} to={`#payouts`}>
        {statsVideo.title}
      </Link>

    </div>

      <FAQCollapser
        title={`Why are we rewarding you to upload photos?`}
        keyValue={`why`}
      >
        <WhyContent/>
      </FAQCollapser>

      <FAQCollapser
        title={`Where are your photos, annotations and verifications going?`}
        keyValue={`where`}
      >
        <WhereContent/>
      </FAQCollapser>

      <FAQCollapser
        title={`What are you supposed to do to get rewards?`}
        keyValue={`what`}
      >
        <Explanation/>
      </FAQCollapser>

      <FAQCollapser
        title={metamaskVideo.title}
        keyValue={`metamaskVideo`}
      >
        <TutorialVideo
          videos={[metamaskVideo]}
        />
      </FAQCollapser>

      <FAQCollapser
        title={uploadVideo.title}
        keyValue={`uploadVideo`}
      >
        <TutorialVideo
          videos={[uploadVideo]}
        />
      </FAQCollapser>

      <FAQCollapser
        title={verifyVideo.title}
        keyValue={`verifyVideo`}
      >
        <TutorialVideo
          videos={[verifyVideo]}
        />
      </FAQCollapser>

      <FAQCollapser
        title={statsVideo.title}
        keyValue={`statsVideo`}
      >
        <TutorialVideo
          videos={[statsVideo]}
        />
      </FAQCollapser>
    </>
  )
}
