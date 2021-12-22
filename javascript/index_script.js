import { Task } from "./task.mjs"

/*GLOBAIS*/
let currDate = new Date(2021, 11, 28)

let curr_month = currDate.getMonth();
let curr_year = currDate.getFullYear();
let days_of_month = [31, getFevDays(curr_year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_names = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outrubro', 'Novembro', 'Dezembro'];
let finished_tasks = [];
function isLeapYear(year){
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0);
}

function getFevDays(year){
    return isLeapYear(year) ? 29 : 28;
}

/*ANIMAÇÃO SEARCH BTN ---------------------------------------------------------------------*/
let btn = document.querySelector(".search-btn");
let txt = document.querySelector(".search-txt");
btn.addEventListener('click', e => {
    e.preventDefault();
    btn.classList.toggle("search-btn-alt");
    txt.classList.toggle("search-txt-alt");

});
/*NOVO EVENTO/TAREFA SEMANAL---------------------------------------------*/

let new_btn =  document.querySelector(".new-btn");

new_btn.addEventListener('click', e => {
    e.preventDefault();
    showTaskOrEventBtn();
});

/*SHOW / HIDE NEW BTN*/
function showNewBtn(){
    new_btn = document.querySelector(".new-btn");
    new_btn.classList.add(".new-btn");
    new_btn.classList.remove("hidden-new-btn");
}

function closeNewBtn(){
    new_btn = document.querySelector(".new-btn");
    new_btn.classList.remove(".new-btn");
    new_btn.classList.add("hidden-new-btn");
}

/*SHOW / HIDE BOTÃO TAREFA OU TASK SEMANAL*/
function showTaskOrEventBtn() {
    closeNewBtn();
    let new_modal = document.querySelector(".new-modal");
    new_modal.classList.add("show-new-modal");
}

function closeNewWeekTaskModal() {
    let new_modal = document.querySelector(".new-modal");
    new_modal.classList.remove("show-new-modal");
}
/*-----------------------------------------------------------------------*/
/*MOSTRAR A JANELA DE NOVA TAREFA SEMANAL AO CLICAR NO BOTÃO*/
let new_task_week_btn = document.querySelector("#new-week-task");
new_task_week_btn.addEventListener('click', e => {
    e.preventDefault();
    showWeekTaskModal();
})
/*MOSTRAR A JANELA DE NOVO EVENTO SEMANAL AO CLICAR NO BOTÃO*/
let new_event_week_btn = document.querySelector("#new-week-event");
new_event_week_btn.addEventListener('click', e => {
    e.preventDefault();
    showWeekEventModal();
})

/*SHOW WEEK TASK MODAL*/
function  showWeekTaskModal(){
    closeWeekEventModal();
    let modal = document.querySelector(".new-week-task-modal");
    modal.classList.add("show-new-week-task-modal");
}

/*CLOSE WEEK TASK MODAL*/
let exit_btn_week_task_modal = document.querySelector("#exit-btn-new-week-task-modal");
exit_btn_week_task_modal.addEventListener('click', e =>{
    e.preventDefault();
    closeNewWeekTaskModal();
    showNewBtn();
    closeWeekTaskModal();
})
function closeWeekTaskModal(){
    let modal = document.querySelector(".new-week-task-modal");
    modal.classList.remove("show-new-week-task-modal");
}

/*SHOW WEEK EVENT MODAL*/
function showWeekEventModal(){
    closeWeekTaskModal();
    let modal = document.querySelector(".new-week-event-modal");
    modal.classList.add("show-new-week-event-modal");
}
/*CLOSE WEEK EVENT MODAL*/
let exit_btn_week_event_modal = document.querySelector("#exit-btn-new-week-event-modal");
exit_btn_week_event_modal.addEventListener('click', e =>{
    e.preventDefault();
    showNewBtn();
    closeNewWeekTaskModal();
    closeWeekEventModal();
})

function closeWeekEventModal(){
    let modal = document.querySelector(".new-week-event-modal");
    modal.classList.remove("show-new-week-event-modal");
}
/*CALENDARIO LATERAL -------------------------------------------------*/
let sidebar_calendar =  document.querySelector(".sidebar-calendar");

const generateCalendar = (month, year) => {

    let sidebar_calendar_days = sidebar_calendar.querySelector('.sidebar-calendar-days');
    let sidebar_calendar_header_year = sidebar_calendar.querySelector(".sidebar-calendar-year");
    let sidebar_month = sidebar_calendar.querySelector(".sidebar-calendar-month")

    let currDate = new Date();

    let curr_month = month_names[month];

    sidebar_month.innerHTML = curr_month;
    sidebar_calendar_header_year.innerHTML = year;

    let first_day = new Date(year, month, 1);

    for (let i = 0; i < first_day.getDay (); i++){
        let day = document.createElement('div');
        day.classList.add("sidebar-calendar-days-grey");
        if (month == 0){
            let last_year = new Date(year - 1, 11,1);
            day.innerHTML = days_of_month[last_year.getMonth()-1] - first_day.getDay() + i + 1;
        }
        else{
            day.innerHTML = days_of_month[month-1] - first_day.getDay() + i + 1;
        }
        sidebar_calendar_days.appendChild(day);
    }

    for (let i = 1; i <= days_of_month[month]; i++){

        let day = document.createElement('div');
        day.innerHTML = i;
        if(currDate.getDate() == i && month === currDate.getMonth() && year === currDate.getFullYear()){
            day.classList.add("sidebar-calendar-curr-day");
        }
        sidebar_calendar_days.appendChild(day);
    }

    if ((days_of_month[month] + first_day.getDay()) >= 36){
        for (let i = 0; i < 6 - ((days_of_month[month] + first_day.getDay()-1) % 7) ; i++){
            let day = document.createElement('div');
            day.classList.add("sidebar-calendar-days-grey");
            day.innerHTML = i+1;
            sidebar_calendar_days.appendChild(day);
        }
    }else{
        for (let i = 0; i < 13 - ((days_of_month[month] + first_day.getDay()-1) % 7) ; i++){
            let day = document.createElement('div');
            day.classList.add("sidebar-calendar-days-grey");
            day.innerHTML = i+1;
            sidebar_calendar_days.appendChild(day);
        }
    }


    let calendar = document.querySelector(".calendar");

    let curr_week_day = calendar.children[currDate.getDay()];
    curr_week_day.classList.add("week-calendar-curr-day");

    let curr_week_day_name = curr_week_day.querySelector(".week-name");
    curr_week_day_name.classList.add("curr-week-day-name");
    curr_week_day.querySelector(".week-day-number").classList.add("curr-week-day-number");


}

/*Mover mês---------------------------------------------------------------*/
let prev_month = document.querySelector('.prev-month');

prev_month.addEventListener('click', e => {
    e.preventDefault();
    clearCalendar();
    if(curr_month - 1 == -1){
        curr_year--;
        curr_month = 11;
    }
    else {
        curr_month--;
    }
    generateCalendar(curr_month, curr_year);
})

let next_month = document.querySelector('.next-month');

next_month.addEventListener('click', e => {
    e.preventDefault();
    clearCalendar();
    if(curr_month + 1 == 12){
        curr_year++;
        curr_month = 0;
    }
    else {
        curr_month++;
    }
    generateCalendar(curr_month, curr_year);
})



function clearCalendar(){
    let sidebar_cal = document.querySelector(".sidebar-calendar-days");
    while (sidebar_cal.firstChild) {
        sidebar_cal.removeChild(sidebar_cal.lastChild);
      }
}

/*---------------------------------------------------------------------*/
generateCalendar(curr_month, curr_year);

/*Gerar os dias no calendário semanal*/

let calendar = document.querySelector(".calendar");

if(currDate.getDate() < 6){
    let j = 0;
    for (let i = (currDate.getDay() - currDate.getDate()); i >= 0; i--){
        let week_day = calendar.children[i].querySelector(".week-day-number");
        week_day.innerHTML = days_of_month[currDate.getMonth() - 1] - j++;
    }
    for (let i = currDate.getDay() - currDate.getDate() + 1; i < 7; i++){
        let week_day = calendar.children[i].querySelector(".week-day-number");
        week_day.innerHTML = currDate.getDate() - currDate.getDay() + i;
    }
}else if(currDate.getDate() < days_of_month[currDate.getMonth()] - 6) {
    let j = currDate.getDay();
    for (let i = 0; i < currDate.getDay(); i++){
        let week_day = calendar.children[i].querySelector(".week-day-number");
        week_day.innerHTML = currDate.getDate() - j--;
    }

    j = currDate.getDate();
    for (let i = 0; j <= days_of_month[currDate.getMonth()]; i++, j++){
        let week_day = calendar.children[j].querySelector(".week-day-number");
        week_day.innerHTML = currDate.getDate() + i;
    }

    
}else {
    for (let i = 0; i < 7; i++){
        let week_day = calendar.children[i].querySelector(".week-day-number");
        week_day.innerHTML = currDate.getDate() - currDate.getDay() + i;
    }
}

/*ORDENA TAREFAS POR HORARIO*/
function sortTasks(week_day){
    let days = week_day.querySelectorAll('.week_task');
    days = Array.prototype.slice.call(days).sort( (a, b) => {
        return +a.dataset.total_min - +b.dataset.total_min;
    });
    days.forEach(element => {
        week_day.appendChild(element);
    });

}

/* retorna o dia da semana selecionado ao criar uma nova tarefa*/
function newWeekInput(){
    if (document.querySelector("#week-task-radio-dom").checked)
    return 0;
    else if (document.querySelector("#week-task-radio-seg").checked)
    return 1;
    else if (document.querySelector("#week-task-radio-ter").checked)
    return 2;
    else if (document.querySelector("#week-task-radio-qua").checked)
    return 3;
    else if (document.querySelector("#week-task-radio-qui").checked)
    return 4;
    else if (document.querySelector("#week-task-radio-sex").checked)
    return 5;
    else if (document.querySelector("#week-task-radio-sab").checked)
    return 6;
    else return 7;
}
/*MASKS*/
/* Mask para inserir o horário ao criar uma nova tarefa*/
let new_week_task_hour = document.querySelector("#new-week-task-hour");

new_week_task_hour.addEventListener("keypress", e =>{

    if(e.keyCode < 48 || e.keyCode > 57) {
        e.preventDefault();
    }

    let len = new_week_task_hour.value.length;

    if(len === 1){
        if(e.keyCode == 186){
            e.preventDefault();
        }
    }
    if(len === 2){
        new_week_task_hour.value += ':';
    }
})
/*mask evento semana*/
let new_week_event_hour = document.querySelector("#new-week-event-hour");

new_week_event_hour.addEventListener("keypress", e =>{

    if(e.keyCode < 48 || e.keyCode > 57) {
        e.preventDefault();
    }

    let len = new_week_event_hour.value.length;

    if(len === 1){
        if(e.keyCode == 186){
            e.preventDefault();
        }
    }
    if(len === 2){
        new_week_event_hour.value += ':';
    }
})

/*NOVA TAREFA SEMANAL*/
let save_week_task_btn =  document.querySelector("#new-week-task-save");

const tasks = new Map();

save_week_task_btn.addEventListener('click', e => {
    e.preventDefault();
    createWeekTask();
    closeWeekTaskModal();
});

function createWeekTask(){
    const $titleInput = document.querySelector("#new-task-tittle");
    const $descriptionInput = document.querySelector("#new-week-task-description");
    const $weekCalendar =  document.querySelector(".calendar");

    /* título da task*/
    let title = $titleInput.value;
    if (!title){
        window.alert("Defina o título da tarefa");
        return;
    }

    /* descrição da task (opicional) */
    let description = $descriptionInput.value;

    /* dia da semana da task */
    let weekday = newWeekInput();
    if(weekday > 6){
        window.alert("Selecione um dia da semana");
        return;
    }

    /* horário da task */
    const time = document.querySelector("#new-week-task-hour").value;

    const hour = Number(time.substr(0, 2));
    const minutes = Number(time.substr(3, 2));

    
    if(!time || time.length < 5 || hour < 0 || hour >= 24 || minutes < 0 || minutes >= 60){
        window.alert("Digite um horário válido");
        return;
    }
    
    /*Criação dos elementos HTML*/
    
    const date = new Date(curr_year, curr_month, 12, hour, minutes);
    const $currWeekCalendar = $weekCalendar.children[weekday];
    
    console.log(date);
    const task = new Task({
        title,
        description,
        date,
        tags_ids: [],
        dom_parent: $currWeekCalendar
    });

    tasks.set(task.id, task);
    
    sortTasks($currWeekCalendar);
}

/*EXIBIR/ESCONDER DETALHES DA TASK*/

/*CONCLUIR A TASK SEMANAL*/

function finishTask(t){
    console.log(t);
    finished_tasks.push(t);
    t.parentNode.removeChild(t);
}
/*NOVO EVENTO SEMANAL*/

save_week_task_btn.addEventListener('click', e => {
    e.preventDefault();
    createWeekEvent();
});

function createWeekEvent(){

}

 const btn_erro = document.querySelector('.change-view-btn');
 btn_erro.addEventListener('click', e =>{
    e.preventDefault();
    window.alert("WIP");
 })

 const btn_erro2 = document.querySelector('#user-icon');
 btn_erro2.addEventListener('click', e =>{
    e.preventDefault();
    window.alert("WIP");
 })

 const btn_erro3 = document.querySelector('#help-btn');
 btn_erro2.addEventListener('click', e =>{
    e.preventDefault();
    window.alert("WIP");
 })