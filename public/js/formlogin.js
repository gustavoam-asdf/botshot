/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-undef */

/*-----Iniciar Session*/
const myform =document.getElementById('myform');
myform.addEventListener('submit',(e)=>{
	e.preventDefault();
	
	let nameuser=document.getElementById("user").value;
	let password=document.getElementById("pass").value;

	fetch('/',{
		method:'Post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			nameuser: nameuser,
      password :password
		})
	})

	.then(response => response.json())
  .then(data => console.log(data))
	}
	)

/*-----Registrar Usuario*/
const registerform=document.getElementById('registerform')
registerform.addEventListener('submit', (e) =>
{
	e.preventDefault();
	let id=document.getElementById("id").value;
	let name=document.getElementById("name").value;
	let lastName=document.getElementById("lastName").value;
	let email=document.getElementById("email").value;
	let nameuser=document.getElementById("nameuser").value;
	let password=document.getElementById("password").value;

	fetch('/register',{
		method:'Post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id:id,
			name:name,
			lastName:lastName,
			email:email,
			nameuser: nameuser,
      password :password
		})

	})
	.then(response => response.json())
  .then(data => console.log(data))
	}
	)

