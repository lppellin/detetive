var suspects = ['PREFEITO', 'MORDOMO', 'COZINHEIRO', 'FLORISTA', 'MÉDICA', 'DANÇARINA', 'COVEIRO', 'CIGANA'];
var weapons = ['ESPINGARDA', 'PÁ', 'PÉ DE CABRA', 'TESOURA', 'ARMA QUÍMICA', 'VENENO', 'SOCO INGLÊS', 'FACA'];
var locations = ['PREFEITURA', 'RESTAURANTE', 'FLORICULTURA', 'BOATE', 'HOSPITAL', 'MANSÃO', 'CEMITÉRIO', 'PRAÇA', 'HOTEL', 'BANCO', 'ESTAÇÃO'];

function createItems(listId, items) {
 var ul = document.getElementById(listId);
 items.forEach(function(item) {
   var li = document.createElement("li");
   li.className = "list-group-item";
   li.innerHTML = item + ' <input type="checkbox" class="checkbox">' + ' <input type="text" class="input-size" placeholder="">';
   ul.appendChild(li);
 });
}

createItems('suspectsList', suspects);
createItems('weaponsList', weapons);
createItems('locationsList', locations);

window.onload = function() {
 // Recuperar o estado das caixas de seleção do localStorage
 var checkboxes = document.querySelectorAll('.list-group-item input[type=checkbox]');
 checkboxes.forEach(function(checkbox, index) {
   checkbox.id = 'checkbox' + index;
   var savedState = localStorage.getItem(checkbox.id);
   if (savedState !== null) {
     checkbox.checked = savedState === 'true';
   }

   // Atualizar o localStorage sempre que o estado da caixa de seleção mudar
   checkbox.addEventListener('change', function() {
     localStorage.setItem(checkbox.id, checkbox.checked);
   });
 });

 // Campo de entrada de texto
 var inputs = document.querySelectorAll('.list-group-item input[type=text]');
 inputs.forEach(function(input, index) {
   input.id = 'input' + index;
   var savedValue = localStorage.getItem(input.id);
   if (savedValue !== null) {
     input.value = savedValue;
   }

   // Atualizar o localStorage sempre que o valor do campo de entrada de texto mudar
   input.addEventListener('input', function() {
     localStorage.setItem(input.id, input.value);
   });
 });

 // Botão para restaurar o estado das caixas de seleção e o valor do campo de entrada de texto
 var restoreButton = document.createElement('button');
 restoreButton.textContent = 'Limpar';
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
 };
 document.body.appendChild(restoreButton);
};