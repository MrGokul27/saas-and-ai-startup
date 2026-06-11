/* ---- Shared helpers ---- */
function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
}

function clearError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = "";
  el.classList.remove("show");
}

function setFieldState(input, isError) {
  if (!input) return;
  input.classList.toggle("input-error", isError);
  input.classList.toggle("input-success", !isError && input.value !== "");
}

function setCheckboxError(id, isError) {
  const cb = document.getElementById(id);
  if (!cb) return;
  const custom = cb.nextElementSibling;
  custom?.classList.toggle("checkbox-error", isError);
}

/* ---- Password toggle eye ---- */
document.querySelectorAll(".auth-eye-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;
    const isText = input.type === "text";
    input.type = isText ? "password" : "text";
    btn.querySelector(".eye-icon").style.display = isText ? "block" : "none";
    btn.querySelector(".eye-off-icon").style.display = isText
      ? "none"
      : "block";
  });
});

/* ---- Toast ---- */
function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "auth-toast";
  toast.innerHTML = `<span class="auth-toast-icon">✓</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

/* ============================================
   LOGIN FORM
   ============================================ */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const role = document.getElementById("role");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const rememberMe = document.getElementById("rememberMe");

    // Role
    if (!role.value) {
      showError("roleError", "Role is required.");
      setFieldState(role, true);
      valid = false;
    } else {
      clearError("roleError");
      setFieldState(role, false);
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError("emailError", "Email Address is required.");
      setFieldState(email, true);
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError("emailError", "Please enter a valid Email Address.");
      setFieldState(email, true);
      valid = false;
    } else {
      clearError("emailError");
      setFieldState(email, false);
    }

    // Password
    if (!password.value) {
      showError("passwordError", "Password is required.");
      setFieldState(password, true);
      valid = false;
    } else if (password.value.length < 8) {
      showError("passwordError", "Password must be at least 8 characters.");
      setFieldState(password, true);
      valid = false;
    } else {
      clearError("passwordError");
      setFieldState(password, false);
    }

    // Remember Me — required
    if (!rememberMe.checked) {
      showError("rememberError", "Please check Remember Me to continue.");
      setCheckboxError("rememberMe", true);
      valid = false;
    } else {
      clearError("rememberError");
      setCheckboxError("rememberMe", false);
    }

    if (valid) {
      sessionStorage.setItem(
        "stackly_user",
        JSON.stringify({
          email: email.value.trim(),
          role: role.value,
          name: email.value
            .trim()
            .split("@")[0]
            .replace(/[._]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          loginTime: new Date().toISOString(),
        }),
      );
      showToast("Signing you in…");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    }
  });

  // Real-time clear errors
  ["role", "email", "password"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
      clearError(id + "Error");
      setFieldState(document.getElementById(id), false);
    });
    document.getElementById(id)?.addEventListener("change", () => {
      clearError(id + "Error");
      setFieldState(document.getElementById(id), false);
    });
  });

  document.getElementById("rememberMe")?.addEventListener("change", () => {
    clearError("rememberError");
    setCheckboxError("rememberMe", false);
  });
}

/* ============================================
   REGISTER FORM
   ============================================ */
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  /* Name — block numbers & special chars, enforce 16 char max */
  const usernameInput = document.getElementById("username");
  const nameCount = document.getElementById("nameCount");

  usernameInput?.addEventListener("input", () => {
    // Strip digits and special characters as user types
    usernameInput.value = usernameInput.value.replace(/[^a-zA-Z\s]/g, "");
    if (usernameInput.value.length > 16) {
      usernameInput.value = usernameInput.value.slice(0, 16);
    }
    if (nameCount) nameCount.textContent = `${usernameInput.value.length}/16`;
    clearError("usernameError");
    setFieldState(usernameInput, false);
  });

  usernameInput?.addEventListener("keydown", (e) => {
    // Block digit keys and common special char keys before they register
    if (/[0-9]/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
    if (/[^a-zA-Z\s]/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  });

  /* Password strength */
  const regPassword = document.getElementById("regPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  const strengthFill = document.getElementById("pwStrengthFill");
  const condLen = document.getElementById("cond-len");
  const condUpper = document.getElementById("cond-upper");
  const condLower = document.getElementById("cond-lower");
  const condNum = document.getElementById("cond-num");
  const condSym = document.getElementById("cond-sym");

  function evaluatePassword(val) {
    const checks = {
      len: val.length >= 8,
      upper: /[A-Z]/.test(val),
      lower: /[a-z]/.test(val),
      num: /[0-9]/.test(val),
      sym: /[^A-Za-z0-9]/.test(val),
    };

    toggleCond(condLen, checks.len, "✓ 8+ characters", "✗ 8+ characters");
    toggleCond(condUpper, checks.upper, "✓ Uppercase", "✗ Uppercase");
    toggleCond(condLower, checks.lower, "✓ Lowercase", "✗ Lowercase");
    toggleCond(condNum, checks.num, "✓ Number", "✗ Number");
    toggleCond(condSym, checks.sym, "✓ Symbol", "✗ Symbol");

    const score = Object.values(checks).filter(Boolean).length;
    const pct = (score / 5) * 100;
    if (strengthFill) {
      strengthFill.style.width = pct + "%";
      strengthFill.style.background =
        score <= 2
          ? "#ff6b6b"
          : score === 3
            ? "#ffaa6b"
            : score === 4
              ? "#f59e0b"
              : "var(--clr-green)";
    }
    return checks;
  }

  function toggleCond(el, met, metText, failText) {
    if (!el) return;
    el.textContent = met ? metText : failText;
    el.classList.toggle("met", met);
  }

  regPassword?.addEventListener("input", () => {
    evaluatePassword(regPassword.value);
    clearError("regPasswordError");
    setFieldState(regPassword, false);
    // Live confirm match hint
    if (confirmPassword?.value) {
      validateConfirm(false);
    }
  });

  confirmPassword?.addEventListener("input", () => {
    validateConfirm(false);
  });

  function validateConfirm(showIfEmpty) {
    if (!confirmPassword.value && !showIfEmpty) {
      clearError("confirmPasswordError");
      setFieldState(confirmPassword, false);
      return true;
    }
    if (confirmPassword.value !== regPassword.value) {
      showError(
        "confirmPasswordError",
        "Confirm Password does not match Password.",
      );
      setFieldState(confirmPassword, true);
      return false;
    }
    clearError("confirmPasswordError");
    setFieldState(confirmPassword, false);
    return true;
  }

  /* Clear errors on change */
  ["regRole", "regEmail"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", () => {
      clearError(id + "Error");
      setFieldState(document.getElementById(id), false);
    });
    document.getElementById(id)?.addEventListener("change", () => {
      clearError(id + "Error");
      setFieldState(document.getElementById(id), false);
    });
  });

  document.getElementById("terms")?.addEventListener("change", () => {
    clearError("termsError");
    setCheckboxError("terms", false);
  });

  /* Submit */
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    const username = document.getElementById("username");
    const regRole = document.getElementById("regRole");
    const regEmail = document.getElementById("regEmail");
    const regPasswordEl = document.getElementById("regPassword");
    const confirmPassEl = document.getElementById("confirmPassword");
    const termsEl = document.getElementById("terms");

    // Full Name
    if (!username.value.trim()) {
      showError("usernameError", "Full Name is required.");
      setFieldState(username, true);
      valid = false;
    } else if (username.value.trim().length < 2) {
      showError("usernameError", "Full Name must be at least 2 characters.");
      setFieldState(username, true);
      valid = false;
    } else {
      clearError("usernameError");
      setFieldState(username, false);
    }

    // Role
    if (!regRole.value) {
      showError("regRoleError", "Role is required.");
      setFieldState(regRole, true);
      valid = false;
    } else {
      clearError("regRoleError");
      setFieldState(regRole, false);
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.value.trim()) {
      showError("regEmailError", "Email Address is required.");
      setFieldState(regEmail, true);
      valid = false;
    } else if (!emailPattern.test(regEmail.value.trim())) {
      showError("regEmailError", "Please enter a valid Email Address.");
      setFieldState(regEmail, true);
      valid = false;
    } else {
      clearError("regEmailError");
      setFieldState(regEmail, false);
    }

    // Password — all 5 conditions must pass
    const pwChecks = evaluatePassword(regPasswordEl.value);
    if (!regPasswordEl.value) {
      showError("regPasswordError", "Password is required.");
      setFieldState(regPasswordEl, true);
      valid = false;
    } else if (!Object.values(pwChecks).every(Boolean)) {
      showError(
        "regPasswordError",
        "Password must meet all 5 conditions above.",
      );
      setFieldState(regPasswordEl, true);
      valid = false;
    } else {
      clearError("regPasswordError");
      setFieldState(regPasswordEl, false);
    }

    // Confirm Password
    if (!confirmPassEl.value) {
      showError("confirmPasswordError", "Confirm Password is required.");
      setFieldState(confirmPassEl, true);
      valid = false;
    } else if (!validateConfirm(true)) {
      valid = false;
    }

    // Terms
    if (!termsEl.checked) {
      showError(
        "termsError",
        "You must agree to the Terms & Conditions to continue.",
      );
      setCheckboxError("terms", true);
      valid = false;
    } else {
      clearError("termsError");
      setCheckboxError("terms", false);
    }

    if (valid) {
      showToast("Account created! Redirecting to login…");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    }
  });
}
