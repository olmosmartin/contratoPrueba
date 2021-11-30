App={

    web3Provider: "",
    contracts: {},
    init : () => {
        console.log("App initialized");
        App.loadEthereum();
        App.loadContracts();
    },
    
    loadEthereum : async () => {
        if (window.ethereum) {
            App.web3Provider=window.ethereum;
            console.log("ethereum existe");
            await window.ethereum.request({method: "eth_requestAccounts"});
        } else if (window.web3) {
            web3 = new web3(window.web3.currentProvider);
        } else {
            console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }
    },
    loadContracts : async () => {
        const res = await fetch("TasksContract.json");
        const tasksContractJSON = await res.json();

        console.log(tasksContractJSON);
        App.contracts.tasksContract = TruffleContract(tasksContractJSON)

        App.contracts.tasksContract.setProvider(App.web3Provider);

        App.tasksContract = await App.contracts.tasksContract.deployed();
    }
}

App.init();