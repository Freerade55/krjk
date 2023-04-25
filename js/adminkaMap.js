



const res = await fetch('https://freerade.ru/krjk/php/getTasks.php', {
    method:'GET',
    headers: {
        'content-type': 'application/json;charset=utf-8'
},

})


const json = await res.json()

const getTbody = document.getElementsByTagName('tbody')

json.forEach(x => {

    const tr = document.createElement('tr')
    const fragment = document.createDocumentFragment()
    const sortArr = []
    if(x['task_status'] == 0) {

        x['task_status'] = 'Не выполнено'
    }else if(x['task_status'] == 1) {
        x['task_status'] = 'Выполнено'
    }


    sortArr.push(x['zayavk_nomer'], x['date'], x['srok_ispolnenya'],
        x['name'], x['object'], x['address'], x['task'], x['contacts'],
        x['task_initiator'], x['comment'], x['task_status'])

    for (let key in sortArr) {

        const td = document.createElement('td')
        td.innerText = sortArr[key]
        fragment.appendChild(td)

    }


    tr.appendChild(fragment)


    tr.addEventListener( "click", event => {

        const allTr = document.querySelectorAll('tr')
        allTr.forEach(x => {
            if (x.style.backgroundColor === 'orange') {
                x.style.backgroundColor = 'white'
            }
        })

        tr.style.backgroundColor = 'orange'



    })



    tr.id = x['task_id']

    getTbody[0].appendChild(tr)

})








const select = document.getElementById('select')
const coordsAll = []
const dataZayavki = document.getElementById('dataZayavki')
const dateToday = new Date()
dataZayavki.value = dateToday.toLocaleDateString()


const inputs = document.querySelectorAll('input')


const arr_inputs = []
inputs.forEach(x=>{

    if(x.id !== 'dataZayavki'){
        arr_inputs.push(x)

    }
})
const edit = document.querySelector('#edit')
const add = document.querySelectorAll('#add')


const option = document.querySelectorAll('option')

const sel = document.querySelectorAll('select')

const button = document.querySelectorAll('#otpravka')

const id = document.getElementById('bdID')

edit.addEventListener( "click", event => {



    const getStatus = document.getElementById('status')

    const trs = document.querySelectorAll('tr')
    let trigger = 0
    trs.forEach(x=>{

        if (x.style.backgroundColor === 'orange') {

            trigger ++

            id.value = x.id


            for(const td in x.children) {

               if(x.children[10].innerHTML === 'Выполнено') {
                   getStatus.style.backgroundColor = 'green'
                   getStatus.textContent = 'Выполнено'

               }else if(x.children[10].innerHTML === 'Не выполнено') {
                   getStatus.style.backgroundColor = 'red'
                   getStatus.textContent = 'Не выполнено'
               }
               if(td === '1') {
                continue
            }
               else if(td === '3') {
                   for (let key = 0; key < sel[0].children.length; key++) {
                      if (sel[0].children[key].innerHTML === x.children[td].innerHTML) {
                           sel[0].children[key].setAttribute("selected", '')
                       } else if(sel[0].children[key].hasAttribute("selected")) {
                           sel[0].children[key].removeAttribute("selected")
                       }


                   }
               }

            else if(td === '0'){
                arr_inputs[0].value = x.children[td].innerHTML

            }
            else if(td === '2') {
                arr_inputs[1].value = x.children[td].innerHTML
            }
            else if(td === '4') {
                arr_inputs[2].value = x.children[td].innerHTML
            }
            else if(td === '5') {
                arr_inputs[3].value = x.children[td].innerHTML
            }
            else if(td === '6') {
                arr_inputs[4].value = x.children[td].innerHTML
            }
            else if(td === '7') {
                arr_inputs[5].value = x.children[td].innerHTML
            }
            else if(td === '8') {
                arr_inputs[7].value = x.children[td].innerHTML
            }
            else if(td === '9') {
                arr_inputs[6].value = x.children[td].innerHTML
            }



           }

        }

        }
    )


    if(trigger === 0) {
        alert('Щелкните на поле из таблицы для редактирования')
    }else{
        console.log(trigger)
        button[0].innerHTML = 'Изменить'

    }





})


