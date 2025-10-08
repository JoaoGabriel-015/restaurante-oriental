

document.addEventListener('DOMContentLoaded', () => {
    
    const countdownElementId = 'ofertas-countdown'; 
    const countdownElement = document.getElementById(countdownElementId);

    if (!countdownElement) {
        console.error(`Elemento com ID '${countdownElementId}' não encontrado.`);
        return;
    }

    
    function calculateTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date(now);

       
        midnight.setDate(now.getDate() + 1);
        midnight.setHours(0, 0, 0, 0);

        return midnight.getTime() - now.getTime();
    }

   
    function formatTime(ms) {
        if (ms < 0) return '00:00:00';
        
        let totalSeconds = Math.floor(ms / 1000);
        
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const pad = (num) => String(num).padStart(2, '0');

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

   
    function updateCountdown() {
        let timeLeft = calculateTimeUntilMidnight();
        
        countdownElement.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'Ofertas encerradas!';
        }
    }

    updateCountdown();

    
    const countdownInterval = setInterval(updateCountdown, 1000);
});
