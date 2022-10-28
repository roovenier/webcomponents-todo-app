import defaultTemplate from './template.js'

class TodoApp extends HTMLElement {
    connectedCallback() {
        this.todoList = JSON.parse(this.getAttribute('data-todo-list')).map((todoItem) => ({
            id: this.generateRandomId(),
            title: todoItem,
        }));

        this.template = new defaultTemplate({
            todoList: this.todoList,
            formAddHandler: this.formAddHandler.bind(this),
            removeItemButtonHandler: this.removeItemButtonHandler.bind(this),
        });

        this.renderComponent();
    }

    generateRandomId() {
        return Math.random().toString(16).slice(2);
    }

    formAddHandler(event, title) {
        event.preventDefault();
        
        if (!title) return;
        
        this.todoList.push({
            id: this.generateRandomId(),
            title,
        });

        this.template.setTodoList(this.todoList);
    }

    removeItemButtonHandler(todoItemId) {
        this.todoList = this.todoList.filter((todoItem) => todoItem.id !== todoItemId);

        this.template.setTodoList(this.todoList);
    }

    renderComponent() {
        const templateContent = this.template.getTemplate().content;
        const shadowRoot = this.attachShadow({ mode: "open" });

        shadowRoot.appendChild(templateContent);
    }
}

window.customElements.define('todo-app', TodoApp);
