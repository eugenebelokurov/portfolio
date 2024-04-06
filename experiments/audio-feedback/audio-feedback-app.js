// Request access to the microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    source.connect(analyser);

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    const circle = document.getElementById('circle');

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      analyser.getByteFrequencyData(dataArray);

      const volumeValue = Math.max(...dataArray) / 255;
      const circleSize = 50 + volumeValue * 200;

      circle.style.width = `${circleSize}px`;
      circle.style.height = `${circleSize}px`;
    }

    renderFrame();
  })
  .catch(error => {
    console.error('Error accessing the microphone:', error);
  });