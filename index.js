var Filter = {
    Elements: {
        name: document.getElementById("name"),
        lastname: document.getElementById("lastname"),
        age: document.getElementById("age"),
        job: document.getElementById("job"),
        weight: document.getElementById("weight"),
        size: document.getElementById("size"),
        personList: document.getElementById("person-list"),
        submit: document.getElementById("submit"),
    },

    Status: {
        persons: [],
    },

    Actions: {
        init: () => {
            if (localStorage.getItem("person")) {
                var localStrgdata = JSON.parse(localStorage.getItem("person")) || [];
                Filter.Status.persons = localStrgdata;
                Filter.Actions.appendToHtmlPerson();   
            }
        },
        getValue: () => {
            var name = Filter.Elements.name.value;
            var lastname = Filter.Elements.lastname.value;
            var age = Filter.Elements.age.value;
            var job = Filter.Elements.job.value;
            var weight = Filter.Elements.weight.value;
            var size = Filter.Elements.size.value;
            var person = {name, lastname, age, job, weight, size};
            Filter.Status.persons.push(person);
            localStorage.setItem("person", JSON.stringify(Filter.Status.persons));
            Filter.Actions.resetInput()
            Filter.Actions.appendToHtmlPerson();
        },
        
        appendToHtmlPerson: () => {
            Filter.Elements.personList.innerHTML = "";
            var persons = Filter.Status.persons;
            console.log(persons.length)
            for (let i = 0; i < persons.length; i++) {
                var person = persons[i];
                var personHtml = 
                "<li>" +
                "<ul class='b-item-02-A'>" +
                    "<li>"+person.name+" "+person.lastname+"</li>" +
                    "<li>"+person.age+"</li>" +
                    "<li>"+person.job+"</li>" +
                    "<li>"+person.weight+"</li>" +
                    "<li>"+person.size+"</li>" +
                    "<li>"+"<button onclick='Filter.Actions.personEdit("+ i +")'>Düzenle</button>" + "<button onclick='Filter.Actions.deletePerson("+ i +")'>Sil</button>"+"</li>" +
                "</ul>" +
              "</li>";
              Filter.Elements.personList.innerHTML += personHtml;
            }
        },

        resetInput: () => {
            Filter.Elements.name.value = "";
            Filter.Elements.lastname.value = "";
            Filter.Elements.age.value = "";
            Filter.Elements.job.value = "";
            Filter.Elements.weight.value = "";
            Filter.Elements.size.value = "";
        },

        personEdit: (personIndex) => {
            var person = Filter.Status.persons[personIndex];
            Filter.Elements.name.value = person.name;
            Filter.Elements.lastname.value = person.lastname;
            Filter.Elements.age.value = person.age;
            Filter.Elements.job.value = person.job;
            Filter.Elements.weight.value = person.weight;
            Filter.Elements.size.value = person.size;
            Filter.Elements.submit.value ="Düzenle";
            Filter.Elements.submit.setAttribute("onclick", 'Filter.Actions.saveEditPerson('+personIndex+');')
        },

        saveEditPerson: (personIndex) => {
            var name = Filter.Elements.name.value;
            var lastname = Filter.Elements.lastname.value;
            var age = Filter.Elements.age.value;
            var job = Filter.Elements.job.value;
            var weight = Filter.Elements.weight.value;
            var size = Filter.Elements.size.value;
            var person = {name, lastname, age, job, weight, size}
            Filter.Status.persons[personIndex] = person;
            localStorage.setItem("person", JSON.stringify(Filter.Status.persons[personIndex]))
            Filter.Actions.appendToHtmlPerson()
            Filter.Actions.resetInput()
            Filter.Elements.submit.value="Ekle";
            Filter.Elements.submit.setAttribute("onclick", "Filter.Actions.getValue()")
        },

        deletePerson: (personIndex) => {
            debugger
            Filter.Status.persons.splice(personIndex,1);
            localStorage.setItem("person", JSON.stringify(Filter.Status.persons))
            Filter.Actions.appendToHtmlPerson();
        }
    }

}
Filter.Actions.init();