let mainbtn = document.querySelector('p button')
let section = document.querySelector('.sec')
let nameInput = document.querySelector('.form-control')
let overlayPopup = document.querySelector(".overlay-popup")
let errorOverlayPopup = document.querySelector(".error-overlay-popup")
let welcoming = document.querySelector(".overlay-popup .popup h3")
let goAheadBtn = document.querySelector(".overlay-popup .popup button")
let toDoPage = document.querySelector(".to-do-page")
let tasksHeader = document.querySelector(".tasks h2")
let listIcon = document.querySelector(".tasks .title .iconn")
let sideBar = document.querySelector(".side-bar")
let newTaskBtn = document.querySelector(".new-task")
let writeNewDiv = document.querySelector(".write-new")
let newTaskBox = document.querySelector(".task-box")
let userSpan = document.querySelector(".user")
let select = document.querySelector("select")
let maleImg = document.querySelector(".male")
let addTask = document.querySelector(".add")
let favTask = document.querySelector(".fav")
let addingInput = document.querySelector(".task-box input")
let added = document.querySelector(".added")
let tasksNumber = document.querySelector(".info .name p")
let all = document.querySelector(".all")
let inProgress = document.querySelector('.in-progress')
let completed = document.querySelector(".completed")
let favourite = document.querySelector('.favourite')
let trash = document.querySelector('.trash')
let reset = document.querySelector('.reset')
let trashAll = document.querySelector('.trash-all')
let empty = document.querySelector('.empty')
let star = document.querySelector('.iconns .fav svg')
let searhBar = document.querySelector('.search input')


console.log(added)
console.log(addingInput)
console.log(favTask)
console.log(listIcon)
console.log(sideBar)
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
onload = counting
let todoData = []
const lists = {
    all: 'all',
    inProgress: 'inProgress',
    completed: 'completed',
    trash: 'trash',
    favourite: 'favourite'
} 
let activeList = lists.all;




let name = document.querySelector('.name h2')
if(window.localStorage.getItem('user')){
    section.style.display = 'none'
    toDoPage.style.display = 'flex'
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(nameInput)
    name.innerHTML = `${user.name}'s todo`
    if (user.gender == 'female'){
        maleImg.innerHTML = `<img src="css/female.png" width="100px" alt="">`
    }
    console.log(JSON.parse(localStorage.getItem('user')))
}

if (window.localStorage.getItem('todos') != null){
    todoData = JSON.parse(localStorage.todos);
   todoData.forEach(todo => {
    let element = todoToHtml(todo)
    added.append(element)
   })
console.log(todoData)

}

mainbtn.addEventListener("click", function () {
    
    if (nameInput.value.length > 0) {
        section.style.display = "none"
        userSpan.innerHTML = nameInput.value[0].toUpperCase() + nameInput.value.slice(1)
        overlayPopup.style.display = "block"
        const user = {

            name: nameInput.value,
            gender: select.value
        }
        
        if (select.value === "female") {
            maleImg.innerHTML = `<img src="css/female.png" width="100px" alt="">`
        }

        window.localStorage.setItem('user', JSON.stringify(user))
    }
    else {
        errorOverlayPopup.style.display = "block"
    }

    errorOverlayPopup.addEventListener("click", function () {
        errorOverlayPopup.style.display = "none"
    })
})

goAheadBtn.addEventListener("click", function () {
    overlayPopup.style.display = "none"
    toDoPage.style.display = "flex"
    tasksHeader.innerHTML = `${nameInput.value[0].toUpperCase() + nameInput.value.slice(1)}'s TODO`
})


function active() {
    sideBar.classList.toggle("active")
}
listIcon.addEventListener("click", active);

document.addEventListener('click', (e) => {
    let icon = e.target.closest('.iconn');


    let nav = e.target.closest('.side-bar')

    if (!nav && !icon) sideBar.classList.remove("active")


})

function closingTaskBox() {
    writeNewDiv.style.width = "0%"
    writeNewDiv.style.height = "0%"
    writeNewDiv.style.opacity = "0"
    writeNewDiv.style.transform = "translateY(0px)"
    newTaskBox.style.padding = "0px"
}

newTaskBtn.addEventListener("click", function () {
    addingInput.focus()
    writeNewDiv.style.width = "100%"
    writeNewDiv.style.height = "100%"
    writeNewDiv.style.opacity = "1"
    newTaskBox.style.padding = "80px"
})


