// var product = [{
//     id: 1,
//     img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Iphone',
//     price: 16000,
//     description: 'Iphone Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum non repellendus earum libero reprehenderit.',
//     type: 'phone'
// } , {
//     id: 2,
//     img: 'https://images.unsplash.com/photo-1511746315387-c4a76990fdce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Adidas Shirt',
//     price: 1500,
//     description: 'Adidas shirt Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum non repellendus earum libero reprehenderit.',
//     type: 'shirt'
// } , {
//     id: 3,
//     img: 'https://images.unsplash.com/photo-1611510338559-2f463335092c?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     name: 'Nike Shoe',
//     price: 5000,
//     description: 'Nike Shoe Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum non repellendus earum libero reprehenderit.',
//     type: 'shoe'
// }];

var product;

$(document).ready(() => {

    $.ajax({
        method: 'get',
        url: './api/getallproduct.php',
        success: function(response) {
            console.log(response)
            if(response.RespCode == 200) {

                product = response.Result;
                var html = '';
                for (let i = 0 ; i < product.length ; i++) {
                    html += `<div onclick = "openProduct(${i})" class="product-items ${product[i].type}">
                                <img src="./img/${product[i].img}" alt="">
                                <p class="product-name">${product[i].name}</p>
                                <p class="product-price">${numberWithCommas(product[i].price)} THB</p>
                            </div>` 
                }
                $("#productlist").html(html);
            }
        } , error: function(err) {
            console.log(err)
        }
    })

    
})




function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


function searchsmth(elem) {
    // console.log(elem.id);
    var value = $('#'+elem.id).val();
    console.log(value);

    var html = '';
    for (let i = 0 ; i < product.length ; i++) {
        if (product[i].name.includes(value)) {
            html += `<div onclick = "openProduct(${i})" class="product-items ${product[i].type}">
                        <img src="./img/${product[i].img}" alt="">
                        <p class="product-name">${product[i].name}</p>
                        <p class="product-price">${numberWithCommas(product[i].price)} THB</p>
                    </div>` 
        }
    }

    if (html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }
}


function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if(param == 'all') {
        $(".product-items").css('display' , 'block')
    } else {
        $("." + param).css('display' , "block")
    }


}


var product_index = 0;
function openProduct(index) {
    product_index = index
    console.log(product_index)
    $("#modalDesc").css("display" , "flex")
    $("#mdd-img").attr('src' , './img/' + product[index].img)
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal() {
    $(".modal").css("display" , "none")
}


var cart = [];
function addToCart() {
    var pass = true;
    
    for (let i = 0; i < cart.length; i++) {
        if(product_index == cart[i].index) {
            console.log('found same product')
            cart[i].count++
            pass = false
        }
    }

    if (pass) {
        var obj = {
            index: product_index,
            id: product[product_index].id,
            name: product[product_index].name,
            price: product[product_index].price,
            img: product[product_index].img,
            count: 1
        };
        cart.push(obj)
    }

    console.log(cart)
    

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[product_index].name + ' to cart !'
    })

    $("#cartcount").css('display','flex').text(cart.length)
    
}



function openCart() {
    $("#modalCart").css('display' , 'flex')
    renderCart();
}


function renderCart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cart-item">
                        <div class="cart-left">
                            <img src="./img/${cart[i].img}" alt="">
                            <div class="cart-name">
                                <h2>${cart[i].name}</h2>
                                <p id="cart-price">${numberWithCommas(cart[i].price * cart[i].count)} THB</p>
                            </div>
                            
                        </div>
                        <div class="cart-right">    
                            <p onclick = "plusandminus('-' , ${i})" class="btnc">-</p>
                            <p id="cart-count-item${i}" style="margin: 0 20px; font-size: 1.5rem;">${cart[i].count}</p>
                            <p onclick = "plusandminus('+' , ${i})" class="btnc">+</p>
                        </div>
                    </div>`
        }
        $("#mycart").html(html);
    } else {
        $("#mycart").html('<p>Not found product in your cart</p>')
    }
}

function plusandminus(action , index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#cart-price").text(numberWithCommas(cart[index].price * cart[index].count) + ' THB')
            $("#cart-count-item"+index).text(cart[index].count)
            if(cart[index].count <= 0) {
                Swal.fire({
                icon: 'warning',
                title: 'Are you sure to delete your product?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel'
                }).then((res) => { 
                    if(res.isConfirmed) {
                        cart.splice(index,1)
                        console.log(cart)
                        renderCart();
                        $("#cartcount").css('display','flex').text(cart.length)
                        if (cart.length <= 0) {
                             $("#cartcount").css('display','none')
                        }
                    } else if(res.isDismissed){
                        cart[index].count++;
                        $("#cart-price").text(numberWithCommas(cart[index].price * cart[index].count) + ' THB')
                        $("#cart-count-item"+index).text(cart[index].count)
                    }
                })
            }
        }
    }
    else if(action == '+') {
        cart[index].count++;
        $("#cart-price").text(numberWithCommas(cart[index].price * cart[index].count) + ' THB')
        $("#cart-count-item"+index).text(cart[index].count)
    }
}