add[0].addEventListener( "click", event => {
    inputs.forEach(x => {
        if(x.value !== dateToday.toLocaleDateString()) {
            x.value = ''
        }

    })

    for (let key = 0; key < sel[0].children.length; key++) {
        if (sel[0].children[key].innerHTML === 'Выберите Исполнителя') {
            sel[0].children[key].setAttribute("selected", '')
        } else if(sel[0].children[key].hasAttribute("selected")) {
            sel[0].children[key].removeAttribute("selected")
        }


    }
    button[0].innerHTML = 'Отправить'



})


















const getDataByInn = async () => {


    const res = await fetch('https://freerade.ru/krjk/php/select.php', {
        method:'GET',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },

// запрашиваем пользователей
    })

    const json = await res.json()


    json.forEach(x => {
        const newOption = document.createElement('option')
        newOption.innerHTML = x['name']
        newOption.setAttribute('id', `${x['id']}`)
        select.appendChild(newOption)
    })
// добавляется имя исполнителя и атрибут


}





getDataByInn()



ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [43.5991700, 39.7256900],
            zoom: 14,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        });



        myPlacemark = createPlacemark([43.5991700, 39.7256900]);
        myMap.geoObjects.add(myPlacemark);
        
    // Слушаем клик на карте.
       
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
            myPlacemark.events.add('dragend', function () {
                
                getAddress(myPlacemark.geometry.getCoordinates());
            });
      
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });




    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }
    
    myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
    });


    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
       
        myPlacemark.properties.set('iconCaption', 'поиск...');

        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });

               
    writeAddress(coords, myPlacemark.properties['_data'].balloonContent)
                
    });
    
  
   
    }

}


const writeAddress = async (coords, address) => {
    if (address != undefined) {
    const addressInput = document.getElementById('address')
    let array = address.split(',')
    let res = []
    array = array.map(function (el) {
        return el.trim();
      }); 

    array.forEach(x => {
        if (x !== 'Россия' && x !== 'Краснодарский край' && x !== 'Сочи')
        {
            res.push(x)
        }
    })
    
    res = res.join(', ')
   
    addressInput.value = res
    coordsAll.push(coords)
    
// тут обрезается адрес
}
    }



const getButton = document.getElementById('otpravka')

getButton.addEventListener( "click", event => {

const allInputs = document.querySelectorAll('input')
const getSelect = document.getElementById('select')

if(getButton.innerHTML === 'Изменить') {
    if (getSelect.value === 'Выберите Исполнителя') {
        alert('Выберите Исполнителя!')

    }else{


        const toBd = {}
        toBd[`ispolnitel`] = getSelect.value




        allInputs.forEach(x => {
            toBd[`${x.id}`] = x.value
        })


        for(let value in select.children) {

            if(select.children[value].innerHTML === getSelect.value) {
                toBd[`ispolnitelId`] = select.children[value].id

            }
        }

        taskUpdate(toBd)

    }


}else{

    if (getSelect.value === 'Выберите Исполнителя') {
        alert('Выберите Исполнителя!')

    }else{


        const toBd = {}
        toBd[`ispolnitel`] = getSelect.value

        toBd[`coords`] = coordsAll.slice(-1)


        allInputs.forEach(x => {
            toBd[`${x.id}`] = x.value
        })


        for(let value in select.children) {

            if(select.children[value].innerHTML === getSelect.value) {
                toBd[`ispolnitelId`] = select.children[value].id

            }
        }



        taskAdd(toBd)
}



}

})


const main = document.getElementById('main')

main.addEventListener( "click", event => {
    location.reload()
} )



const taskAdd = async (toBd) => {
    const res = await fetch('https://freerade.ru/krjk/php/setTask.php', {
        method:'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(toBd)

    })
    

// вносится в бд
    location.reload()

}





const taskUpdate = async (toBd) => {
    const res = await fetch('https://freerade.ru/krjk/php/udateTask.php', {
        method:'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(toBd)

    })


// обновляется в бд
    location.reload()

}










    