document.addEventListener("click", (e) => {
    let writeNew = e.target.closest(".wrtie-new")
    let newTask = e.target.closest(".new-task")
    let taskBox = e.target.closest(".task-box")
    if (!newTask && !taskBox) {
        closingTaskBox()
    }
})

favTask.addEventListener('click' , _ => {
    document.querySelector('.iconns .fav svg').classList.toggle('colored')
})

function todoToHtml(obj) {
    const todo = document.createElement('div');
    todo.dataset.id = obj.id;
    todo.classList = `added-content  ${obj.isFav ? 'go-favourite' : ''} ${obj.isChecked ? 'go-completed' : 'go-progress'} ${obj.isDel ? 'go-trash' : ''} `;

    let date = new Date(obj.id);
    console.log(date)
            let Hours = date.getHours()
        let min = date.getMinutes()
        var suffix = "AM"; //cunverting 24Hours to 12Hours with AM & PM suffix
        	if (Hours >= 12) {
        		suffix = "PM";
        		Hours = Hours - 12;
        	}
        	if (Hours === 0) {
        		Hours = 12;
        	}
            	if (Hours < 10) {
        		Hours = "0" + Hours;
        	}

            	if (min < 10) {
        		min = "0" + min;
        	}


    let todoHtml = `

    <div class="empty ${obj.isChecked ? 'disable' : 'enable'}"></div>
    <label class="check-and-label">
    <input type="checkbox" id="content" class="checkbox__input" ${obj.isChecked ? 'checked': ''}>
    <span class="checkbox__inner ${obj.isChecked ? 'checked': ''}" onclick="toggleEmptyDiv(this)"></span>
    <label class="${obj.isChecked ? 'decoration': ''}">${obj.content}</label>
    </label>
    <div class="right-div">
    <div class="more-div" onclick="toggleMoreList(this)">
    <i class="fa-solid fa-ellipsis-vertical more-icon"></i>
     <ul class="more-list">
        <li class="edit">Edit</li>
        <li class="favo"  onclick="toggleFavStar(this)">${obj.isFav ? 'Unfavourite': 'Favourite'}</li>
        <li class="del" onclick="toggleTrashClass(this)">${obj.isDel ? 'Restore': 'Delete'}</li>
     </ul>

     </div>
     <button style="display: none;">Save</button>
     </div>
     <div style="flex-basis: 100%; height: 0%;"></div>
     <span class="span-time"> ${Hours}:${min} ${suffix} - ${Days[date.getDay()]}  ${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}
     <i class="fa-solid fa-star star-icon ${obj.isFav ? 'exist': ''}" style="color: rgb(255, 164, 43); margin-left: 10px; visibility: hidden;"></i> </span>
    `
    addingInput.value = ''
    todo.innerHTML = todoHtml;

    let saveBtn = todo.querySelector('button')
    let edit = todo.querySelector('.edit')
    edit.addEventListener('click', function () {
        let label = todo.querySelector('label label');
        label.contentEditable = true;
        label.focus();
        saveBtn.className = "save-btn"
        saveBtn.innerHTML = "Save"
        saveBtn.style.display = "block"

        saveBtn.addEventListener('click', function () {
            
            let todoId = todo.dataset.id;
            todoData.forEach(todo => {
                if (todo.id == todoId) todo.content = label.innerHTML;
            })
            label.contentEditable = false;
            saveBtn.style.display = 'none'
        })
    })

    return todo;
}
favTask.addEventListener('click', function () {
    favTask.classList.toggle('active')
});


function toggleMoreList(div) {
    let moreList = div.querySelector('.more-list');


    moreList.classList.toggle("visiblee")


    document.addEventListener('click', function (e) {

        let moree = e.target.closest('.more-div')
        if (!moree) {
            moreList.classList.remove("visiblee")
        }

    })


}

