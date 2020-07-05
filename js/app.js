//Vars
const receiptList = document.querySelector('#receiptList');

//Events
eventsListenersToSale();

function eventsListenersToSale () {
    document.addEventListener('DOMContentLoaded', localStorageLoad);
    document.querySelector('#formToSale').addEventListener('submit', addProductToList);
}

//Functions

function localStorageLoad () {
    // listFruitReceipt();
    collectionsFruits = [
        {
            name : 'manzana',
            value : 3
        },
        {
            name : 'pera',
            value : 8
        },
        {
            name : 'guayaba',
            value : 5
        },
        {
            name : 'maracuyá',
            value : 8
        },
    ];

    localStorage.setItem('fruits', JSON.stringify(collectionsFruits)); 
    listFruitsToDOM();
}

function listFruitsToDOM () {
    const collectionsFruitsToLocalStorage = JSON.parse(localStorage.getItem('fruits'));

    if (collectionsFruitsToLocalStorage) {
        const selectFruits = document.querySelector('select'); 
        const priceToUnit = document.querySelector('#priceToUnit');         
        
        for (let fruitArray in collectionsFruitsToLocalStorage) {
            const option = document.createElement('option');
            option.textContent = collectionsFruitsToLocalStorage[fruitArray].name;

            //console.log(priceToUnit.value = collectionsFruitsToLocalStorage[fruitArray].value);
            selectFruits.appendChild(option);
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
