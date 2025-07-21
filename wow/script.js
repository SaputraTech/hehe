document.addEventListener('DOMContentLoaded', () => {
    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            if (card) {
                // Mengumpulkan informasi dari kartu
                const title = card.querySelector('.product-title').innerText;
                const features = Array.from(card.querySelectorAll('.product-features li'))
                                    .map(li => `- ${li.innerText}`)
                                    .join('\n');
                const price = card.querySelector('.product-price').innerText;

                // Format teks yang akan disalin
                const textToCopy = `Halo, saya tertarik dengan akun ini:\n\n*Produk:* ${title}\n*Fitur:*\n${features}\n\n*Harga:* ${price}`;
                
                // Salin ke clipboard
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Feedback visual untuk pengguna
                    const originalText = button.innerText;
                    button.innerText = '✅ Tersalin!';
                    button.style.backgroundColor = '#28a745'; // Warna hijau sukses

                    setTimeout(() => {
                        button.innerText = originalText;
                        button.style.backgroundColor = ''; // Kembali ke warna asal
                    }, 2000); // Reset setelah 2 detik
                }).catch(err => {
                    console.error('Gagal menyalin teks: ', err);
                    alert('Oops, gagal menyalin info.');
                });
            }
        });
    });
});