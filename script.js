document.addEventListener('DOMContentLoaded', function() {
    /**
     * Fungsi untuk menghasilkan angka acak semu berdasarkan "benih" (seed).
     * Untuk benih yang sama, hasilnya akan selalu sama.
     * @param {number} seed - Angka untuk memulai generator acak.
     * @returns {number} - Angka acak antara 0 dan 1.
     */
    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }

    /**
     * Mengubah string menjadi representasi angka sederhana untuk digunakan sebagai benih.
     * @param {string} str - Teks input (misal: nama server).
     * @returns {number} - Angka hasil konversi.
     */
    function stringToSeed(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    // --- LOGIKA UNTUK UPTIME SERVER ---

    // Ambil semua elemen server
    const serverItems = document.querySelectorAll('.server-item');

    // Dapatkan tanggal hari ini sebagai bagian dari benih untuk memastikan nilai berubah setiap hari.
    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    serverItems.forEach(item => {
        // Temukan elemen yang relevan di dalam setiap item server
        const nameElement = item.querySelector('.name');
        const uptimePercentText = item.querySelector('.uptime-percent');
        const barContainer = item.querySelector('.uptime-bar-container');

        // Buat benih unik untuk setiap server dengan menggabungkan tanggal dan nama server
        const serverNameSeed = stringToSeed(nameElement.innerText);
        const finalSeed = dateSeed + serverNameSeed;

        // Hasilkan angka acak yang konsisten untuk hari ini
        const randomValue = seededRandom(finalSeed);

        // Atur rentang uptime, misalnya antara 95% dan 100%
        let uptime = 95 + (randomValue * 5);

        // Jika uptime sangat tinggi, bulatkan menjadi 100%
        if (uptime > 99.99) {
            uptime = 100;
        }

        // Tampilkan persentase dengan dua angka desimal
        uptimePercentText.innerText = uptime.toFixed(2) + '%';
        
        // Perbarui bar visualisasi
        if (barContainer) {
            barContainer.innerHTML = ''; // Kosongkan bar yang ada
            const totalBars = 40;
            const upBars = Math.round((uptime / 100) * totalBars);

            for (let i = 0; i < totalBars; i++) {
                const bar = document.createElement('div');
                bar.classList.add('uptime-bar');
                if (i >= upBars) {
                    bar.classList.add('down');
                }
                barContainer.appendChild(bar);
            }
        }
    });

    // --- LOGIKA UNTUK WAKTU PEMBARUAN ACAK DI FOOTER ---

    const lastUpdatedElement = document.getElementById('last-updated-time');
    if (lastUpdatedElement) {
        // Hasilkan angka acak untuk jam, menit, dan detik
        const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
        const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0');

        // Gabungkan menjadi format waktu HH:MM:SS
        const randomTime = `${hours}:${minutes}:${seconds}`;

        // Masukkan waktu acak ke dalam elemen span di footer
        lastUpdatedElement.innerText = randomTime;
    }
});