const Api = (() => {

    const getCourses = () =>
        fetch("http://localhost:4232/courseList").then(response => response.json());

    return {
        getCourses,
    };
})();



const View = (() => {
    const domstr = {
        coursesContainer: "#courses_container",
        selectedCoursesContainer: "#selected_courses_container",
        totalCredit: "#total-credit",
    };
    const createTmp = (arr) => {
        let tmp = "";
        arr.forEach((course) => {
            let type = ""
            if(course.required){
                type = "Compulsory"
            } else {
                type = "Elective"
            }
            tmp += `
                <li id= "${course.courseId}" class ="list-item" data-credit = ${course.credit}>
                    ${course.courseName}</br>
                    Course Type: ${type}</br>
                    Course Credit: ${course.credit}</br>
                </li>
            `
        });
        return tmp
    };
    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };

    const getCredits = (credit, totalCredit) => {
        totalCredit.textContent = credit
    }

    return {
        domstr,
        createTmp,
        render,
        getCredits
    };
})();

const Model = ((api, view) => {
    const {getCourses} = api;

    class State {
        #courseList = [];

        get courseList() {
            return this.#courseList;
        }
        set courseList(newcourseList) {
            this.#courseList = newcourseList;
            const coursesContainer = document.querySelector(view.domstr.coursesContainer)
            const tmp = view.createTmp(this.#courseList);
            view.render(coursesContainer, tmp);
        }
    }

    class TotalCredit{
        #credit = 0
        get totalCredit(){
            return this.#credit
        }

        set totalCredit(newCredit){
            this.#credit = newCredit
            const totalCredit = document.querySelector(view.domstr.totalCredit)
            view.getCredits(this.#credit, totalCredit)
        }
    }


    class Selected{
        #courseList = [];

        get courseList() {
            return this.#courseList;
        }

        set courseList(newCoursesList) {
            this.#courseList = newCoursesList;
            const coursesContainer = document.querySelector(view.domstr.selectedCoursesContainer)
            const tmp = view.createTmp(this.#courseList);
            view.render(coursesContainer, tmp);
        }
    }

    return{
        getCourses,
        State,
        TotalCredit,
        Selected
    }
})(Api, View)

const Controller = ((model, view) => {
    const state = new model.State();
    const select = new model.Selected();
    const credit = new model.TotalCredit();
    let allCourses;

    const init = () => {
        model.getCourses().then((courses) => {
            state.courseList = courses;
            allCourses = courses;
        });
    };

    const selectCourse = () => {
        const courses = document.querySelectorAll(view.domstr.coursesContainer);
        courses.forEach((li) => {
            li.addEventListener("click", (e) => {
                e.target.classList.toggle("selected");
                console.log(e.target)
                console.log(e.target.dataset.credit)
                if(e.target.classList.contains("selected")){
                    credit.totalCredit = Number(credit.totalCredit) + Number(e.target.dataset.credit)
                    if(credit.totalCredit > 18){
                        alert("You cannot choose more than 18 credits in one semester!")
                        e.target.classList.toggle("selected")
                        credit.totalCredit = Number(credit.totalCredit) - Number(e.target.dataset.credit)
                    }
                } else {
                    credit.totalCredit = Number(credit.totalCredit) - Number(e.target.dataset.credit)
                }
            });
        });
    };

    const submitForm = () => {
        const button = document.querySelector("button")
        button.addEventListener("click", event => {
            event.preventDefault()
            const selectedCourses = document.getElementsByClassName("selected");
            let res = [];
            if (selectedCourses.length === 0) {
                alert("Please choose your courses first!");
            } else {
                for (let i = 0; i < selectedCourses.length; i++) {
                    res.push(allCourses[selectedCourses[i].id - 1]);
                }
                res.forEach((elem) => {
                    let id = allCourses.indexOf(elem);
                    allCourses.splice(id, 1);
                });
                let conf = window.confirm(
                    `You have chose ${credit.creidtCount} credits for this semster. You cannot change once you submit. Do you want to confirm?`
                );
                if (conf) {
                    state.courseList = allCourses;
                    select.courseList = res;
                    button.disabled = true;
                }
            }
        });
    };

    

    const bootstrap = () => {
        init();
        selectCourse();
        submitForm();
    };
    return { bootstrap };
})(Model, View);

Controller.bootstrap();


// const coursesContainer = document.querySelector("#courses_container")
// console.log(coursesContainer)

// Api.getCourses('http://localhost:4232/courseList')
//     .then((data) => {
//         data.forEach(course => {
//             let type = ""
//             if(course.required){
//                 type = "Compulsory"
//             } else {
//                 type = "Elective"
//             }
//             coursesContainer.innerHTML += `
//                 <li id= "${course.courseId}" class ="list-item" data-credit = ${course.credit} data-courseName = ${course.courseName} data-type = ${type}>
//                     <p>${course.courseName}</p>
//                     <p>Course Type: ${type}</p>
//                     <p>Course Credit: ${course.credit}</p>
//                 <li>
//             `
//         });;
//     });

// const credit = document.querySelector("#total-credit")
// credit.textContent = 0 

// const courses = document.querySelectorAll("")
// document.addEventListener("click", function (e) {
//     let listItems = document.querySelectorAll(".list-item"); 
//     if(listItems){
//         listItems.forEach(item => {
//             item.addEventListener("click", ()=>{
//                 item.classList.toggle("selected")
//                 if (item.hasAttribute("selected")){
//                     credit += item.dataset.credit
//                 }
//             })
//         })
    
//     }
// });

// const form = document.querySelector("form")
// const selectedCoursesContainer = document.querySelector("#selected_courses_container")
// form.addEventListener("submit", event => {
//     event.preventDefault()
//     const selectedCourse = document.querySelectorAll(".list-item.selected")
//     console.log(selectedCourse)
//     selectedCourse.forEach(course => {
//         console.log(course)
//         selectedCoursesContainer.innerHTML += `
//                 <li id= "${course.courseId}" class ="list-item" data-credit = ${course.credit} data-courseName = ${course.courseName} data-type = ${type}>
//                     <p>${course.courseName}</p>
//                     <p>Course Type: ${type}</p>
//                     <p>Course Credit: ${course.credit}</p>
//                 <li>
//             `
//     })

// })

// console.log(selectedCourse)










