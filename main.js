let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const Userinput = document.getElementById("Userinput");
        const addBtn = document.getElementById("addBtn");
        const todoBoard = document.getElementById("todo");
        const doingBoard = document.getElementById("doinit");

        let draggedIndex = null; 

        displayTasks();

        addBtn.addEventListener("click", () => {
            const text = Userinput.value.trim();
            if (text === "") return alert("You didn't write anything");

            tasks.push({ text: text, completed: false });
            saveAndRender();
            Userinput.value = "";
        });

        Userinput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") addBtn.click();
        });

        function displayTasks() {
            todoBoard.innerHTML = "<h2>Waitin tobe finished</h2>";
            doingBoard.innerHTML = "<h2>Workin onit</h2>";

            tasks.forEach((task, index) => {
                const taskEl = document.createElement("div");
                taskEl.classList.add("task");
                taskEl.textContent = task.text;
                taskEl.setAttribute("draggable", "true");

                const delBtn = document.createElement("button");
                delBtn.textContent = "❌";
                delBtn.classList.add("delete-btn");
                delBtn.onclick = () => {
                    tasks.splice(index, 1);
                    saveAndRender();
                };

                taskEl.appendChild(delBtn);

                taskEl.addEventListener("dragstart", () => {
                    draggedIndex = index;
                    taskEl.style.opacity = "0.5";
                });

                taskEl.addEventListener("dragend", () => {
                    taskEl.style.opacity = "1";
                });

                if (task.completed) {
                    doingBoard.appendChild(taskEl);
                } else {
                    todoBoard.appendChild(taskEl);
                }
            });
        }

        [todoBoard, doingBoard].forEach(board => {
            board.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            board.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedIndex === null) return;

                const task = tasks[draggedIndex];

                if (board.id === "doinit") {
                    task.completed = true;
                } else {
                    task.completed = false;
                }

                saveAndRender();
            });
        });

        function saveAndRender() {
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        }