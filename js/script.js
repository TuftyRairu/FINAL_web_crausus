
const username = document.querySelector('#setuser');
const password = document.querySelector('#setpass');
const email = document.querySelector('#setemail');
const input = document.querySelectorAll('input');

const userform = /^[a-zA-Z]+$/;
const passform = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
const mailform = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const uerror = document.getElementById('usererror');
const perror = document.getElementById('passerror');
const eerror = document.getElementById('emailerror');
const message = document.querySelector('span');

const signup = document.querySelector('#signup-form');
const login = document.querySelector('#login-form');

if(signup){
    signup.addEventListener('submit', function (e){
        e.preventDefault();

        const usernamevalue = username.value.trim();
        const passwordvalue = password.value.trim();
        const emailvalue = email.value.trim();
        
        if(usernamevalue == ''){
            uerror.textContent = 'Username is required!';
            uerror.classList.add('error');
            username.style.border = '2px solid red';
        } else if(usernamevalue < 2){
            uerror.textContent = 'Minimun characters required is 2.';
            uerror.classList.add('error');
            username.style.border = '2px solid red';
        } else if(!usernamevalue.match(userform)){
            uerror.textContent = 'Invalid Username!';
            uerror.classList.add('error');
            username.style.border = '2px solid red';
        } else {
            var usern = usernamevalue;
            uerror.textContent = '';
            username.style.border = '2px solid green';
        }
        
        if(passwordvalue == ''){
            perror.textContent = 'Password is required!';
            perror.classList.add('error');
            password.style.border = '2px solid red';
        } else if(!passwordvalue.match(passform)){
            perror.textContent = 'Minimum length required is 8, at least one letter, \n one number, and one special character.!';
            perror.classList.add('error');
            password.style.border = '2px solid red';
        } else {
            var passw = passwordvalue;
            perror.textContent = '';
            password.style.border = '2px solid green';
        }
        
        if(emailvalue == ''){
            eerror.textContent = 'Email is required!';
            eerror.classList.add('error');
            email.style.border = '2px solid red';
        } else if(!emailvalue.match(mailform)){
            eerror.textContent = 'Invalid Email!';
            eerror.classList.add('error');
            email.style.border = '2px solid red';
        } else {
            var em = emailvalue;
            eerror.textContent = '';
            email.style.border = '2px solid green';
        }

        const user = {
            username: usern,
            password: passw,
            email: em
        }
        if (usernamevalue === '' && passwordvalue === '' && emailvalue === '') {
            message.innerText = 'All fields are required.';
            message.classList.remove('success-message');
            message.classList.add('error-message');
        } else if (user.username != null || user.password != null || user.email != null){
            message.innerText = '';
            message.classList.remove('success-message');
            message.classList.remove('error-message');
        }

        if(user.username != null && user.password != null && user.email != null){
            message.innerText = 'Account successfully created.';
            message.classList.remove('error-message');
            message.classList.add('success-message');

            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
            const json = JSON.stringify(user);
    
            localStorage.setItem('user', json);

        }
            
    });
}


const lusername = document.querySelector('#getuser');
const lpassword = document.querySelector('#getpass');

const luerror = document.getElementById('lusererror');
const lperror = document.getElementById('lpasserror');
const lmessage = document.querySelector('span');

if(login){
    login.addEventListener('submit', function (e){
        e.preventDefault();

        const lusernamevalue = lusername.value.trim();
        const lpasswordvalue = lpassword.value.trim();

        if(lusernamevalue == ''){
            luerror.textContent = 'Username is required!';
            luerror.classList.add('error');
            lusername.style.border = '2px solid red';
        } else if(lusernamevalue < 2){
            luerror.textContent = 'Minimun characters required is 2.';
            luerror.classList.add('error');
            lusername.style.border = '2px solid red';
        } else {
            luerror.textContent = '';
            lusername.style.border = '2px solid green';
        }

        if(lpasswordvalue == ''){
            lperror.textContent = 'Password is required!';
            lperror.classList.add('error');
            lpassword.style.border = '2px solid red';
        } else {
            lperror.textContent = '';
            lpassword.style.border = '2px solid green';
        }

        if (lusernamevalue === '' && lpasswordvalue === '') {
            lmessage.innerText = 'All fields are required.';
            lmessage.classList.remove('success-message');
            lmessage.classList.add('error-message');
        } else if(lusernamevalue === '' || lpasswordvalue === '') {
            lmessage.innerText = '';
            lmessage.classList.remove('success-message');
            lmessage.classList.remove('error-message');
        }
        
        let user = localStorage.getItem('user');
        let key = JSON.parse(user);
        
        if(lusernamevalue != '' && lpasswordvalue != '') {

            if((lusernamevalue == key.username || lusernamevalue == key['email']) && lpasswordvalue == key.password){
                lmessage.innerText = 'Successfully Logged In.';
                lmessage.classList.remove('error-message');
                lmessage.classList.add('success-message');
                window.location.replace('member.html');
                return false;
            } else {
                lmessage.innerText = 'Account does not Exist!';
                lmessage.classList.remove('success-message');
                lmessage.classList.add('error-message');
                lusername.style.border = '2px solid red';
                lpassword.style.border = '2px solid red';
            }
        }
    });
}