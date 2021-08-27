import { Link } from "gatsby"
import React, { ReactElement } from 'react'
import { FAQCollapser } from "../molecules/FAQCollapser"

import styles from './Bounties.module.css'

type BountyProps = {}

const Title = () => {
  return (
    <>
    What data should you add to the <a target="_blank" href="https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38">DataUnion.app Image & Annotation Vault</a>?
    </>
  )
}

export default function BountyView({}: BountyProps): ReactElement {

  // const videos: VideoData[] = [metamaskVideo, connectVideo, uploadVideo, verifyVideo]

  return (
    <>
    {/** TODO: Put this in a component. */}
    <div className={styles.tutorialLinks}>
      
      <Link className={styles.tutorialLink} to={`#info`}>
        Information
      </Link>

      <Link className={styles.tutorialLink} to={`#anonymizationBounty`}>
        Anonymization Bounty
      </Link>

      <Link className={styles.tutorialLink} to={`#trafficSignBounty`}>
        Traffic Signs Bounty
      </Link>

      <Link className={styles.tutorialLink} to={`#foodBounty`}>
        Food Bounty
      </Link>

      <Link className={styles.tutorialLink} to={`#projectBBBounty`}>
        project.bb Bounty (Cigarette Butts)
      </Link>

      <Link className={styles.tutorialLink} to={`#nftBounty`}>
        NFT + Art Bounty (photos of NFTs + Art)
      </Link>

      <Link className={styles.tutorialLink} to={`#OCRBounty`}>
        Optical Character Recognition Bounty (OCR)
      </Link>

      <Link className={styles.tutorialLink} to={`#memeBounty`}>
        Meme Bounty
      </Link>

      <Link className={styles.tutorialLink} to={`#productsBounty`}>
        Products Bounty
      </Link>    
    </div>

    <FAQCollapser
      title={<Title />}
      keyValue={`info`}
    >
      <p>During the first challenge, <b>all data that complies with the rules is fine to upload.</b></p>
      <p>However, to <b>earn royalties from your data in the long-term</b>, the data also has to be bought on the <a target="_blank" href="https://port.oceanprotocol.com/t/dataunion-app-oceandao-round-7/694">Data Portal</a>. On the Data Portal, we will make it visible how often each data item is being sold, to indicate which data is in demand and which isn't. </p>        
      <p>Based on existing business dynamics, we already have some insights regarding which image data is valuable - <b>object data</b> is very valuable.</p>
      <p>If there are one or more objects clearly visible in your image, this increases the chance that businesses will be interested in buying your data.
      Another factor which adds value to your images, is <b>the presence of objects in unexpected forms and in interesting situations</b> (e.g. a traffic sign with a graffiti on it, roadkill, kissing cats or a duck sitting on a car). 
      Diversity of data is very important in Computer Vision, because companies want to build algorithms that can detect objects in a wide variety of situations.  
      So get creative, and figure out your niche to fill!</p>        
      <p>Another way to get rewards after the challenges, are <b>data bounties</b>. (see below) To take part in a data bounty, you have to upload an image that fits one of the data bounties, and then add the appropriate tag through the checkboxes. </p>
      <p>To test which types of data are in-demand, we are adding a number of data bounties during the challenges. This gives us insight into how well these bounties can be fullfilled and also will fuel algorithms that we want to develop/improve. Additionally we chose data bounty categories that can highlight the diversity and global present of our community.</p>
    </FAQCollapser>

    <FAQCollapser
      title={`Anonymization Bounty`}
      keyValue={`anonymizationBounty`} 
    >
      <p>To filter out personal information from image data we need to train an algorithm that is based on this personal information. On the page about <Link to="/image_categorization"> personal information</Link> this data and the different catogries of personal information are defined. This is the first bounty that we are looking for. Use the checkboxes on the bottom of the upload and verification pages to add the correct tags for this bounty.</p>
      <br />
      <p>This algorithm will be used by ourselves in the future and will be continuously updated as we want to make it 100% sure to not show personal information in the Data Portal. A partial algorithm of this will be the anonymization of faces, this will be the first initial algorithm offering that we will launch on the Data Portal. Contributors to this data will then also get rewarded with datatokens of this algorithm. We are sure that our DataUnion.app community from around the world will be able to create a diverse dataset that will yield a highly succesful algorithm.</p>
      <br />
      <p>Please note that we will not offer this information on the Data Portal without taking precautions as the correct handling of personal information is of highest importance to us. The tag for this bounty is: <b>anonymization bounty</b></p>
    </FAQCollapser>

    <FAQCollapser
      title={`Traffic Signs Bounty`}
      keyValue={`trafficSignBounty`}
    >
      <p>In collaboration with <a target="_blank" href="https://evotegra.de">Evotegra</a> we are working on Swipe-AI, a new way of annotating images, by comparing a target class image with a crop of the real image. If they match the contributor swipes right, otherwise left. So we are looking for more images around the world to make have data that can help this algorithm to generalise. The tag for this bounty is: <b>traffic sign bounty</b></p>
    </FAQCollapser>

    <FAQCollapser
      title={`Food Bounty`}
      keyValue={`foodBounty`}
    >
      <p>Food is different around the whole world and this is another excellent use-case to showcase the diversity of our community. Take a picture of your meals, fruits, drinks, and whatever else you deem as food, then upload the pictures. The tag for this bounty is: <b>food bounty</b></p>
    </FAQCollapser>

    <FAQCollapser
      title={`Project.BB Bounty (Cigarette Butts on the Beach)`}
      keyValue={`projectBBBounty`}
    >
      <p>This is the most specific bounty that we are investigating. We are looking for images of cigarette butts on the beach, preferably photographed from directly above at a 20-40cm or 8-16in distance. This is so the cigarettes can be reached by a robot actuator. This data is used to train the robot of <a href="https://project.bb">Project.BB</a> to detect and collect cigarette butts on the beach. The tag for this bounty is: <b>project.bb bounty</b></p>
      <br />
      <p>Here is a picture of the robot to give you a better impression of what your data is training:</p>
      <img src="../projectbb_robot.jpg" />
    </FAQCollapser>

    <FAQCollapser
      title={`NFT and Art Bounty (Images of NFTs and Art)`}
      keyValue={`nftBounty`}
    >
      <p>NFTs are a brand-new asset class that will likely be queried by machine learning algorithms. People are already discussing <a target="_blank" href="https://www.reddit.com/r/NFT/comments/lzq6qs/is_there_a_tool_to_check_if_an_nft_has_already/">reverse image searches</a> to find NFTs. Creating such a search engine would be one use case for the images added here. Another is to create a price prediction engine for new NFTs based on additional annotations of NFTs and Art e.g. price, sentiment, and other manual annotations that we will add in the annotation part of the website. An interesting other use case is the generation of new NFTs from the images collected via GANs.
         Collect images of NFTs and Art and post them under this bounty.
         The tag for this bounty is: <b>nft+art bounty</b></p>
    </FAQCollapser>

    <FAQCollapser
      title={`Optical Character Recognition Bounty (OCR)`}
      keyValue={`OCRBounty`}
    >
      <p><a target="_blank" href="https://towardsdatascience.com/a-gentle-introduction-to-ocr-ee1469a201aa">Optical Character Recognition</a>, shortened to OCR, is a machine learning technique performed on images with text or numerical characters in them. For this bounty, you need to <b>upload photos with text or numbers in them.</b> By posting these photos you are helping to solve long-time machine learning problems such as <a target="_blank" href="https://medium.com/@andreasveit/reading-text-in-the-wild-383c93a6c5e5">OCR in the Wild</a>. Some examples: </p>
      <img src="../kanji_calligraphy.jpg" />
      <img src="../traffic_ocr.jpg" />
      <p>The algorithms to train from this data will be able to recognize text in images and then in combination with translation algorithms display them on top of the images like Google does it already. Additionally this will allow the automatic creation of tags based on text in images which will save time in processing images.
      The tag for this bounty is: <b>ocr bounty</b></p> 
    </FAQCollapser>

    <FAQCollapser
      title={`Meme Bounty`}
      keyValue={`memeBounty`}
    >
      <p>Upload your <b>memes</b> to get crypto out of it. Are you already uploading memes to Reddit or other platforms? Why not add them to our platform as well to get something out of it.</p>
      <img src="../meme_sample.jpg" />
      <p>The idea is to be able to detect memes and their content on different websites, trace them and create a history of them. Additionally we will add sentiment annotation to them in our annotation part of the website. This will enable a more systematic analysis of meme culture. And of course this can lead to fancy meme generation GANs that help you to do crazy stuff to create new memes. Who wouldn't want computer generated memes going viral on the internet?
      The tag for this bounty is: <b>meme bounty</b></p> 
    </FAQCollapser>

    <FAQCollapser
      title={`Products Bounty`}
      keyValue={`productsBounty`}
    >
      <p><b>Products</b> are anything you find in stores. Pictures of products can train machine learning algorithms to recognize products without barcodes and inside of other pictures. It is important to have images of products from multiple angles as this is how they will appear in other pictures.
      Another potential usecase for this would be the option to create an optical store inventory system - when the items are accepted the store owner takes pictures of the packages and the phone stores how many there are in the inventory. The store owner and the employess take pictures at the checkout counter and the system automatically updates the inventory. If the buyers are checking out digitally they could even use an app to take pictures themself and pay e.g. via crypto.
      The tag for this bounty is: <b>product bounty</b></p> 
    </FAQCollapser>
    </>
  )
}
