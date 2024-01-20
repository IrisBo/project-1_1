

// connections

const newTaskText = document.querySelector(".text_input")
const newTaskDate = document.querySelector(".date_input")
const newTaskTime = document.querySelector(".time_input")
const addNewTaskBtn = document.querySelector(".save_new_task_btn")
const clearFormBtn = document.querySelector(".clear_form_btn")
const taskDisplayArea = document.getElementById("display_area")



let allTasksToArray = []


// iife? maybe
// when page reloads it runs the function into the variable array
window.addEventListener("load", function () {
    allTasksToArray = getTasksFromLocalStorage()
    createAllItemsFromLocalStorage();
})



addNewTaskBtn.addEventListener("click", function () {

    //  retrieving input value   
    let taskTextValue = newTaskText.value
    let taskDateValue = newTaskDate.value
    let taskTimeValue = newTaskTime.value
    let timeStampId= Date.now()


    // creating an object with all data
    let newTaskAll = {
        text: taskTextValue,
        date: taskDateValue,
        time: taskTimeValue,
        uniqueId: timeStampId,

    }
    

    // adding all objects to an array
    allTasksToArray.push(newTaskAll)

    // saving array to localstorage
    keepTasksInLocalStorage(allTasksToArray)

    // creating the task item element in html
    createHtmlTaskItem(newTaskAll)

 



    clearAlldataInputfields(newTaskText)
    clearAlldataInputfields(newTaskDate)
    clearAlldataInputfields(newTaskTime)


})





function createHtmlTaskItem(taskObject) {
    const newTaskItem = document.createElement("div")
    newTaskItem.classList.add("all_new_task")

    newTaskItem.dataset.uniqueId = taskObject.uniqueId

    for (const key in taskObject) {

        if(key!==`uniqueId`){
        const newTaskItemDiv = document.createElement("div")
        // added new class code
       newTaskItemDiv.classList.add(key)
        const newNodeText = document.createTextNode(taskObject[key])
        newTaskItemDiv.appendChild(newNodeText)
        newTaskItem.appendChild(newTaskItemDiv)}}
    
    const deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete_task")
   
    const deleteTaskBtnText = document.createTextNode("X")
    deleteTaskBtn.appendChild(deleteTaskBtnText)
    newTaskItem.appendChild(deleteTaskBtn)
    taskDisplayArea.appendChild(newTaskItem)
 
   // adding eventlistener and function to remove task, i think here is the problem

 deleteTaskBtn.addEventListener("click", function () {
    const uniqueIdTask = newTaskItem.dataset.uniqueId
    newTaskItem.remove()
    deleteTaskFromLocalStorage(uniqueIdTask)
    
});

}


// deleting task from local storage using the unique ID
// added a new array
// Array.from && indexOf
function deleteTaskFromLocalStorage(uniqueId) {
    const UniqueIdToNumber = parseInt(uniqueId, 10)
    debugger
   let allTasksToArray2 = allTasksToArray.filter(task => task.uniqueId !== UniqueIdToNumber);
   console.log('allTasksToArray:', allTasksToArray);
   console.log('allTasksToArray2:', allTasksToArray2);
    console.log('uniqueId:', uniqueId);
debugger
    keepTasksInLocalStorage(allTasksToArray2)
    debugger
}




// saving in localstorage function
function keepTasksInLocalStorage(array) {
    const myTasksToString = JSON.stringify(array)
    localStorage.setItem("allTasks", myTasksToString)


}


// retrieving from local storage, צריך להריץ אותה לתוך משתנה

function getTasksFromLocalStorage() {
    const storedTasksInString = localStorage.getItem("allTasks")

    if (storedTasksInString) {

        return JSON.parse(storedTasksInString)
    } else {

        return []
    }


}


function createAllItemsFromLocalStorage() {
    let temp = getTasksFromLocalStorage()

    temp.forEach(element => {
        createHtmlTaskItem(element)

    })



}








// function to clear input fields after adding task
function clearAlldataInputfields(textVl) {

    textVl.value = ""
}

// function to clear the form if wanted

clearFormBtn.addEventListener("click",function () {
    newTaskText.value="" 
    newTaskDate.value=""
    newTaskTime.value=""
})







// also i need to create a boolean check box to select is task is done and then make a line on it  
// with option to edit it



