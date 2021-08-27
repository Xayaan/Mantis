<h1 align="center">Mantis: Opening Data Curation to the World</h1>

**Table of Contents**

- [🧜🏽‍♀️ Welcome](#-about)
- [🦐 Get Started](#-get-started)
- [🏛 License](#-license)

## 🧜🏽‍♀️ Welcome

Welcome to Mantis, a revolutionary data curation tool!

Mantis is a data curation site where you can upload, verify and annotate images for the [QUICRA-0 dataset](https://market.oceanprotocol.com/asset/did:op:7Bce67697eD2858d0683c631DdE7Af823b7eea38), and receive crypto rewards in return.

Mantis is currently in its *alpha phase*. You can visit the working production build at https://alpha.dataunion.app. 

## 🦐 Get Started

The app is a React app built with [Gatsby.js](https://www.gatsbyjs.org) + TypeScript + CSS modules.
Using most features requires login with a Metamask account.

To start local development:

```bash
git clone https://github.com/DataUnion-app/Mantis.git
cd Mantis

npm install
npm start
```

This will start the development server under
`http://localhost:8000`.

To explore the generated GraphQL data structure fire up the accompanying GraphiQL IDE under
`http://localhost:8000/__graphql`.

## 🏛 License
This is a fork of Ocean Protocol's marketplace albeit not using GitHubs fork functionality.
This is their License part:
```text
Copyright 2020 DataUnion.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
This is our license:
```text
Copyright 2021 DataUnion.app
See the LICENSE file for the license of this code.
```
But we prefer to use the GLPv3 so we changed it to that. [According to Apache this is fine](https://www.apache.org/licenses/GPL-compatibility.html).
