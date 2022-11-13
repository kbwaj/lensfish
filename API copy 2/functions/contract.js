const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

// const address = '0x3B69f84Fb275629Ac8d92B6EA730Cac5931533D8';
const address = '0x1112a15e083bd889458d5272f2f93647f3b61729';
const mnemonicPhrase = 'adjust marine unhappy double panel defense install novel job orient lawn title';
let provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: "https://goerli.infura.io/v3/ccdf32c2a7e840b9b7526d4d4a8ae4e9", 
    
  });
let web3 = new Web3(provider)

//
const wallets = provider.wallets;
console.log(wallets)
var accounts = [];
for (const wallet in wallets) {
  let account = wallets[wallet];
  accounts.push({
    privateKey: account.privateKey.toString("hex"),
    publicKey: account.publicKey.toString("hex"),
    publicAddress: wallet,
  });
}
console.log(accounts)
//
const abi = require("./abi.json");


let contract = new web3.eth.Contract(abi, address);


async function getEthBalance(address){
    const ethbalance = await contract.methods.getethbalance(address).call();
    return ethbalance;
}




async function liquidateEth(address){
    
    const ethbalance = await contract.methods.liquidateEth(address).send({
        gas:100000, 
        from:"0x7e1EAa2d8e0ceBD8AaADa559E0EE214575B94918"
    });
    console.log(ethbalance);

}

// liquidateEth("0x7e1EAa2d8e0ceBD8AaADa559E0EE214575B94918")

async function getLiqPoolBal(){
   //index.js

// The minimum ABI to get ERC20 Token balance

const abi = [  
    // balanceOf
    {    
      constant: true,
  
      inputs: [{ name: "_owner", type: "address" }],
  
      name: "balanceOf",
  
      outputs: [{ name: "balance", type: "uint256" }],
  
      type: "function",
    },
  
  ];
  
    
      const contractAddress = "0xc72D9c39B3f9DB5d6A8F0b4B94e6bD876e1045A1";
      const from = "0x7e1EAa2d8e0ceBD8AaADa559E0EE214575B94918";

      const contract = new web3.eth.Contract(abi, contractAddress);
      let result;
      try{
         result = await contract.methods.balanceOf(address).call(); // 29803630997051883414242659

      } catch(err){
        console.log(err)
      }
      console.log(result)
  
      const format = web3.utils.fromWei(result); // 29803630.997051883414242659

      console.log(format)
      return format
}













async function payErc20(mnemonicCode, fromAddress, amount) {
    let provider = new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicCode
        },
        providerOrUrl: "https://goerli.infura.io/v3/ccdf32c2a7e840b9b7526d4d4a8ae4e9"
      });
    let web3 = new Web3(provider)

    // Get ERC20 Token contract instance
    const abi = [
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        type: "function",
      },
    ];

  
    const contractAddress = "0xc72D9c39B3f9DB5d6A8F0b4B94e6bD876e1045A1";
    const from = fromAddress;
    const toAddress = address;
    const contract = new web3.eth.Contract(abi, contractAddress);

    // ERC20 token amount
    const value = web3.utils.toBN(amount * Math.pow(10, 18));

    // call transfer function
    return contract.methods
      .transfer(toAddress, value)
      .send({ from, gas:1000000
     })
      .then(function (receipt) {
        console.log(receipt);
        return "success"
      }).catch(err=>{
        console.log(err);
        return "failure"
      });
  }


  async function transferOutUSDC(toAddress, amount) {
    let provider = new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicPhrase
        },
        providerOrUrl: "https://goerli.infura.io/v3/ccdf32c2a7e840b9b7526d4d4a8ae4e9"
      });
    let web3 = new Web3(provider)

    // Get ERC20 Token contract instance
    const abi = [
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ name: "", type: "bool" }],
        type: "function",
      },
    ];

  
    const contractAddress = "0xc72D9c39B3f9DB5d6A8F0b4B94e6bD876e1045A1";
    const from = "0x1112a15e083bd889458d5272f2f93647f3b61729";

    const contract = new web3.eth.Contract(abi, contractAddress);

    // ERC20 token amount
    const value = web3.utils.toBN(amount * Math.pow(10, 18));

    // call transfer function
    return contract.methods
      .transfer(toAddress, value)
      .send({ from, gas:1000000
     })
      .then(function (receipt) {
        console.log(receipt);
        return "success"
      }).catch(err=>{
        console.log(err);
      });
  }


  async function setUSDC(address,amount){
    let provider = new HDWalletProvider({
        mnemonic: {
          phrase: mnemonicPhrase
        },
        providerOrUrl: "https://goerli.infura.io/v3/ccdf32c2a7e840b9b7526d4d4a8ae4e9"
      });
    let web3 = new Web3(provider)

    // Get ERC20 Token contract instance
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenOwner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "changeBalance",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "numTokens",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
    console.log(contract.methods)
    return contract.methods
//     .transfer(toAddress, value)
//     .send({ from, gas:1000000
//    })
//     .then(function (receipt) {
//       console.log(receipt);
//       return "success"
//     }).catch(err=>{
//       console.log(err);
//     });


  }

//   setUSDC()
//   transferOutUSDC("0x7e1EAa2d8e0ceBD8AaADa559E0EE214575B94918", 0.2).then(res=>{
//     console.log(res)
//   })

module.exports = {
    getEthBalance, 
    getLiqPoolBal, 
    payErc20, 
    liquidateEth
}
  // transaction may take a few min to execute since we are using ropsten so be patient
  
  
//   sendEther();


