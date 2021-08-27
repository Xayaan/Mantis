import { Config, ConfigHelper } from '@oceanprotocol/lib'
import { ConfigHelperNetworkId, ConfigHelperNetworkName } from '@oceanprotocol/lib/dist/node/utils/ConfigHelper'
import React, { ReactElement } from 'react'

import Styles from '../global/Styles'
import AuthContextProvider from '../providers/AuthProvider'
import { UserPreferencesProvider } from '../providers/UserPreferences'
import { Web3Provider } from '../providers/Web3'

export function getOceanConfig(
    network: ConfigHelperNetworkName | ConfigHelperNetworkId
  ): Config {
    return new ConfigHelper().getConfig(
      network,
      process.env.GATSBY_INFURA_PROJECT_ID
    )
}

export default function wrapRootElement({
  element
}: {
  element: ReactElement
}): ReactElement {

  return (
    <Web3Provider>
      <UserPreferencesProvider>
        <AuthContextProvider>
          <Styles>{element}</Styles>
        </AuthContextProvider>
      </UserPreferencesProvider>
    </Web3Provider>
  )
}
