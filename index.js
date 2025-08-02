var product = [{
    id: 1,
    img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Iphone',
    price: 16000,
    description: 'Iphone Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum non repellendus earum libero reprehenderit.',
    type: 'phone'
} , {
    id: 2,
    img: 'https://images.unsplash.com/photo-1511746315387-c4a76990fdce?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Adidas Shirt',
    price: 1500,
    description: 'Adidas shirt Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum non repellendus earum libero reprehenderit.',
    type: 'shirt'
} , {
    id: 3,
    img: 'https://images.unsplash.com/photo-1611510338559-2f463335092c?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Nike Shoe',
    price: 5000,
    description: 'Nike Shoe Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ipsum non repellendus earum libero reprehenderit.',
    type: 'shoe'
}];


$(document).ready(() => {
    var html = '';
    for (let i = 0 ; i < product.length ; i++) {
        html += `<div class="product-items ${product[i].type}">
                    <img src="${product[i].img}" alt="">
                    <p class="product-name">${product[i].name}</p>
                    <p class="product-price">${numberWithCommas(product[i].price)} THB</p>
                </div>` 
    }
    $("#productlist").html(html);
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
            html += `<div class="product-items ${product[i].type}">
                        <img src="${product[i].img}" alt="">
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