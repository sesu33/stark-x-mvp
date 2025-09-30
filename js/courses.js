// ===================================
// Courses Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const levelBtns = document.querySelectorAll('.level-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    let activeCategory = 'all';
    let activeLevel = 'all';
    
    // Category Filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected category
            activeCategory = this.getAttribute('data-filter');
            
            // Filter courses
            filterCourses();
        });
    });
    
    // Level Filter
    levelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            levelBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected level
            activeLevel = this.getAttribute('data-level');
            
            // Filter courses
            filterCourses();
        });
    });
    
    // Filter Function
    function filterCourses() {
        courseCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardLevel = card.getAttribute('data-level');
            
            const categoryMatch = activeCategory === 'all' || cardCategory === activeCategory;
            const levelMatch = activeLevel === 'all' || cardLevel === activeLevel;
            
            if (categoryMatch && levelMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Check if no courses match
        setTimeout(() => {
            const visibleCourses = Array.from(courseCards).filter(card => 
                card.style.display !== 'none'
            );
            
            if (visibleCourses.length === 0) {
                showNoResultsMessage();
            } else {
                removeNoResultsMessage();
            }
        }, 350);
    }
    
    // Show No Results Message
    function showNoResultsMessage() {
        removeNoResultsMessage();
        
        const coursesGrid = document.querySelector('.courses-grid');
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <i class="fas fa-search" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
            <h3>No Courses Found</h3>
            <p>Try adjusting your filters to see more courses</p>
        `;
        noResults.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 4rem 2rem;
            color: var(--gray-text);
        `;
        
        coursesGrid.appendChild(noResults);
    }
    
    // Remove No Results Message
    function removeNoResultsMessage() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
});
