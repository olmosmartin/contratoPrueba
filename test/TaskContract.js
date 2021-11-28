const TasksContract = artifacts.require("TasksContract");

contract ("TaskContract", () => {
    
    before(async()=>{
        this.tasksContract = await TasksContract.deployed();
    })

    it("el contrato fue desplegado", async() => {
        const address = this.tasksContract.address;
        assert.notEqual(address, null);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
        assert.notEqual(address, undefined);
    })

    it("obtener una tarea", async() => {
        //el numero va a venir en 1 porque yo creo una tarea en el constructor
        const numeroContador = await this.tasksContract.contador();
        //traigo la tarea 0
        const tarea = await this.tasksContract.tasks(numeroContador-1);
        //pruebo que el id de la tarea sea 0
        assert.equal(tarea.id.toNumber(), numeroContador-1);
        //pruebo que el nombre de la tarea sea "primer tarea de ejemplo"
        assert.equal(tarea.nombre, "primer tarea de ejemplo");
        //pruebo que el estado de la tarea sea false
        assert.equal(tarea.hecho, false);
        //pruebo que la descripcion de la tarea sea "primer descripcion de ejempo"
        assert.equal(tarea.descripcion, "primer descripcion de ejempo");
        //pruebo que el contador sea 1
        assert.equal(numeroContador, 1);
    })

    it("crear una tarea", async() => {
        //creo una tarea
        const result = await this.tasksContract.createTask("segunda tarea de ejemplo", "segunda descripcion de ejemplo");
        //creo un evento
        const event = result.logs[0].args;
        //pruebo que el id de la tarea sea 1
        assert.equal(event.id.toNumber(), 1);
        //pruebo que el nombre de la tarea sea "segunda tarea de ejemplo"
        assert.equal(event.nombre, "segunda tarea de ejemplo");
        //pruebo que el estado de la tarea sea false
        assert.equal(event.hecho, false);
        //pruebo que la descripcion de la tarea sea "segunda descripcion de ejemplo"
        assert.equal(event.descripcion, "segunda descripcion de ejemplo");
        //pruebo que el contador sea 2
        const numeroContador = await this.tasksContract.contador();
        assert.equal(numeroContador, 2);

        /* otra forma de hacerlo sin event:::
        //pruebo que el contador sea 2
        const numeroContador = await this.tasksContract.contador();
        assert.equal(numeroContador, 2);
        //traigo la tarea 1
        const tarea = await this.tasksContract.tasks(numeroContador-1);
        //pruebo que el id de la tarea sea 1
        assert.equal(tarea.id.toNumber(), 1);
        //pruebo que el nombre de la tarea sea "segunda tarea de ejemplo"
        assert.equal(tarea.nombre, "segunda tarea de ejemplo");
        //pruebo que el estado de la tarea sea false
        assert.equal(tarea.hecho, false);
        //pruebo que la descripcion de la tarea sea "segunda descripcion de ejemplo"
        assert.equal(tarea.descripcion, "segunda descripcion de ejemplo");
        */
    })

    it("marcar una tarea como hecha", async() => {
        //marco la tarea 0 como hecha
        const result = await this.tasksContract.toggleHecho(0);
        //creo un evento
        const event = result.logs[0].args;
        //pruebo que el estado de la tarea sea true
        assert.equal(event.hecho, true);
        //pruebo que la tarea 0 ya no esta disponible
        const tarea = await this.tasksContract.tasks(0);
        assert.equal(tarea.hecho, true);

        /* otra forma de hacerlo sin event:::
        //pruebo que el estado de la tarea sea true
        const tarea = await this.tasksContract.tasks(0);
        assert.equal(tarea.hecho, true);
        */
    })
})