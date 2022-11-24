

const buttonVhod = document.querySelector('.otpravit')



buttonVhod.addEventListener( "click", event => {
    
    const loginInput = document.getElementById('login')
    const password = document.getElementById('password')
   
    getDataByInn(loginInput.value, password.value)

})




const getDataByInn = async (login, password) => {


    const res = await fetch('https://192.168.1.64:5020/admin_enter', {
        method:'POST',
        headers: {
            'content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({login:login, password:password})

    })
    
    const json = await res.json()
    console.log(json)

    if (json === true) {
        window.open('./adminkaMain.html', '_blank')
    }else{
        console.log('oi')
    }

    

}



