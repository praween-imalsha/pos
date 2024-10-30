import ItemModel from "../models/ItemModel.js";
import {item_array} from "../db/database.js";

const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item, index) => {
        let data = `<tr><td>${item.name}</td><td>${item.description}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;

        $("#itemTableBody").append(data);
    });
};

const cleanItemForm = () => {
    $('#itemName').val("");
    $('#qty').val("");
    $('#itemDescription').val("");
    $('#price').val("");
};

let selected_item_index = null;


$("#item_add_btn").on("click", function() {

    let name = $('#itemName').val();
    let quantity = $('#qty').val();
    let description = $('#itemDescription').val();
    let price = $('#price').val();



    if(name.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid Name",
        });
    } else if(quantity.length===0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid quantity",
        });
    } else if(description.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid description",
        });
    } else if(price.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Invalid price",
        });
    } else {




        let item = new ItemModel(
            item_array.length + 1,
           name,
            quantity,
            description,
            price

        );


        item_array.push(item);

        // clean customer form
        cleanItemForm();

        loadItemTable();
    }
});
$("#item_update_btn").on("click", function() {


    let name = $('#itemName').val();
    let quantity = $('#qty').val();
    let description = $('#itemDescription').val();
    let price = $('#price').val();

    item_array[selected_item_index] = new ItemModel(
        item_array[selected_item_index].id, // retain original ID
        name,
        quantity,
        description,
        price
    );

    cleanItemForm();
    loadItemTable();
    selected_item_index = null; // clear selection
});

$('#itemTableBody').on('click', 'tr', function () {
    let index = $(this).index();

    selected_item_index = $(this).index();
    let item_obj = item_array[index];

    let name = item_obj.name;
    let  quantity = item_obj.quantity;
    let description = item_obj.description;
    let price =  item_obj.price;


    $('#itemName').val(name);
    $('#itemDescription').val(description);
    $('#qty').val(quantity);
    $('#price').val(price);

});



$("#item_delete_btn").on("click", function() {
    if (selected_item_index === null || selected_item_index >= item_array.length) {
        Swal.fire({
            icon: "error",
            title: "Delete Error",
            text: "No item selected for deletion.",
        });
        return;
    }

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
            item_array.splice(selected_item_index, 1);

            cleanItemForm();
            loadItemTable();
            selected_item_index = null;

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your Item has been deleted.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
});