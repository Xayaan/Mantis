import React, { ReactElement, ReactNode } from "react";

export function Guidelines(): ReactElement {
    return (
        <> 
        <p>We at DataUnion.app respect the privacy and intellectual property of our users. We expect that you do the same.</p>
        <p>We expect that you do not upload images:</p>
            <ul>
                <li>Where you do not own the rights to</li>
                <li>That contain personally identifiable information of others or interfere with the privacy of others</li>
                <li>That contain portrayals of pornography or violence</li>
                <li>That contain legal violations</li>
            </ul>
        <p>We reserve the right to terminate accounts (and block Ethereum addresses) of users who appear to be responsible for legal violations or violations of our Terms of Service.</p>
        </>
    )
}