let todoInput, errorInfo, addBtn, ulList;

let popup, popupInfo, todoToEdit, popupInput, popupAddBtn, popupCloseBtn;

const main = () => {
	prepareDOMEvents();
	prepareDOMElements();
};

const prepareDOMEvents = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMElements = () => {
	addBtn.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTodoText);
	todoInput.addEventListener("keydown", enterKeyCheck);
	popupInput.addEventListener("keydown", enterKeyCheckPopup);
};

let numberOfTasks = 0;

const addNewTask = () => {
	if (todoInput.value !== "") {
		const newLiElement = document.createElement("li");
		ulList.appendChild(newLiElement);
		numberOfTasks++;
		newLiElement.dataset.id = `test${numberOfTasks}`;

		const todoText = document.createTextNode(todoInput.value);

		newLiElement.appendChild(todoText);

		createToolsArea(newLiElement);

		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Wpisz treść zadania!";
	}
};

const createToolsArea = (element) => {
	const newDivTools = document.createElement("div");
	newDivTools.classList.add("tools");
	element.appendChild(newDivTools);

	const newCompleteBtn = document.createElement("button");
	const newEditBtn = document.createElement("button");
	const newDeleteBtn = document.createElement("button");

	newCompleteBtn.classList.add("complete");
	newEditBtn.classList.add("edit");
	newDeleteBtn.classList.add("delete");

	newCompleteBtn.innerHTML = `<i class="fas fa-check"></i>`;
	newDeleteBtn.innerHTML = `<i class="fas fa-times"></i>`;

	newEditBtn.textContent = "edit".toUpperCase();

	newDivTools.append(newCompleteBtn, newEditBtn, newDeleteBtn);
};

const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTodo(e);
	} else if (e.target.matches(".delete")) {
		deleteTodo(e);
	}
};

const editTodo = (e) => {
	todoToEdit = e.target.closest("li");

	popupInput.value = todoToEdit.firstChild.textContent;

	popup.style.display = "flex";
};

const closePopup = () => {
	popup.style.display = "none";
	popupInfo.textContent = "";
};

const changeTodoText = () => {
	if (popupInput.value !== "") {
		todoToEdit.firstChild.textContent = popupInput.value;
		closePopup();
	} else {
		popupInfo.textContent = "Wpisz treść zadania!";
	}
};

const deleteTodo = (e) => {
	e.target.closest("li").remove();

	const allTodos = ulList.querySelectorAll("li");

	if (allTodos.length === 0) {
		errorInfo.textContent = "Brak zadań na liście.";
	} else {
		errorInfo.textContent = "";
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTask();
	}
};

const enterKeyCheckPopup = (e) => {
	if (e.key === "Enter") {
		changeTodoText();
	}
};

document.addEventListener("DOMContentLoaded", main);
