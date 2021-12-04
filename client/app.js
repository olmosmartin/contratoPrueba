App={

    web3Provider: "",
    contracts: {},
    init : async () => {
        console.log("App initialized");
        await App.loadEthereum();
        await App.loadAccount();
        await App.loadContracts();
        await App.renderTasks();
        App.render();
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
    },

    loadAccount : async () => {
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
        App.account = accounts[0];
    },

    render: () => {
        document.getElementById("account").innerHTML = App.account;
    },

    renderTasks: async () => {
        const taskCount = await App.tasksContract.contador();
        const taskCountNumber = taskCount.toNumber();
        console.log(taskCountNumber);
        
        let html = "";

        for (let i = 1; i <= taskCountNumber; i++) {
            const task = await App.tasksContract.tasks(i);
            const taskId = task[0].toNumber();
            const taskTitulo = task[1];
            const taskDescripcion = task[2];
            const taskDone = task[3];
            const taskCreated = task[4];
        
        let taskElement = `
        <div class="card bg-dark rounded-0 mb-2">
            <div class="card-header d-flex justify-content-between align-items-center" >
                <span>${taskTitulo}</span>
                <div class="form-check form-switch">
                    <input type="checkbox" class="form-check-input" ${taskDone&&"checked"}
                    data-id="${taskId}"
                    onChange="App.toggleDone(this)"
                    />
                </div>
            </div>
            <div class="card-body">
                <p>${taskDescripcion}</p>
                <p class="text-muted">tarea fue creada: ${new Date(taskCreated*1000).toLocaleString()}</p>
            </div>
        </div>
        `
        html+=taskElement;
        }
        document.querySelector("#tasksList").innerHTML = html;
        
    },

    createTask : async (titulo, descripcion) => {
        const result = await App.tasksContract.createTask(titulo, descripcion, {from: App.account});
        //console.log(result.logs[0].args);
    },

    toggleDone: async (element) => {
        const taskId = element.dataset.id;
         await App.tasksContract.toggleHecho(taskId, {from: App.account});
         window.location.reload();
    }
}