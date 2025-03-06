$(document).ready(()=>{
    // ---------------------------------------------Question1-------------------------------------------
 $("#form").submit(function(event){
    event.preventDefault();
    
    let valid=true;

    $(".error").text("");

    let firstName=$("#firstName").val().trim();
    let lastName=$("#lastName").val().trim();
    let dob=$("#dob").val();
    let gender=$("#gender").val();
    let email=$("#email").val().trim();
    let phone=$("#phoneNumber").val().trim();
    let pass=$("#pass").val();
    let confirmPass=$("#confirmpass").val();
    let bio=$("#bio").val();

    let today = new Date().toISOString().split("T")[0];
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(firstName===""){
        $("#firstName-Error").text("Enter first name!");
        valid=false;
    }

    if(lastName===""){
        $("#lastName-Error").text("Enter last name!");
        valid=false;
    }

    if(dob===""){
        $("#dob-Error").text("Select DOB !");
        valid=false;
    }else if (dob > today) {
            $("#dob-Error").text("DOB cannot be a future date!");
            valid = false;
        }

    if(gender===""){
        $("#gender-Error").text("Select gender !");
        valid=false;
    }

    if(!emailPattern.test(email)){
        $("#email-Error").text("Enter valid mail !");
        valid=false;
    }

    if(phone==="" || phone.length <10){
        $("#phoneNumber-Error").text("Enter a valid 10-digit numeric phone number!");
        valid=false;
    }
    if(isNaN(phone)){
        $("#phoneNumber-Error").text("Only numeric characters are allowed!!")
    }

    if(pass ==="" || pass.length < 6){
        $("#password-Error").text("Enter password atleast 6 characters!");
        valid=false;
    }

    if(confirmPass !== pass || confirmPass==""){
        $("#confirmPassword-Error").text("Password not matching enter same password to confirm !");
        valid=false;
    }

    if(bio == ""){
        $("#bio-Error").text("Please fill this column !");
        valid=false;
    }

    if(valid){
        $(".submitted-data").html(`
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>DOB:</strong> ${dob}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Bio:</strong> ${bio}</p>
        `);

        $("#form")[0].reset();
    }
 });

//  --------------------------------------------------Q2------------------------------------------------

$("#loadData").click(()=>{
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
            let tableBody="";
            data.forEach(user=>{
                tableBody+=
                `<tr>
                 <td>${user.id}</td>
                 <td>${user.name}</td>
                 <td>${user.email}</td>
                 <td>${user.phone}</td>
                 </tr>`;
            });
            $("#dataTable").html(tableHead + `<tbody> ${tableBody} </tbody>`);
        }, 
        error : ()=>{
            alert("Error occured or Please run in live server !!");
        }
    });
});
});