//Vars
const receiptList = document.querySelector('#receiptList');

//Events
eventsListenersToSale();

function eventsListenersToSale () {
    document.addEventListener('DOMContentLoaded', localStorageLoad);
    document.querySelector('#formToSale').addEventListener('submit', addProductToList);
    document.querySelector('#quantityUnits').addEventListener('onkeyup', setQuantity);
}

//Functions

function localStorageLoad () {
    // listFruitReceipt();
    collectionsFruits = [
        {
            name : 'manzana',
            value : 1
        },
        {
            name : 'pera',
            value : 2
        },
        {
            name : 'guayaba',
            value : 3
        },
        {
            name : 'maracuyá',
            value : 4
        },
    ];

    localStorage.setItem('fruits', JSON.stringify(collectionsFruits)); 
    listFruitsToDOM();
}

function listFruitsToDOM () {
    const collectionsFruitsToLocalStorage = JSON.parse(localStorage.getItem('fruits'));

    if (collectionsFruitsToLocalStorage) {
        const selectFruits = document.querySelector('select');     
     
        for (let fruitArray in collectionsFruitsToLocalStorage) {
            const option = document.createElement('option');
            option.textContent = collectionsFruitsToLocalStorage[fruitArray].name;
            selectFruits.appendChild(option);
        }
        
    }
}

function setValue () {
    document.querySelector('#priceToUnit').value = 0;
    document.querySelector('#quantityUnits').value = 0;
    document.querySelector('#priceForTotalUnits').value = 0;

    const fruits = JSON.parse(localStorage.getItem('fruits'));
    const selectedFruitStr = document.querySelector('select').value;
    const selectedFruitObj = fruits.filter(item => item.name === selectedFruitStr);

    if (selectedFruitObj[0]) {
        document.querySelector('#priceToUnit').value = selectedFruitObj[0].value;  
    } else {
        document.querySelector('#priceToUnit').value = '$'; 
    }
}

function setQuantity () {
    const quantityUnits = document.querySelector('#quantityUnits').value, 
        priceToUnit = document.querySelector('#priceToUnit').value;

    if (document.querySelector('#quantityUnits').value !== '') {

        if (priceToUnit != '') {
            document.querySelector('#priceForTotalUnits').value = priceToUnit * quantityUnits;
        } else {
            document.querySelector('#priceForTotalUnits').value = '$';
        }
        
    }
}

function addProductToList (e) {

    e.preventDefault();
    let product = document.querySelector('#product').value,
        priceToUnit = document.querySelector('#priceToUnit').value,
        quantityUnits = document.querySelector('#quantityUnits').value,
        priceForTotalUnits = document.querySelector('#priceForTotalUnits').value;

        producto = {
            'nameProduct' : product,
            'priceToUnit' : priceToUnit,
            'quantityUnits' : quantityUnits,
            'priceForTotalUnits' : priceForTotalUnits,
        } 

    addProductToLocalStorage(producto);
}

//Add product to LocalStorage
function addProductToLocalStorage (producto) {
    colecctionProducts = [];

    let products;
    products = getProductLocalStorage();

    if (products.length > 0) {
        products.forEach( item => {
            colecctionProducts.push(item);
        });
    }

    colecctionProducts.push(producto);

    // producto.forEach( item => {
    //     objects.push(item);
    // });

    localStorage.setItem('products', JSON.stringify(colecctionProducts)); 
}

function getProductLocalStorage () {
    let products;

    if (localStorage.getItem('products') === null) {
        products = [];
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }
    return products;
}
