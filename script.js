

// connections

const newTaskText = document.querySelector(".text_input")
const newTaskDate = document.querySelector(".date_input")
const newTaskTime = document.querySelector(".time_input")
const addNewTaskBtn = document.querySelector(".save_new_task_btn")
const clearFormBtn = document.querySelector(".clear_form_btn")
const taskDisplayArea = document.getElementById("display_area")



let allTasksToArray = []


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
    let timeStampId = Date.now()

    // adding a validation for the input


    if (taskTextValue.trim() === '' || taskDateValue.trim()===``|| taskTimeValue.trim()===`` ) {
    
        alert('Please enter all input fields')} else {

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

        }
})





function createHtmlTaskItem(taskObject) {
    const newTaskItem = document.createElement("div")
    newTaskItem.classList.add("all_new_task")
    setTimeout(() => {
        newTaskItem.classList.add("appear")
    }, 10)

    newTaskItem.dataset.uniqueId = taskObject.uniqueId

    for (const key in taskObject) {

        if (key !== `uniqueId`) {
            const newTaskItemDiv = document.createElement("div")
            newTaskItemDiv.classList.add(key)
            const newNodeText = document.createTextNode(taskObject[key])
            newTaskItemDiv.appendChild(newNodeText)
            newTaskItem.appendChild(newTaskItemDiv)
        }
    }

    const deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete_task")
    const deleteTaskBtnText = document.createTextNode("X")
    deleteTaskBtn.appendChild(deleteTaskBtnText)
    newTaskItem.appendChild(deleteTaskBtn)
   

    const checkboxIfTaskFinished = document.createElement("input")
    checkboxIfTaskFinished.type = "checkbox"
    checkboxIfTaskFinished.classList.add("show_if_finished")
    const labelForCheckbox=document.createElement("label")
    labelForCheckbox.textContent="Done"
    labelForCheckbox.setAttribute("for","checkboxIfTaskFinished")
    labelForCheckbox.classList.add("label_for_checkbox")

    newTaskItem.appendChild(checkboxIfTaskFinished)
    newTaskItem.appendChild(labelForCheckbox)

    taskDisplayArea.appendChild(newTaskItem)


     // adding eventlistener to show when task is done checkbox

     checkboxIfTaskFinished.addEventListener("change", function () {
        if (checkboxIfTaskFinished.checked) {
            newTaskItem.classList.add("finished_task")
        } else {
            newTaskItem.classList.remove("finished_task")
        }
    })





// adding eventlistener for the delete button
    deleteTaskBtn.addEventListener("click", function () {
        const uniqueIdTask = newTaskItem.dataset.uniqueId
        newTaskItem.remove()
        deleteTaskFromLocalStorage(uniqueIdTask)

    });

}


// deleting task from local storage using the unique ID

function deleteTaskFromLocalStorage(uniqueId) {
    
    const UniqueIdToNumber = parseInt(uniqueId, 10)
   
     allTasksToArray = allTasksToArray.filter(task => task.uniqueId !== UniqueIdToNumber)
    
    keepTasksInLocalStorage(allTasksToArray)

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

clearFormBtn.addEventListener("click", function () {
    newTaskText.value = ""
    newTaskDate.value = ""
    newTaskTime.value = ""
})



