// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input") as HTMLInputElement;

// Classes names
const CHECK: string = "fa-check-circle";
const UNCHECK: string = "fa-circle-thin";
const LINE_THROUGH: string = "lineThrough";

// Variables
let LIST: any = [], id: number = 0;

// get item from localstorage
let data: string = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array: any){
    array.forEach(function(item:any){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(): void{
    localStorage.clear();
    location.reload();
});

// Show todays date
const options: any = {weekday : "long", month:"short", day:"numeric"};
const today: Date = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function

function addToDo(toDo: string, id: number, done: boolean, trash: boolean){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <button class="${DONE} complete" job="complete" id="${id}">Done</button>
                    <p class="text ${LINE}">${toDo}</p>
                    <button class="delete" job="delete" id="${id}">Delete</button>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// add an item to the list by pressing the enter key
document.addEventListener("keyup",function(event: KeyboardEvent){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element: any){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element: any){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event: MouseEvent){
    const element: any = event.target; // return the clicked element inside list
    const elementJob: any = element.attributes.job.value; // complete or delete
    console.log("elementJob", elementJob);
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});