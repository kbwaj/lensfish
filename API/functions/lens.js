const { ApolloClient,InMemoryCache, gql, HttpLink } =require('@apollo/client');
const fetch = require('cross-fetch')
let { ethers, utils, Wallet }= require('ethers') ;
const bip39 = require("bip39")
// const { getAddressFromSigner } =require('../ethers.service') ;

const API_URL = 'https://api-mumbai.lens.dev/playground'

/* create the API client */
 const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(), 
  link: new HttpLink({ uri: API_URL, fetch })
})


 const exploreProfiles = gql`
query ExploreProfiles {
  exploreProfiles(request: { sortCriteria: MOST_FOLLOWERS }) {
    items {
      id
      name
      bio
      handle
      picture {
        ... on MediaSet {
          original {
            url
          }
        }
      }
      stats {
        totalFollowers
      }
    }
  }
}
`

const createProfile = gql`
mutation CreateProfile {
    createProfile(request:{ 
                  handle: ${config.handle},
                  profilePictureUri: null,   
                  followModule: {
                       freeFollowModule: true
                    }
                  }) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
  }
  `


  const signChallengeGQl = gql`
  mutation Authenticate {
    authenticate(request: {
      address: "0xC18527E5aE3d67127cfefA8b555894BD224321Ad",
      signature: "fb1b2d78d886fa29b27d378953ba9d2458abd02142665a45920e67fbcdb3741e"
    }) {
      accessToken
      refreshToken
    }
  }
  `
  





async function createUserLens(name, email, address, privateKey){


    orchestrateLogin()

   let res= await client.mutate({ mutation:createProfile})


    
}
// createUserLens(
//   "amu", 
//   "de", 
//   '0xC18527E5aE3d67127cfefA8b555894BD224321Ad', 
//   'fb1b2d78d886fa29b27d378953ba9d2458abd02142665a45920e67fbcdb3741e'
// )


async function generateChallenge(address){
  const challenge = gql`
  query Challenge {
    challenge(request: { address: "${address}" }) {
      text
    }
  }
  `
  const res = await client.query({ query: challenge });
  return res
}

async function generateSignature (text){
  let signature = await signText(text);
  return signature;
}




async function orchestrateLogin(address, PK){




  let challengeRes = await generateChallenge(address);
  console.log(challengeRes);
  let signer = getSigner(PK);
  let signature = await signer.signMessage(challengeRes.data.challenge.text);
  let auth = await  authenticate(address, signature);
  return auth;

}

async function authenticate(address, signature){

  
    let auth = gql`
        mutation Authenticate {
          authenticate(request: {
            address: "${address}",
            signature: "${signature}"
          }) {
            accessToken
            refreshToken
          }
        }
      `

      const res = await client.mutate({ mutation: auth });
      return res
}






 getSigner = (PK) => {
  ethersProvider = new ethers.providers.JsonRpcProvider(API_URL);
  console.log(new Wallet(PK, ethersProvider).signMessage);
  return new Wallet(PK, ethersProvider);
};



// let mnemonicWallet = ethers.Wallet.fromMnemonic(
//   "adjust marine unhappy double panel defense install novel job orient lawn title"
// );
// console.log(mnemonicWallet.privateKey);
