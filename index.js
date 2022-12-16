
const Api = (() => {

    async function getCourses(url = '') {
        const response = await fetch(url);
        return response.json(); // parses JSON response into native JavaScript objects
    }

    return {
        getCourses,
    };
})();



const coursesContainer = document.querySelector("#courses_container")
console.log(coursesContainer)

Api.getCourses('http://localhost:4232/courseList')
    .then((data) => {
        data.forEach(course => {
            let type = ""
            if(course.required){
                type = "Compulsory"
            } else {
                type = "Elective"
            }
            coursesContainer.innerHTML += `
                <li id= "${course.courseId}" class ="list-item" data-credit = ${course.credit} data-courseName = ${course.courseName} data-type = ${type}>
                    <p>${course.courseName}</p>
                    <p>Course Type: ${type}</p>
                    <p>Course Credit: ${course.credit}</p>
                <li>
            `
        });;
    });

const credit = document.querySelector("#total-credit")
credit.textContent = 0 

// const courses = document.querySelectorAll("")
document.addEventListener("click", function (e) {
    let listItems = document.querySelectorAll(".list-item"); 
    if(listItems){
        listItems.forEach(item => {
            item.addEventListener("click", ()=>{
                item.classList.toggle("selected")
                if (item.hasAttribute("selected")){
                    credit += item.dataset.credit
                }
            })
        })
    
    }
});

const form = document.querySelector("form")
const selectedCoursesContainer = document.querySelector("#selected_courses_container")
form.addEventListener("submit", event => {
    event.preventDefault()
    const selectedCourse = document.querySelectorAll(".list-item.selected")
    console.log(selectedCourse)
    selectedCourse.forEach(course => {
        console.log(course)
        selectedCoursesContainer.innerHTML += `
                <li id= "${course.courseId}" class ="list-item" data-credit = ${course.credit} data-courseName = ${course.courseName} data-type = ${type}>
                    <p>${course.courseName}</p>
                    <p>Course Type: ${type}</p>
                    <p>Course Credit: ${course.credit}</p>
                <li>
            `
    })

})

console.log(selectedCourse)








