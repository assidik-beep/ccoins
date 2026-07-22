<script type="text/javascript">
    $(function() {
        // 1. Ambil parameter 's1' otomatis dari URL permalink browser
        var urlParams = new URLSearchParams(window.location.search);
        var s1Value = urlParams.get('s1') || ''; // Jika tidak ada ?s1= di URL, otomatis kosong

        // ============================================================
        // JIKA PARAMETER S1 ADA ISI-NYA, UBAH TITLE HALAMAN OTOMATIS
        // ============================================================
        if (s1Value !== '') {
            document.title = s1Value; 
            // Contoh: title berubah menjadi "tinyhouse4"
            // Jika ingin ada tambahan teks, bisa pakai: document.title = s1Value + " - Bonus Now";
        }

        // 2. Pasang nilai s1Value secara dinamis ke dalam URL API
        var apiUrl = "https://de6jvomfbm0af.cloudfront.net/public/offers/feed.php?user_id=22326&api_key=08f0cd590e92459a4f8db9e1fa9215c7&s1=" + encodeURIComponent(s1Value) + "&s2=&callback=?";

        $.getJSON(apiUrl, function(offers){
            var html = '';
            var numOffers = 1; // Jumlah maksimal offer yang ingin ditampilkan di halaman
            var finalOffers = [];
                                            
            // 3. Daftar semua ID offer yang Anda targetkan
            var targetIds = [4202, 18700, 6194, 21073, 21616, 20935]; 

            // 4. FILTER: Cari tahu apakah ada ID target yang tersedia di negara/perangkat user
            var filteredOffers = offers.filter(function(offer) {
                var currentId = offer.id || offer.offer_id; 
                return targetIds.includes(Number(currentId));
            });

            // 5. LOGIKA CADANGAN OTOMATIS:
            if (filteredOffers.length > 0) {
                finalOffers = filteredOffers.splice(0, numOffers);
            } else {
                finalOffers = offers.splice(0, numOffers);
            }
                                            
            // 6. LOOPING: Tampilkan data akhir yang dipilih
            $.each(finalOffers, function(key, offer){
                var imgSrc = offer.network_icon || 'https://via.placeholder.com/76';
                                                    
                html += '<a href="' + offer.url + '" target="_blank" class="sc-offer-item">';
                html += '  <div class="sc-offer-icon-wrap">';
                html += '    <img src="' + imgSrc + '" alt="Icon">';
                html += '  </div>';
                html += '  <div class="sc-offer-details">';
                html += '    <div class="sc-offer-title">' + offer.anchor + '</div>';
                html += '    <div class="sc-offer-desc">' + offer.conversion + '</div>';
                html += '    <div class="sc-offer-meta-row">';
                html += '      <div class="sc-offer-btn">Complete</div>';
                html += '      <div class="sc-offer-stars">';
                html += '        <i class="fa-solid fa-star"></i>';
                html += '        <i class="fa-solid fa-star"></i>';
                html += '        <i class="fa-solid fa-star"></i>';
                html += '        <i class="fa-solid fa-star"></i>';
                html += '        <i class="fa-solid fa-star"></i>';
                $.trim(html); // Membersihkan spasi kosong
                html += '      </div>';
                html += '    </div>';
                html += '  </div>';
                html += '</a>';
            });
                                            
            if (html === '') {
                html = '<p>Offer tidak tersedia saat ini.</p>';
            }

            $("#offerContainer").html(html);
        });
    });
</script>