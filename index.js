let phoneName = document.getElementById('phoneName');
let phonePrice = document.getElementById('phonePrice');
let phoneCount = document.getElementById('phoneCount');
let submitBtn = document.getElementById('submitBtn');

let mood = 'create';
let tmp;

let phonesList = localStorage.phones ? JSON.parse(localStorage.phones) : [];
showData();

function addOrUpdatePhone() {
    let newPhone = {
        name: phoneName.value.trim(),
        price: phonePrice.value,
        count: phoneCount.value
    };

    if (newPhone.name !== '' && newPhone.price !== '' && newPhone.count !== '') {
        if (mood === 'create') {
            phonesList.push(newPhone);
        } else {
            phonesList[tmp] = newPhone;
            mood = 'create';
            submitBtn.innerHTML = 'Enter Phone';
            submitBtn.style.backgroundColor = '#644f62';
        }
        clearData();
    } else {
        alert('Please fill in all fields!');
        return;
    }

    localStorage.setItem('phones', JSON.stringify(phonesList));
    showData();
}

function clearData() {
    phoneName.value = '';
    phonePrice.value = '';
    phoneCount.value = '';
}

function showData() {
    let table = '';
    for (let i = 0; i < phonesList.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${phonesList[i].name}</td>
                <td>$${phonesList[i].price}</td>
                <td>${phonesList[i].count}</td>
                <td><button class="btn-edit" onclick="updateData(${i})">Edit</button></td>
                <td><button class="btn-delete" onclick="deleteData(${i})">Delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tableBody').innerHTML = table;
}

function deleteData(i) {
    phonesList.splice(i, 1);
    localStorage.setItem('phones', JSON.stringify(phonesList));
    showData();
}

function updateData(i) {
    phoneName.value = phonesList[i].name;
    phonePrice.value = phonesList[i].price;
    phoneCount.value = phonesList[i].count;
    
    submitBtn.innerHTML = 'Update Phone';
    submitBtn.style.backgroundColor = '#f39c12';
    mood = 'update';
    tmp = i;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}