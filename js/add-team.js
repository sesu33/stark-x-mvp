// ===================================
// Add Team Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const addTeamForm = document.getElementById('addTeamForm');
    
    if (addTeamForm) {
        addTeamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const teamName = document.getElementById('teamName').value.trim();
            const university = document.getElementById('university').value;
            const teamSize = document.getElementById('teamSize').value;
            const teamDescription = document.getElementById('teamDescription').value.trim();
            const skills = document.getElementById('skills').value.trim();
            const contactName = document.getElementById('contactName').value.trim();
            const contactEmail = document.getElementById('contactEmail').value.trim();
            const contactPhone = document.getElementById('contactPhone').value.trim();
            
            // Get selected fields
            const selectedFields = Array.from(document.querySelectorAll('input[name="field"]:checked'))
                .map(cb => cb.value);
            
            const termsAccepted = document.querySelector('input[name="terms"]').checked;
            
            // Validate form
            if (!teamName || !university || !teamSize || !teamDescription || !skills) {
                showErrorMessage('Please fill in all required fields in Team Information section');
                return;
            }
            
            if (selectedFields.length === 0) {
                showErrorMessage('Please select at least one field of expertise');
                return;
            }
            
            if (!contactName || !contactEmail || !contactPhone) {
                showErrorMessage('Please fill in all required contact information');
                return;
            }
            
            if (!validateEmail(contactEmail)) {
                showErrorMessage('Please enter a valid email address');
                return;
            }
            
            if (!validatePhone(contactPhone)) {
                showErrorMessage('Please enter a valid phone number');
                return;
            }
            
            if (!termsAccepted) {
                showErrorMessage('Please accept the terms to continue');
                return;
            }
            
            // Validate team size
            if (teamSize < 1 || teamSize > 50) {
                showErrorMessage('Team size must be between 1 and 50 members');
                return;
            }
            
            // Simulate form submission
            const submitBtn = addTeamForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showSuccessMessage('Application submitted successfully! We will review your team and contact you via email within 3-5 business days.');
                
                // Redirect to network page after 3 seconds
                setTimeout(() => {
                    window.location.href = 'network.html';
                }, 3000);
            }, 2000);
        });
        
        // Real-time validation for email
        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail) {
            contactEmail.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = '#ff0080';
                } else {
                    this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                }
            });
        }
        
        // Real-time validation for phone
        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone) {
            contactPhone.addEventListener('blur', function() {
                if (this.value && !validatePhone(this.value)) {
                    this.style.borderColor = '#ff0080';
                } else {
                    this.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                }
            });
        }
        
        // Character counter for description
        const teamDescription = document.getElementById('teamDescription');
        if (teamDescription) {
            const counter = document.createElement('small');
            counter.style.cssText = 'color: var(--gray-text); margin-top: 5px; display: block;';
            teamDescription.parentElement.appendChild(counter);
            
            teamDescription.addEventListener('input', function() {
                const length = this.value.length;
                counter.textContent = `${length} characters`;
                
                if (length < 50) {
                    counter.style.color = '#ff0080';
                } else if (length < 100) {
                    counter.style.color = '#ffa500';
                } else {
                    counter.style.color = 'var(--primary-color)';
                }
            });
        }
    }
});
