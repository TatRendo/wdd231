const timestampInput = document.getElementById("timestamp");
if (timestampInput) {
  timestampInput.value = new Date().toLocaleString();
}