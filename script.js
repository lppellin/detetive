const suspects = ['PREFEITO', 'MORDOMO', 'COZINHEIRO', 'FLORISTA', 'MÉDICA', 'DANÇARINA', 'COVEIRO', 'CIGANA'];
const weapons = ['ESPINGARDA', 'PÁ', 'PÉ DE CABRA', 'TESOURA', 'ARMA QUÍMICA', 'VENENO', 'SOCO INGLÊS', 'FACA'];
const locations = ['PREFEITURA', 'RESTAURANTE', 'FLORICULTURA', 'BOATE', 'HOSPITAL', 'MANSÃO', 'CEMITÉRIO', 'PRAÇA', 'HOTEL', 'BANCO', 'ESTAÇÃO'];

function createItems(listId, items, classname) {
    const ul = document.getElementById(listId);
    items.forEach(function(item) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<p>${item}</p> <input type="checkbox" class="checkbox ${classname}"> <input type="text" class="input-size" placeholder="">`;
        ul.appendChild(li);
    });
}

createItems('suspectsList', suspects, 'check-suspects');
createItems('weaponsList', weapons, 'check-weapons');
createItems('locationsList', locations, 'check-locations');

function countSelectedCheckboxes(className) {
    return document.querySelectorAll(`.${className}:checked`).length;
}

function updateCountDisplay(className, displayId) {
    const count = countSelectedCheckboxes(className);
    document.getElementById(displayId).textContent = `Selected: ${count}`;
}

function createCountDisplay(listId, displayId) {
    const display = document.createElement("div");
    display.id = displayId;
    display.textContent = "Selected: 0";
    document.getElementById(listId).parentNode.appendChild(display);
}

window.onload = function() {
    const checkboxes = document.querySelectorAll('.list-group-item input[type=checkbox]');
    checkboxes.forEach(function(checkbox, index) {
        checkbox.id = 'checkbox' + index;
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState !== null) {
            checkbox.checked = savedState === 'true';
        }

        checkbox.addEventListener('change', function() {
            localStorage.setItem(checkbox.id, checkbox.checked);
            if (checkbox.classList.contains('check-suspects')) {
                updateCountDisplay('check-suspects', 'count-suspects');
            } else if (checkbox.classList.contains('check-weapons')) {
                updateCountDisplay('check-weapons', 'count-weapons');
            } else if (checkbox.classList.contains('check-locations')) {
                updateCountDisplay('check-locations', 'count-locations');
            }
        });
    });

    const inputs = document.querySelectorAll('.list-group-item input[type=text]');
    inputs.forEach(function(input, index) {
        input.id = 'input' + index;
        const savedValue = localStorage.getItem(input.id);
        if (savedValue !== null) {
            input.value = savedValue;
        }

        input.addEventListener('input', function() {
            localStorage.setItem(input.id, input.value);
        });
    });

    const restoreButton = document.createElement('button');
    restoreButton.textContent = 'CLEAR';
    restoreButton.className = 'restore-button';
    restoreButton.onclick = function() {
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
            localStorage.removeItem(checkbox.id);
        });
        inputs.forEach(function(input) {
            input.value = '';
            localStorage.removeItem(input.id);
        });
        updateCountDisplay('check-suspects', 'count-suspects');
        updateCountDisplay('check-weapons', 'count-weapons');
        updateCountDisplay('check-locations', 'count-locations');
    };
    document.body.appendChild(restoreButton);

    // Create count displays
    createCountDisplay('suspectsList', 'count-suspects');
    createCountDisplay('weaponsList', 'count-weapons');
    createCountDisplay('locationsList', 'count-locations');

    // Initialize counts
    updateCountDisplay('check-suspects', 'count-suspects');
    updateCountDisplay('check-weapons', 'count-weapons');
    updateCountDisplay('check-locations', 'count-locations');
};