function toggleFavStar(div) {
    let todo = div.closest(".added-content")
    let starIcon = todo.querySelector('.star-icon')
    starIcon.classList.toggle('exist')
    if (starIcon.classList.contains('exist')) {
        console.log('hi')
        console.log(div)
        div.innerHTML = 'Unfavourite'
    } else { div.innerHTML = 'Favourite' }
    console.log(todoData)
    todo.classList.toggle("go-favourite")
    console.log(todo.dataset.id)

    if(activeList == lists.favourite){
        todo.remove()
    }

    todoData.forEach(singleTodo => {
        if (todo.dataset.id == singleTodo.id) {
            singleTodo.isFav = !singleTodo.isFav;
        }
    })
    console.log(todoData)
}

function toggleEmptyDiv(div) {
    let todo = div.closest(".added-content")
    let empty = div.closest(".added-content").firstChild.nextSibling
    let label = div.nextSibling.nextSibling
    todo.classList.toggle("go-completed")
    todo.classList.toggle("go-progress")
    empty.classList.toggle('disable')
    empty.classList.toggle('enable')
    label.classList.toggle('decoration')

    
    if(activeList == lists.completed && todo.classList.contains('go-progress')){
        todo.remove()
    }
    if(activeList == lists.inProgress && todo.classList.contains('go-completed')){
        todo.remove()
    }

    todoData.forEach(singleTodo => {
        if (todo.dataset.id == singleTodo.id) {
            singleTodo.isChecked = !singleTodo.isChecked;
        }
    })
    console.log(todoData)
}

function toggleTrashClass(btn){
    let todo = btn.closest(".added-content")
    todo.classList.add('go-trash')

    btn.parentElement.parentElement.parentElement.parentElement.classList.remove('go-favourite')
    todoData.forEach(singleTodo => {
        if (todo.dataset.id == singleTodo.id) {
            singleTodo.isDel = !singleTodo.isDel;
        }
    })

    todo.remove()
    console.log(todoData)

}
let isFavourite = favTask.classList.contains('active')




addTask.addEventListener("click", function () {
    
    
    if (addingInput.value.length >= 1) {
        // tell me if fav icon has active or not.
        // let todo = document.querySelector('.added-content')
        
        let todoObj = {
            content: addingInput.value,
            id: Date.now(),
            isChecked: false,
            isFav: isFavourite,
            isDel: false,
        }

        console.log(todoObj)
        console.log(todoToHtml(todoObj))

        todoData.push(todoObj)
        window.localStorage.setItem('todos', JSON.stringify(todoData))
        console.log(todoData)
        console.log(todoObj)
        closingTaskBox()
        added.append(todoToHtml(todoObj))
        let rightDiv = document.querySelector(".right-div")
        let saveBtn = document.createElement('button')
        rightDiv.appendChild(saveBtn)
        saveBtn.style.display = "none"

        counting()

    }
})
let sure = document.querySelector('.sure')
let yesBtn = document.querySelector('.yes-btn')
let noBtn = document.querySelector('.no-btn')
reset.addEventListener('click', () => {
    reset.style.display = "none"
    trashAll.style.display = "none"
    sure.style.display = "block"
    yesBtn.addEventListener('click', () => {
        todoData = []
        added.innerHTML = '';
        counting()
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })
    noBtn.addEventListener('click', function () {
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })

})

searhBar.addEventListener('input', (e) => {
    if (searhBar.value !== '') {
        all.click()
        added.innerHTML = '';
        todoData.forEach(todo => {
            if (todo.content.startsWith(searhBar.value)) {
                added.append(todoToHtml(todo))
            }
        })
    } else {
        updateMainBlock()
    }
})


trashAll.addEventListener('click', () => {
    reset.style.display = "none"
    trashAll.style.display = "none"
    sure.style.display = "block"

    yesBtn.addEventListener('click', () => {

        todoData =  todoData.filter(todo => !todo.isDel)
        console.log(todoData)

        counting()
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })

    noBtn.addEventListener('click', function () {
        reset.style.display = "flex"
        trashAll.style.display = "flex"
        sure.style.display = "none"
    })


})

