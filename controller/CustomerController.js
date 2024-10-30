// import {CustomerModel} from "./models/customerModel.js";
import CustomerModel from "../models/customerModel.js";
import {customer_array, item_array, order_array} from "../db/database.js";
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}

const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item, index) => {
        console.log(item);
        let data = `<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`
        $("#customerTableBody").append(data);
    })
}

const cleanCustomerForm  = () => {
    $('#firstName').val("");
    $('#lastName').val("")
    $('#email').val("");
    $('#mobile').val("");
    $('#address').val("");
}

// selected customer for update or delete
let selected_customer_index = null;

// Add Customer Button
$("#customer_add_btn").on("click", function() {
    let first_name = $('#firstName').val(); // empty
    let last_name = $('#lastName').val(); // empty
    let mobile = $('#mobile').val(); // empty, format
    let email = $('#email').val(); // empty, format
    let address = $('#address').val(); // empty

    if(first_name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid First Name",
        });
    } else if(last_name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Last Name",
        });
    } else if(!validateEmail(email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Email",
        });
    } else if(!validateMobile(mobile)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Mobile",
        });
    } else if(address.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid address",
        });

    } else {
        let customer = new CustomerModel(
            customer_array.length + 1,
            first_name,
            last_name,
            mobile,
            email,
            address
        );


        customer_array.push(customer);

        // clean customer form
        cleanCustomerForm();

        loadCustomerTable();
    }



    // // create table row
    // let data = `<tr><td>${first_name}</td><td>${last_name}</td><td>${mobile}</td><td>${email}</td><td>${address}</td></tr>`
    // $("#customerTableBody").append(data);
});

$('#customerTableBody').on('click', 'tr', function () {
    // get tr index
    let index = $(this).index();

    selected_customer_index = $(this).index();

    // get customer object by index
    let customer_obj = customer_array[index];

    // get customer's data
    let first_name = customer_obj.first_name;
    let last_name = customer_obj.last_name;
    let email = customer_obj.email;
    let mobile = customer_obj.mobile;
    let address = customer_obj.address;

    // fill data into the form
    $('#firstName').val(first_name);
    $('#lastName').val(last_name);
    $('#email').val(email);
    $('#mobile').val(mobile);
    $('#address').val(address);
});

$('#customer_update_btn').on('click', function () {

    let index = selected_customer_index;

    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();



    let customer = new CustomerModel(
        customer_array[index].id,
        first_name,
        last_name,
        mobile,
        email,
        address
    );
    // update item
    customer_array[selected_customer_index] = customer;

    // clean customer form
    cleanCustomerForm();

    // reload the table
    loadCustomerTable();
});

$("#customer_delete_btn").on('click', function () {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // ==========================================================
            customer_array.splice(selected_customer_index, 1);

            // clean customer form
            cleanCustomerForm();

            // reload the table
            loadCustomerTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your customer has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });

});


