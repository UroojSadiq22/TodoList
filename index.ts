#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk"

let todos: string[] = [];
let condition = true;

console.log(chalk.magenta.bold.italic("\n Welcome to My Todo App \n"));

await new Promise((resolve) => setTimeout(resolve, 2000))

while (condition) {
  let addTask = await inquirer.prompt([
    {
      name: "todo",
      type: "input",
      message: chalk.yellow("What do you want to add in your Todos?"),
    },
  ]);

  if (addTask.todo.trim() !== "") {
    todos.push(addTask.todo);
    console.log(`${todos}\n`);
  } else {
    console.log(chalk.red("Invalid Todo! Please write the correct one\n"));
    continue; // Skip the rest of the loop iteration and ask again for input
  }

  let addMore = await inquirer.prompt({
    name: "addmore",
    type: "confirm",
    message: chalk.yellow("Do you want to add more in your Todos?"),
    default: false,
  });

  condition = addMore.addmore;
}

let repeat = true;
while (repeat) {
  let operationAnswer = await inquirer.prompt({
    name: "operation",
    message: chalk.yellow("please select option"),
    type: "list",
    choices: ["Add More", "Read", "Delete", "Update"],
  });

  if (operationAnswer.operation === "Add More") {
    let condition = true;

    while (condition) {
      let addTask = await inquirer.prompt([
        {
          name: "todo",
          type: "input",
          message: chalk.yellow("What do you want to add in your Todos?"),
        },
      ]);

      if (addTask.todo.trim() !== "") {
        todos.push(addTask.todo);
        console.log(`${todos}\n`);
      } else {
        console.log(chalk.red("Invalid Todo! Please write the correct one\n"));
        continue; // Same purpose as above continue
      }

      let addMore = await inquirer.prompt({
        name: "addmore",
        type: "confirm",
        message: chalk.yellow("Do you want to add more in your Todos?"),
        default: false,
      });

      condition = addMore.addmore;
    }
  }

  if (operationAnswer.operation === "Read") {
    todos.forEach((i) => console.log(chalk.green(i)));
    console.log("\n");
  }
  else if (operationAnswer.operation === "Delete") {
    let delChoice = await inquirer.prompt({
      name: "deleteTodo",
      type: "list",
      message: chalk.yellow("Choose the item to delete:"),
      choices: todos,
    });

    todos = todos.filter((i) => i !== delChoice.deleteTodo);
    console.log(chalk.red.italic("Todo deleted! "),"Your Remaining Todos are:");
    todos.forEach((i) => console.log(chalk.green(i)));
    console.log("\n");
    
  } 
  
  else if (operationAnswer.operation === "Update") {
    let update = await inquirer.prompt([
      {
        name: "updateTodo",
        type: "list",
        message: chalk.yellow("Choose the item to update:"),
        choices: todos,
      },
      {
        name: "newTodo",
        type: "input",
        message: chalk.yellow("Enter the new todo item"),
      },
    ]);

    todos = todos.map((i) => (i === update.updateTodo ? update.newTodo : i));

    console.log(chalk.green.italic("Todo updated! ")," Your Updated Todos are:");
    todos.forEach((i) => console.log(chalk.green(i)));
    console.log("\n");
    
  }

  let repeatAgain = await inquirer.prompt({
    name: "again",
    type: "confirm",
    message: chalk.yellow("Do you want to perform again operation?"),
    default: false,
  });

  if(repeatAgain.again === false){
    console.log(chalk.magenta.italic("Thank You! Looking forward for the next time."));
  }

  repeat = repeatAgain.again;
}
