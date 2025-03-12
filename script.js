
        let order = [];
        const storeLocation = { lat: -6.200000, lng: 106.800000 }; // Lokasi penjual (misalnya Jakarta)

        function toggleMenu() {
            const menu = document.getElementById("menu");
            menu.style.display = menu.style.display === "none" ? "block" : "none";
        }

        // Toggle Menu Minuman (Drink Menu)
        function toggleDrinksMenu() {
            const drinksMenu = document.getElementById("drinks-menu");
            drinksMenu.style.display = drinksMenu.style.display === "none" ? "block" : "none";
        }
        function updateDimsumPriceAndImage(price, imageUrl) {
            document.getElementById("harga").innerText = "Rp " + price.toLocaleString("id-ID");
            document.getElementById("dimsum-image").src = imageUrl;
        }

        function addDimsumToOrder() {
            const qty = parseInt(document.getElementById("qty-dimsum").value);
            const selectedPrice = parseInt(document.querySelector('input[name="jumlah-isi"]:checked').value);
            if (qty <= 0 || isNaN(qty)) {
                alert("Masukkan jumlah yang valid!");
                return;
            }
            order.push({ name: "Dimsum Mentai", price: selectedPrice, quantity: qty });
            updateOrderList();
        }

        function addToOrder(name, price, qtyId) {
            const quantity = parseInt(document.getElementById(qtyId).value);
            if (quantity <= 0 || isNaN(quantity)) {
                alert("Masukkan jumlah yang valid!");
                return;
            }
            order.push({ name, price, quantity });
            updateOrderList();
        }

        function updateOrderList() {
            const orderList = document.getElementById("order-list");
            orderList.innerHTML = "";
            order.forEach((item, index) => {
                const li = document.createElement("li");
                li.textContent = `${item.quantity}x ${item.name} - Rp ${(item.price * item.quantity).toLocaleString()}`;
                orderList.appendChild(li);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Hapus";
                deleteButton.style.backgroundColor = "#ff5722";
                deleteButton.style.color = "#fff";
                deleteButton.style.border = "none";
                deleteButton.style.padding = "5px 10px";
                deleteButton.style.marginLeft = "10px";
                deleteButton.style.marginTop = "10px";
                deleteButton.style.cursor = "pointer";
                deleteButton.onclick = () => removeItemFromOrder(index);

                li.appendChild(deleteButton);
                orderList.appendChild(li);
            });
        }

        function removeItemFromOrder(index) {
            order.splice(index, 1);
            updateOrderList();
        }

        function validateContact() {
            const contactField = document.getElementById("customer-contact");
            const contactError = document.getElementById("contact-error");
            if (!/^[0-9]*$/.test(contactField.value)) {
                contactError.style.display = "block";
                contactField.value = contactField.value.replace(/\D/g, '');
            } else {
                contactError.style.display = "none";
            }
        }

        function toggleDeliveryAddress() {
            const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
            const addressField = document.getElementById('delivery-address');
            
            if (deliveryOption === 'diantar') {
                addressField.style.display = 'block';
            } else {
                addressField.style.display = 'none';
            }
        }

        function validateContact() {
            const contactInput = document.getElementById('customer-contact');
            const contactError = document.getElementById('contact-error');
            
            if (contactInput.value && !/^[0-9]+$/.test(contactInput.value)) {
                contactError.style.display = 'block';
            } else {
                contactError.style.display = 'none';
            }
        }

        function submitOrder() {
            const name = document.getElementById('customer-name').value;
            const contact = document.getElementById('customer-contact').value;
            const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
            const address = document.getElementById('address').value;

            if (!name || !contact) {
                alert("Harap isi nama dan kontak Anda.");
                return;
            }

            if (deliveryOption === 'diantar' && !address) {
                alert("Harap isi alamat pengantaran.");
                return;
            }

            let orderDetails = `Nama: ${name}\nKontak: ${contact}\n`;
            orderDetails += `Pengantaran: ${deliveryOption === 'diantar' ? 'Diantar' : 'Ambil Sendiri'}\n`;
            if (deliveryOption === 'diantar') {
                orderDetails += `Alamat: ${address}\n`;
            }

            alert("Pesanan Anda berhasil dikirim!\n\n" + orderDetails);
        }

        function openMap() {
            const mapURL = `https://maps.app.goo.gl/sw4wwepeS3tWAcJz8`;
            window.open(mapURL, "_blank");
        }
            let dailyTransactions = [];
            let isAuthenticated = false;
        
            function submitOrder() {
                const name = document.getElementById("customer-name").value;
                const contact = document.getElementById("customer-contact").value;
                const address = document.getElementById("address").value;
                const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
        
                if (!name || !contact) {
                    alert("Harap isi nama dan kontak!");
                    return;
                }
        
                let orderText = order.map(o => `- ${o.quantity}x ${o.name} (Rp ${(o.price * o.quantity).toLocaleString()})`).join("%0A");
        
                if (deliveryOption === "diantar" && !address) {
                    alert("Harap masukkan alamat pengantaran!");
                    return;
                }
        
                const totalAmount = order.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const timestamp = new Date().toLocaleString("id-ID");
        
                dailyTransactions.push({
                    timestamp,
                    name,
                    contact,
                    deliveryOption,
                    address: address || "Ambil Sendiri",
                    items: order.map(item => `${item.quantity}x ${item.name}`).join(", "),
                    totalAmount
                });
        
                const message = `Halo, ${name} ingin memesan:%0A${orderText}%0A%0ANama: ${name}%0AKontak: ${contact} %0AAlamat :${address}`;
                const phoneNumber = "6289508505031";
                const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
        
                window.open(whatsappURL, "_blank");
                order = [];
                updateOrderList();
        
                document.getElementById("customer-name").value = "";
                document.getElementById("customer-contact").value = "";
                document.getElementById("address").value = "";
            }
        
            function showLoginForm() {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('login-form').style.display = 'block';
            }
    
            function validateLogin() {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
    
                // Contoh kredensial statis
                if (username === 'raka pasaribu' && password === '260505') {
                    alert('Login berhasil!');
                    document.getElementById('login-form').style.display = 'none';
                    document.getElementById('download-section').style.display = 'block';
                } else {
                    alert('Login gagal! Periksa kembali username dan password.');
                }
            }
            function downloadTransactions() {
                if (dailyTransactions.length === 0) {
                    alert('Tidak ada transaksi untuk diunduh.');
                    return;
                }
            
                let csvContent = "Tanggal,Waktu,Nama,Kontak,Pengantaran,Alamat,Item,Total (Rp)\n";
            
                dailyTransactions.forEach((trx) => {
                    if (trx.deliveryOption === "diantar") {
                        csvContent += `${trx.timestamp},${trx.name},${trx.contact},${trx.deliveryOption},${trx.address},"${trx.items}",${trx.totalAmount}\n`;
                    } else {
                        csvContent += `${trx.timestamp},${trx.name},${trx.contact},${trx.deliveryOption},-,"${trx.items}",${trx.totalAmount}\n`;
                    }
                });
            
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
            
                link.setAttribute('href', url);
                link.setAttribute('download', 'transaksi_hari_ini.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            
                alert('Transaksi berhasil diunduh!');
            }
            
           
        
            
        