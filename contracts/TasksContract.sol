// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {

    uint public contador = 0;

    //creo un constructor que se ejecuta cuando se crea el contrato creando una tarea
    constructor() {
        createTask("primer tarea de ejemplo", "primer descripcion de ejempo");
    }

    struct Task {
        uint256 id;
        string nombre;
        string descripcion;
        bool hecho;
        uint256 fechaCreacion;
    }

    mapping (uint256 => Task) public tasks;

    function createTask(string memory _nombre, string memory _descripcion) public {
        tasks[contador] = Task(contador, _nombre, _descripcion, false, block.timestamp);
        contador++;
    }

    //toggle hecho 
    function toggleHecho(uint256 _id) public {
        Task memory _tasks = tasks[_id];
        _tasks.hecho = !_tasks.hecho;
        tasks[_id] = _tasks;
    }
}