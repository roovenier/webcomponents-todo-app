const templateCss = `
    .todo-list {
        margin: 0 0 30px;
        padding: 0;
        list-style-position: inside;
    }

    .todo-item {
        position: relative;
        margin: 8px 0;
        padding-right: 30px;
        width: 250px;
        box-sizing: border-box;
        line-height: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .todo-item-remove {
        position: absolute;
        right: 0;
        color: red;
        font-weight: bold;
        border: 0;
        padding: 0;
        height: 20px;
        width: 20px;
        background: #000;
        border-radius: 4px;
        cursor: pointer;
    }

    .todo-add-form {
        width: 250px;
        display: flex;
    }

    .todo-add-input {
        height: 30px;
        border: 2px solid #222;
        outline: 0;
        color: #333;
        background: #eee;
        padding: 0 15px;
        flex: 1;
    }

    .todo-add-button {
        border: 0;
        padding: 0 15px;
        background: #222;
        color: #eee;
        cursor: pointer;
    }
`;

class Template {
    #todoList;
    #formAddHandler;
    #removeItemButtonHandler;
    #ulElement;
    #template;

    constructor({
        todoList,
        formAddHandler,
        removeItemButtonHandler,
    }) {
        this.#todoList = todoList;
        this.#formAddHandler = formAddHandler;
        this.#removeItemButtonHandler = removeItemButtonHandler;
        this.#template = this.createTemplate();
    }

    createFormAddItemElement() {
        const formElement = document.createElement('form');
        formElement.classList.add('todo-add-form');
        formElement.addEventListener('submit', (event) => {
            this.#formAddHandler(event, inputElement.value.trim());
            inputElement.value = '';
            this.renderList();
        });
        
        const inputElement = document.createElement('input');
        inputElement.classList.add('todo-add-input');
        inputElement.placeholder = 'Todo Title';
    
        const addButton = document.createElement('button');
        addButton.classList.add('todo-add-button');
        addButton.innerText = 'Add';
    
        formElement.appendChild(inputElement);
        formElement.appendChild(addButton);
    
        return formElement;
    }
    
    createListElement() {
        this.#ulElement = document.createElement('ul');
        this.#ulElement.classList.add('todo-list');

        this.renderList();

        return this.#ulElement;
    }

    getListItemsMarkup(todoList) {
        const liElements = todoList.map((todoItem) => {
            const removeButton = document.createElement('button');
            removeButton.innerText = 'X';
            removeButton.classList.add('todo-item-remove');
            removeButton.addEventListener('click', () => {
                this.#removeItemButtonHandler(todoItem.id);
                this.renderList();
            });

            const liElement = document.createElement('li');
            liElement.classList.add('todo-item');
            liElement.innerText = `${todoItem.title} `;
            liElement.appendChild(removeButton);

            return liElement;
        });

        return liElements;
    }

    renderList() {
        const liItems = this.getListItemsMarkup(this.#todoList);

        this.#ulElement.innerHTML = '';

        for (let liElement of liItems) {
            this.#ulElement.appendChild(liElement);
        }
    }

    createTemplate() {
        const templateElement = document.createElement('template');
        templateElement.id = 'todo-app-template';

        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(templateCss));

        templateElement.content.appendChild(styleElement);
        templateElement.content.appendChild(this.createListElement());
        templateElement.content.appendChild(this.createFormAddItemElement());

        return templateElement;
    }

    getTemplate() {
        return this.#template;
    }

    setTodoList(todoList) {
        this.#todoList = todoList;
    }
}

export default Template;
