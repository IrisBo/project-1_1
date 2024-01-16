function createHtmlTaskItem(taskObject) {
    const newTaskItem = document.createElement("div")
    newTaskItem.classList.add("all_new_task")
    for (const key in taskObject) {
        const newTaskItemDiv = document.createElement("div")
        // added new class code
       newTaskItemDiv.classList.add(key)
        const newNodeText = document.createTextNode(taskObject[key])
        newTaskItemDiv.appendChild(newNodeText)
        newTaskItem.appendChild(newTaskItemDiv)
    }
    const deleteTaskBtn = document.createElement("button")
    deleteTaskBtn.classList.add("delete_task")
    const deleteTaskBtnText = document.createTextNode("X")
    deleteTaskBtn.appendChild(deleteTaskBtnText)
    newTaskItem.appendChild(deleteTaskBtn)
    taskDisplayArea.appendChild(newTaskItem)

}