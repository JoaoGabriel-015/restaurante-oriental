/**
 * index.js
 * Funcionalidade: Contagem Regressiva para Meia-Noite
 */

document.addEventListener('DOMContentLoaded', () => {
    // ID do elemento onde a contagem regressiva será exibida
    const countdownElementId = 'ofertas-countdown'; 
    const countdownElement = document.getElementById(countdownElementId);

    if (!countdownElement) {
        console.error(`Elemento com ID '${countdownElementId}' não encontrado.`);
        return;
    }

    /**
     * Calcula o tempo restante até a meia-noite (00:00:00) do dia atual.
     */
    function calculateTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date(now);

        // Define a hora para 00:00:00 do dia seguinte
        midnight.setDate(now.getDate() + 1);
        midnight.setHours(0, 0, 0, 0);

        return midnight.getTime() - now.getTime();
    }

    /**
     * Formata os milissegundos restantes em HH:MM:SS.
     */
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

    /**
     * Atualiza a exibição da contagem regressiva.
     */
    function updateCountdown() {
        let timeLeft = calculateTimeUntilMidnight();
        
        countdownElement.textContent = formatTime(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = 'Ofertas encerradas!';
        }
    }

    updateCountdown();

    // Atualiza a contagem a cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
});