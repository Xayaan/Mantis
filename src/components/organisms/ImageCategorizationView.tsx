import React, { ReactElement, useEffect, useState } from 'react'
import styles from './ImageCategorizationView.module.css'
import { Link } from "gatsby"

type TutorialProps = {}

export default function ImageCategorizationView({}: TutorialProps): ReactElement {

  return (
    <>
    {/** TODO: Put this in a component. */}
    <div className={styles.tutorialLinks}>
      <Link className={styles.tutorialLink} to={`#info`}>
        What is personal data?
      </Link>

      <Link className={styles.tutorialLink} to={`#why`}>
        Why is this important?
      </Link>

      <Link className={styles.tutorialLink} to={`#how`}>
        How do I categorize images
      </Link>

      <Link className={styles.tutorialLink} to={`#biometric`}>
        PII - Biometric       
      </Link>

      <Link className={styles.tutorialLink} to={`#faces`}>
        PII - Faces
      </Link>

      <Link className={styles.tutorialLink} to={`#nonFaces`}>
        PII - Non Faces
      </Link>

      <Link className={styles.tutorialLink} to={`#nonPII`}>
        Non-PII
      </Link>

      <Link className={styles.tutorialLink} to={`#notSure`}>
        Not Sure
      </Link>
    </div>

    <hr/>

    <div id={`info`}>
        <h2 className={styles.heading}>What is personal data?</h2>
        <p>Personal data means any information relating to an identified or identifiable natural person. So if a person is somehow identifiable, we consider the data to be personal. The identifier can be anything, such as a name, an identification number, address, a phone number, a license plate, an email address, and so forth. Of course, because persons are identifiable through their face, this is considered personal data too. If an image of a face fulfills certain properties, we consider it to be <b>biometric</b>.</p>
    </div>

    <hr/>

    <div id={`why`}>
        <h2 className={styles.heading}>Why is this important?</h2>
        <p>We at Dataunion.app care about your privacy. We follow a “privacy-first” and “privacy-by-design” approach and collect minimal data. However, if you choose to upload images containing personal data, we need to make sure to process and store them securely. To do so, we need your help to categorize images that contain personal data and, even more important, biometric data.</p>
    </div>

    <hr/>

    <div id={`how`}>
        <h2 className={styles.heading}>How do I categorize images?</h2>
        <p>If you see faces that are clearly recognizable, such as portraits, selfies and faces from a medium distance, or if you think a face recognition software would be able to identify a person based on the image, we consider them biometric. Of course, the distinction isn’t always clear, so we will show you samples you can take as a guide.<br />
		If you see personal information on a picture, you simply categorize it as “PII”. Things to look for are distant faces that are not immediately recognizable, license plates, names, addresses, computer or smartphone screens (and screenshots) displaying personal information, bills, invoices, envelopes, post and business cards, bank and credit cards, and anything else you may find that contains similar data.<br />
		If in doubt, we advise you to “round up” and go for the option with stronger privacy protection.</p>
    </div>

    <hr/>

    <div id={`biometric`}>
        <h2 className={styles.heading}>PII - Biometric</h2>
		<img src="/samples_PII_biometric.jpg" />
		<p>The images show faces that are clearly recognizable. They are sufficiently large and show faces from a front perspective or with a slight tilt. A face recognition software would be able to identify a person based on the image, which means that we consider them <b>biometric</b>.</p>
    </div>

    <hr/>

    <div id={`faces`}>
        <h2 className={styles.heading}>PII - Faces</h2>
		<img src="/samples_PII_faces.jpg" />
		<p>The images show faces that are difficult to recognize, shown from a distant point of view, and in a size or manner that do not fulfill biometric properties. We categorize this as “<b>PII</b>”. Please be aware that the distinction between biometric and non-biometric also depends on the resolution of the image. Hence, if you see distant faces on a  high-resolution image, they could be considered biometric if the face is clearly recognizable. If in doubt, we advise you to “round up” and go for the option with stronger privacy protection.</p>
    </div>

    <hr/>

    <div id={`nonFaces`}>
        <h2 className={styles.heading}>PII - Non-Faces</h2>
		<img src="/samples_PII_no_faces.jpg" />
		<p>The personal data to look for are license plates, names, addresses, computer or smartphone screens displaying personal information, screenshots, bills, invoices, envelopes, post and business cards, bank and credit cards, and anything else you may find that contains similar data. We categorize this as “<b>PII</b>”.</p>
    </div>

    <hr/>

    <div id={`nonPII`}>
        <h2 className={styles.heading}>Non-PII</h2>
		<img src="/samples_non-PII.jpg" />
		<p>If you don’t recognize anything of the items described before, you don’t have to do anything.</p>
    </div>

    <hr/>
    
    <div id={`notSure`}>
        <h2 className={styles.heading}>Not sure about your image?</h2>
	    <p>Contact us via <a target="_blank" href="mailto:help@dataunion.app">mail</a> or via social media (the links are in the footer).</p>
    </div>
    <hr/>
    </>
  )
}