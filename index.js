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
                <div id= "${course.courseId}" class ="list-item">
                    <p>${course.courseName}</p>
                    <p>Course Type: ${type}</p>
                    <p>Course Credit: ${course.credit}</p>
                </div>
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
    const select = new model.Selected
();
    let allCourses;

    const init = () => {
        model.getCourses().then((courses) => {
            state.courseList = courses;
            allCourses = courses;
        });
        credit.creidtCount = 0;
    };

    const selectCourse = () => {
        const courses = document.querySelectorAll("#courses_container")
        

    };

    

    const bootstrap = () => {
        init();
        selectCourse()
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










