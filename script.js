$(document).ready(()=>{
    // ---------------------------------------------Question1-------------------------------------------
 $("#form").submit(function(event){
    event.preventDefault();
    
    let valid=true;

    $(".error").text("");

    let fn=$("#fname").val().trim();
    let ln=$("#lname").val().trim();
    let dob=$("#dob").val();
    let gender=$("#gender").val();
    let email=$("#email").val().trim();
    let phno=$("#phnumber").val().trim();
    let pass=$("#pass").val();
    let confirmpass=$("#confirmpass").val();
    let bio=$("#bio").val();

    let today = new Date().toISOString().split("T")[0];
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(fn===""){
        $("#fnameerror").text("Enter first name!");
        valid=false;
    }

    if(ln===""){
        $("#lnameerror").text("Enter last name!");
        valid=false;
    }

    if(dob===""){
        $("#doberror").text("Select DOB !");
        valid=false;
    }else if (dob > today) {
            $("#doberror").text("DOB cannot be a future date!");
            valid = false;
        }

    if(gender===""){
        $("#gendererror").text("Select gender !");
        valid=false;
    }

    if(!emailPattern.test(email)){
        $("#emailerror").text("Enter valid mail !");
        valid=false;
    }

    if(phno==="" || phno.length <10){
        $("#phnumbererror").text("Enter a valid 10-digit numeric phone number!");
        valid=false;
    }
    if(isNaN(phno)){
        $("#phnumbererror").text("Only numeric characters are allowed!!")
    }

    if(pass ==="" || pass.length < 6){
        $("#passworderror").text("Enter password atleast 6 characters!");
        valid=false;
    }

    if(confirmpass !== pass || confirmpass==""){
        $("#confirmpassworderror").text("Password not matching enter same password to confirm !");
        valid=false;
    }

    if(bio == ""){
        $("#bioerror").text("Please fill this column !");
        valid=false;
    }

    if(valid){
        $(".submitted-data").html(`
            <p><strong>First Name:</strong> ${fn}</p>
            <p><strong>Last Name:</strong> ${ln}</p>
            <p><strong>DOB:</strong> ${dob}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phno}</p>
            <p><strong>Bio:</strong> ${bio}</p>
        `);

        $("#form")[0].reset();
    }
 });

//  --------------------------------------------------Q2------------------------------------------------

$("#loaddata").click(()=>{
    $.ajax({
        url:"./data.json",
        success:(data)=>{
            let tableHead = `
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                `;
            let tablebody="";
            data.forEach(user=>{
                tablebody+=
                `<tr>
                 <td>${user.id}</td>
                 <td>${user.name}</td>
                 <td>${user.email}</td>
                 <td>${user.phone}</td>
                 </tr>`;
            });
            $("#dataTable").html(tableHead + `<tbody> ${tablebody} </tbody>`);
        }, 
        error : ()=>{
            alert("Error occured or Please run in live server !!");
        }
    });
});
});