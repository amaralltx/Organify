export class Task {
    #createDomElement() {
        const $task = document.createElement('div');
        const $hour = document.createElement('span');
        const $title = document.createElement('div');
        const $modal = document.createElement('div');

        $task.classList.add("week_task");
        $hour.classList.add("week_task_hour");
        $title.classList.add("week-task-title");

        $task.dataset.total_min = this.date.getHours() * 60 + this.date.getMinutes();

        $task.appendChild($hour);
        $task.appendChild($title);

        this.$dom_element = $task;
        this.$dom_parent.appendChild(this.$dom_element);

        this.#updateDomElement();

        this.$dom_element.addEventListener('click', e =>{
            e.preventDefault();
            this.#showTaskDetails();
        })   
    }

    #updateDomElement() {
        const $hour = this.$dom_element.querySelector(".week_task_hour");
        const $title = this.$dom_element.querySelector(".week-task-title");

        $hour.innerHTML = this.date.getHours() + ":" + this.date.getMinutes();
        $title.innerHTML = this.title;
    }

    #showTaskDetails(){
        const $modal = document.createElement('div');
        const $modal_body = document.createElement('div');

        const $modal_title = document.createElement('h3');
        $modal_title.innerHTML = this.title;

        const $modal_date = document.createElement('span');
        $modal_date.innerHTML = "" + this.date.getHours() + ":" +
        this.date.getMinutes() + " - " + this.date.getDate() + "/" + this.date.getMonth() + "/" + this.date.getFullYear();

        const $div_checkbox = document.createElement('div');

        const $modal_checkbox = document.createElement('input');
        $modal_checkbox.type = "checkbox";
        $modal_checkbox.id = "finish-task";
        $modal_checkbox.checked = false;

        const $checkbox_text = document.createElement('label');
        $checkbox_text.innerHTML = "Concluída"
        $checkbox_text.for = "finish-task";

        const $modal_text_area = document.createElement('textarea');
        $modal_text_area.rows = "15";
        $modal_text_area.cols = "40";
        if(this.description){
            $modal_text_area.value = this.description;
        }else {
            $modal_text_area.placeholder = "Sem descrição..."
        }

        const $modal_btn = document.createElement('input');
        $modal_btn.type = "button";
        $modal_btn.value = "Salvar"

        $modal.classList.add("modal-task-details");
        $modal_body.classList.add("modal-task-details-body");
        $modal_title.classList.add("modal-task-details-title")
        $modal_date.classList.add("modal-task-details-date");
        $div_checkbox.classList.add("modal-task-datails-div-checkbox");
        $modal_checkbox.classList.add("modal-task-datails-checkbox");
        $modal_text_area.classList.add("modal-task-details-description");
        $modal_btn.classList.add("modal-task-datails-btn");

        body.appendChild($modal);
        $modal.appendChild($modal_body);
        $modal_body.appendChild($modal_title);
        $modal_body.appendChild($modal_date);
        $div_checkbox.appendChild($modal_checkbox);
        $div_checkbox.appendChild($checkbox_text);
        $modal_body.appendChild($div_checkbox);
        $modal_body.appendChild($modal_text_area);
        $modal_body.appendChild($modal_btn);
        

        $modal_checkbox.addEventListener('click', e => {
            e.preventDefault();
            $modal_checkbox.checked = true;
        })

        $modal_btn.addEventListener('click', e => {
            if($modal_checkbox.checked){
                this.$dom_element.remove();
            }
            this.edit({
                description: document.querySelector('.modal-task-details-description').value
            });
            $modal.remove();
        })
        $modal.addEventListener('click', e => {
            e.preventDefault();
            if(e.target.classList.contains("modal-task-details"))
                $modal.remove();
        })
    }

    constructor(args) {
        const { title, description, date, tags_ids, dom_parent } = args;

        this.id = 1;
        this.title = title;
        this.description = description;
        this.date = date;
        this.completed = false;
        this.tags_ids = tags_ids;

        this.$dom_parent = dom_parent;
        this.#createDomElement();
    }

    edit(args) {
        const { title, description, date, completed, tags_ids } = args;

        if(title != null) this.title = title;
        if(description != null) this.description = description;
        if(date != null) this.date = date;
        if(completed != null) this.completed = completed;
        if(tags_ids != null) this.tags_ids = tags_ids;

        this.#updateDomElement();
    }

    
}
