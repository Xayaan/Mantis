import { Link } from "gatsby"
import React, { ReactElement } from "react";

import { useAuthContext } from "../../providers/AuthProvider";
import { Checkbox } from "../atoms/Checkbox";
import styles from './AcceptGuidelinesCollapser.module.css'

type AcceptGuidelinesCollapserProps = {}

export function AcceptGuidelinesCollapser(): ReactElement {

  const { acceptedUpload, acceptedUploadInitWaiting } = useAuthContext()

  const unacceptedTitle = "Read & Accept the Terms and Upload Guidelines"
  const acceptedTitle = "Read the Terms and Upload Guidelines"

  // console.log(`Rendering Collapser`)

  return (
    <>
      <div className={styles.wrapCollapsible}>
        {acceptedUpload ? 
          (
            <>
              <input id="collapsible" className={styles.toggle} type="checkbox" style={{display: "none"}} /> 
              <label htmlFor="collapsible" className={styles.lblToggle}>{acceptedTitle}</label>
            </>
          ) : (
            <>
              <input id="collapsible" className={styles.toggle} type="checkbox" style={{display: "none"}} checked />
              <label htmlFor="collapsible" className={styles.lblToggle}>{unacceptedTitle}</label>
            </>
        )}
    
        <div className={styles.collapsibleContent}>
          <div className={styles.contentInner}>
  
            <p>We at DataUnion.app respect the privacy and intellectual property of our users. We expect that you do the same.</p>
            <p>We expect that you do not upload images:</p>
            <ul className={styles.list}>
              <li>Where you do not own the rights to</li>
              <li>That contain personally identifiable information of others or interfere with the privacy of others</li>
              <li>That contain portrayals of pornography or violence</li>
              <li>That contain legal violations</li>
            </ul>
            <p>We reserve the right to terminate accounts (and block Ethereum addresses) of users who appear to be responsible for legal violations or violations of our <Link to="/terms/">Terms of Service</Link>.</p>
  
            <Checkbox
              label={"I accept DataUnion's Guidelines and Terms of Service"}
              location={"upload"}
            />
  
          </div>
  
        </div>
      </div>
    </>
  )
}
