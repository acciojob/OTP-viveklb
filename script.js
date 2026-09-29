const codes = document.querySelectorAll(".code");

// Focus first OTP box when page loads
if (codes.length > 0) {
  codes[0].focus();
}

codes.forEach((code, index) => {

  // Move forward when a digit is entered
  code.addEventListener("input", (e) => {
    // Allow numbers only
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 1);

    if (e.target.value !== "" && index < codes.length - 1) {
      codes[index + 1].focus();
    }
  });

  // Handle keyboard actions
  code.addEventListener("keydown", (e) => {

    // BACKSPACE
    if (e.key === "Backspace") {
      e.preventDefault();

      // If current box contains a digit, remove it
      if (code.value !== "") {
        code.value = "";

        // Move to previous input
        if (index > 0) {
          codes[index - 1].focus();
        }
      } else if (index > 0) {
        // Current field is already empty:
        // remove previous digit and focus previous box
        codes[index - 1].value = "";
        codes[index - 1].focus();
      }

      return;
    }

    // Arrow navigation (optional but useful)
    if (e.key === "ArrowLeft" && index > 0) {
      codes[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < codes.length - 1) {
      codes[index + 1].focus();
    }
  });

  // Automatically select existing digit on focus
  code.addEventListener("focus", () => {
    code.select();
  });
});

// Handle pasting a complete OTP
codes.forEach((code) => {
  code.addEventListener("paste", (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, codes.length);

    pastedData.split("").forEach((digit, index) => {
      codes[index].value = digit;
    });

    const nextIndex = Math.min(pastedData.length, codes.length - 1);
    codes[nextIndex].focus();
  });
});