    // Array para armazenar os endereços
    let addresses = [];

    // Função para adicionar um novo endereço
    function addAddress() {
        const address = document.getElementById("address").value;
        const city = document.getElementById("city").value;
        const state = document.getElementById("state").value;
        const zip = document.getElementById("zip").value;

        if (address && city && state && zip) {
            const newAddress = { address, city, state, zip };
            addresses.push(newAddress);
            renderAddresses();
            clearFields();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    }

    // Função para limpar os campos de entrada
    function clearFields() {
        document.getElementById("address").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("zip").value = "";
    }

    // Função para renderizar os endereços na tela
    function renderAddresses() {
        const addressList = document.getElementById("addressList");
        addressList.innerHTML = "";

        addresses.forEach((addr, index) => {
            const addressItem = document.createElement("div");
            addressItem.classList.add("address-item");

            addressItem.innerHTML = `
                <p><strong>Endereço:</strong> ${addr.address}</p>
                <p><strong>Cidade:</strong> ${addr.city}</p>
                <p><strong>Estado:</strong> ${addr.state}</p>
                <p><strong>CEP:</strong> ${addr.zip}</p>
                <div class="address-actions">
                    <button class="button edit-button" onclick="editAddress(${index})">Editar</button>
                    <button class="button delete-button" onclick="deleteAddress(${index})">Excluir</button>
                </div>
            `;

            addressList.appendChild(addressItem);
        });
    }

    // Função para excluir um endereço
    function deleteAddress(index) {
        addresses.splice(index, 1);
        renderAddresses();
    }

    // Função para editar um endereço
    function editAddress(index) {
        const addr = addresses[index];
        document.getElementById("address").value = addr.address;
        document.getElementById("city").value = addr.city;
        document.getElementById("state").value = addr.state;
        document.getElementById("zip").value = addr.zip;

        deleteAddress(index);
    }
