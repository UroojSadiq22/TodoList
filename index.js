#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: "What do you want to add in your Todos?",
        },
    ]);
    if (addTask.todo.trim() !== "") {
        todos.push(addTask.todo);
        console.log(todos);
    }
    else {
        console.log("Invalid Todo! Please write the correct one");
        continue; // Skip the rest of the loop iteration and ask again for input
    }
    let addMore = await inquirer.prompt({
        name: "addmore",
        type: "confirm",
        message: "Do you want to add more in your Todos?",
        default: false,
    });
    condition = addMore.addmore;
}
let repeat = true;
while (repeat) {
    let operationAnswer = await inquirer.prompt({
        name: "operation",
        message: "please select option",
        type: "list",
        choices: ["add more", "read", "delete", "update"],
    });
    if (operationAnswer.operation === "add more") {
        let condition = true;
        while (condition) {
            let addTask = await inquirer.prompt([
                {
                    name: "todo",
                    type: "input",
                    message: "What do you want to add in your Todos?",
                },
            ]);
            if (addTask.todo.trim() !== "") {
                todos.push(addTask.todo);
                console.log(todos);
            }
            else {
                console.log("Invalid Todo! Please write the correct one");
                continue; // Skip the rest of the loop iteration and ask again for input
            }
            let addMore = await inquirer.prompt({
                name: "addmore",
                type: "confirm",
                message: "Do you want to add more in your Todos?",
                default: false,
            });
            condition = addMore.addmore;
        }
    }
    if (operationAnswer.operation === "read") {
        let readTodo = await inquirer.prompt({
            name: "read",
            type: "confirm",
            message: "Do you want to see the list of your Todos?",
            default: false,
        });
        if (readTodo.read) {
            todos.forEach((i) => console.log(i));
        }
    }
    else if (operationAnswer.operation === "delete") {
        let delTodo = await inquirer.prompt({
            name: "delete",
            type: "confirm",
            message: "Do you want to delete any Todos?",
            default: false,
        });
        if (delTodo.delete) {
            let delChoice = await inquirer.prompt({
                name: "deleteTodo",
                type: "list",
                message: "Choose the item to delete:",
                choices: todos,
            });
            todos = todos.filter((i) => i !== delChoice.deleteTodo);
            console.log("Todo deleted! Your Remaining Todos are:");
            todos.forEach((i) => console.log(i));
        }
    }
    else if (operationAnswer.operation === "update") {
        let updateTodo = await inquirer.prompt({
            name: "update",
            type: "confirm",
            message: "Do you want to update any Todos?",
            default: false,
        });
        if (updateTodo.update) {
            let update = await inquirer.prompt([
                {
                    name: "updateTodo",
                    type: "list",
                    message: "Choose the item to delete:",
                    choices: todos,
                },
                {
                    name: "newTodo",
                    type: "input",
                    message: "Enter the new todo item",
                },
            ]);
            todos = todos.map((i) => (i === update.updateTodo ? update.newTodo : i));
            console.log("Todo updated! Your Updated Todos are:");
            todos.forEach((i) => console.log(i));
        }
    }
    let repeatAgain = await inquirer.prompt({
        name: "again",
        type: "confirm",
        message: "Do you want to perform again operation?",
        default: false,
    });
    repeat = repeatAgain.again;
}