function updateMainBlock() {
    added.innerHTML = '';

    switch (activeList) {
        case lists.all:
            todoData.forEach(todo => {
                if(todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.inProgress:
            todoData.forEach(todo => {
                if(todo.isChecked == false && todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.completed:
            todoData.forEach(todo => {
                if(todo.isChecked == true && todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.favourite:
            todoData.forEach(todo => {
                if(todo.isFav == true && todo.isDel == false){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        case lists.trash: 
            todoData.forEach(todo => {
                if (todo.isDel){
                    added.append(todoToHtml(todo))
                }
            })
            break;
        default:
            break;
    }
}

all.addEventListener('click', function () {
    activeList = lists.all;
    updateMainBlock()
})




inProgress.addEventListener('click', function () {
    activeList = lists.inProgress;
    updateMainBlock()

})


completed.addEventListener('click', function () {
    activeList = lists.completed;
    updateMainBlock()
})



favourite.addEventListener('click', function () {
    activeList = lists.favourite;
    updateMainBlock()
})


trash.addEventListener('click', function () {
    activeList = lists.trash;
    updateMainBlock()
    // added.innerHTML = ''
    // todoData.forEach(todo => {
    //     if (todo.isDel){
    //         added.append(todoToHtml(todo))
    //     }
    // })
    // addTask.addEventListener('click' , function(){
    //     adddedContent.style.display = "none"
    // })
    // let empty= document.querySelector('.empty')

    // if (!adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "none"

    // }

    // if (adddedContent.classList.contains("go-trash")) {
    //     adddedContent.style.display = "flex"
    //     if (del.innerHTML = 'Restore') {
    //         del.onclick = function () {
    //             adddedContent.classList.remove("go-trash")
    //             if (empty.classList.contains("enable")) {
    //                 adddedContent.classList.add('go-progress')
    //                 adddedContent.classList.remove('go-completed')
    //             }
    //             if (empty.classList.contains("disable")) {
    //                 adddedContent.classList.add('go-completed')
    //                 adddedContent.classList.remove('go-progress')
    //             }

    //             if (favo.innerHTML = "Favourite") {
    //                 adddedContent.classList.remove('go-favourite')
    //             }
    //             if (favo.innerHTML = "Unfavourite") {
    //                 adddedContent.classList.add('go-favourite')
    //             }
    //             // if(myFav.classList.contains('exist')){
    //             //     adddedContent.classList.add('go-favourite')
    //             // }
    //             counting()

    //         }
    //         favo.addEventListener('click', function () {
    //             !adddedContent.classList.add('go-favourite')
    //             !adddedContent.classList.remove('go-favourite')
    //         })
    //     }


    // }
    // inner.onclick = function () {
    //     adddedContent.style.display = "flex"
    //     adddedContent.className = "added-content go-trash"

    // }
})

function counting() {
    let allSpan =   document.querySelector('.all-span')
    let progSpan = document.querySelector('.progress-span')
    let compSpan = document.querySelector('.completed-span')
    let favouriteSpan = document.querySelector('.favourite-span')
    let trashSpan = document.querySelector('.trash-span')
    
    console.log(document.querySelectorAll('.go-progress').length)

    let all = todoData.filter(todo => !todo.isDel)
    let comp = todoData.filter(todo => !todo.isDel && todo.isChecked)
    let prog = todoData.filter(todo => !todo.isDel && !todo.isChecked)
    let favv = todoData.filter(todo => !todo.isDel && todo.isFav)
    let removed = todoData.filter(todo => todo.isDel)

    allSpan.innerHTML = all.length
    progSpan.innerHTML = prog.length
    compSpan.innerHTML = comp.length
    favouriteSpan.innerHTML = favv.length
    trashSpan.innerHTML = removed.length

}

function changeLiBackground() {
    all.style.background = "none"
    inProgress.style.background = "none"
    completed.style.background = "none"
    favourite.style.background = "none"
    trash.style.background = "none"
    this.style.background = "black"
    all.style.color = "black"
    inProgress.style.color = "black"
    completed.style.color = "black"
    favourite.style.color = "black"
    trash.style.color = "black"
    if (this == all) {
        this.style.color = "var(--mainColor)"
    }
    else if (this == inProgress) {
        this.style.color = "white"
    }
    else if (this == completed) {
        this.style.color = "rgb(74 219 216)"
    } else if (this == favourite) {
        this.style.color = "rgb(255 217 1)"
    } else { this.style.color = "rgb(255 66 66)" }
}
all.click()

all.addEventListener('click', changeLiBackground)
inProgress.addEventListener('click', changeLiBackground)
completed.addEventListener('click', changeLiBackground)
favourite.addEventListener('click', changeLiBackground)
trash.addEventListener('click', changeLiBackground)





document.addEventListener('click', counting)



