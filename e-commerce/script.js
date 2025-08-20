document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;

            // Update cart count
            const cartCount = document.querySelector('.header-icons .cart-count');
            let count = parseInt(cartCount.textContent) || 0;
            count++;
            cartCount.textContent = count;

            alert(`${productName} telah ditambahkan ke keranjang!`);
        });
    });

    // Wishlist buttons
    const wishlistButtons = document.querySelectorAll('.wishlist');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-heart"></i>';
            this.style.color = '#ff6b6b';

            const wishlistCount = document.querySelectorAll('.header-icons .cart-count')[1];
            let count = parseInt(wishlistCount.textContent) || 0;
            count++;
            wishlistCount.textContent = count;
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if(email) {
            alert(`Terima kasih! Email ${email} telah berhasil berlangganan newsletter kami.`);
            this.reset();
        }
    });

    // Feedback form
    const feedbackForm = document.querySelector('.feedback-form');
    const testimonialContainer = document.querySelector('.testimonial-container');

    if (feedbackForm && testimonialContainer) {
        feedbackForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = feedbackForm.name.value.trim();
            const message = feedbackForm.message.value.trim();
            const rating = feedbackForm.rating.value;

            if (!name || !message || !rating) {
                alert('Mohon lengkapi semua field sebelum mengirim.');
                return;
            }

            // Create new testimonial card
            const testimonialCard = document.createElement('div');
            testimonialCard.classList.add('testimonial-card');

            const testimonialText = document.createElement('div');
            testimonialText.classList.add('testimonial-text');
            testimonialText.textContent = message;

            const testimonialAuthor = document.createElement('div');
            testimonialAuthor.classList.add('testimonial-author');

            const authorAvatar = document.createElement('div');
            authorAvatar.classList.add('author-avatar');
            // Use a placeholder avatar image
            const avatarImg = document.createElement('img');
            avatarImg.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=random&size=64';
            avatarImg.alt = 'Customer';
            authorAvatar.appendChild(avatarImg);

            const authorName = document.createElement('div');
            authorName.classList.add('author-name');
            authorName.textContent = name;

            const authorTitle = document.createElement('div');
            authorTitle.classList.add('author-title');
            authorTitle.textContent = 'Pelanggan';

            testimonialAuthor.appendChild(authorAvatar);
            testimonialAuthor.appendChild(authorName);
            testimonialAuthor.appendChild(authorTitle);

            testimonialCard.appendChild(testimonialText);

            // Create rating display below name
            const ratingDisplay = document.createElement('div');
            ratingDisplay.classList.add('testimonial-rating');
            ratingDisplay.style.color = '#ffc107';
            ratingDisplay.style.fontSize = '20px';
            ratingDisplay.style.marginTop = '4px';

            // Add star icons based on rating value
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.textContent = i <= rating ? '★' : '☆';
                ratingDisplay.appendChild(star);
            }

            testimonialAuthor.appendChild(ratingDisplay);
            testimonialCard.appendChild(testimonialAuthor);

            testimonialContainer.appendChild(testimonialCard);

            alert('Terima Kasih Atas Masukannya');

            // Reset form
            feedbackForm.reset();
        });
    }

    // Rating selection display
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const ratingContainer = document.querySelector('.rating').parentNode;
    const selectedRating = document.createElement('div');
    selectedRating.id = 'selected-rating';
    selectedRating.style.textAlign = 'center';
    selectedRating.style.fontSize = '16px';
    selectedRating.style.color = '#333';
    selectedRating.style.fontWeight = '600';
    selectedRating.style.marginTop = '10px';
    selectedRating.textContent = 'Pilih rating Anda';
    ratingContainer.appendChild(selectedRating);

    ratingInputs.forEach(input => {
        input.addEventListener('change', () => {
            selectedRating.textContent = `Rating dipilih: ${input.value}`;
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.style.display = 'none';
            });
            
            let isValid = true;
            
            // Validasi nama
            if (!name) {
                document.getElementById('nameError').textContent = 'Nama lengkap wajib diisi';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validasi email
            if (!email) {
                document.getElementById('emailError').textContent = 'Email wajib diisi';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Format email tidak valid';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validasi subjek
            if (!subject) {
                alert('Mohon pilih subjek pesan');
                isValid = false;
            }
            
            // Validasi pesan
            if (!message) {
                document.getElementById('messageError').textContent = 'Pesan wajib diisi';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('messageError').textContent = 'Pesan minimal 10 karakter';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simulasi pengiriman form
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;
                
                // Disable tombol submit
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                
                // Simulasi delay pengiriman
                setTimeout(() => {
                    // Tampilkan alert sukses
                    showContactAlert('success', 'Pesan Anda telah berhasil dikirim! Kami akan segera merespons.');
                    
                    // Reset form
                    contactForm.reset();
                    document.getElementById('charCount').textContent = '0';
                    
                    // Enable tombol submit kembali
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 2000);
            } else {
                // Tampilkan alert gagal
                showContactAlert('error', 'Mohon lengkapi semua field yang wajib diisi dengan benar.');
            }
        });
        
        // Character counter untuk textarea
        const messageTextarea = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        
        if (messageTextarea && charCount) {
            messageTextarea.addEventListener('input', function() {
                const length = this.value.length;
                charCount.textContent = length;
                
                if (length > 450) {
                    charCount.style.color = '#ef4444';
                } else {
                    charCount.style.color = '#64748b';
                }
            });
        }
    }
    
    // Fungsi untuk validasi email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fungsi untuk menampilkan alert kontak
    function showContactAlert(type, message) {
        // Hapus alert yang sudah ada
        const existingAlert = document.querySelector('.contact-alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Buat elemen alert baru
        const alertDiv = document.createElement('div');
        alertDiv.className = `contact-alert contact-alert-${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const title = type === 'success' ? 'Sukses!' : 'Gagal!';
        
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas ${icon}"></i>
                <div class="alert-text">
                    <strong>${title}</strong>
                    <p>${message}</p>
                </div>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Tambahkan ke body
        document.body.appendChild(alertDiv);
        
        // Auto hilang setelah 5 detik untuk sukses, 7 detik untuk error
        const timeout = type === 'success' ? 5000 : 7000;
        setTimeout(() => {
            if (alertDiv.parentElement) {
                alertDiv.remove();
            }
        }, timeout);
    }
});
